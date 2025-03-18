---
thumbnail: default.jpg
slug: "/blog/stock-simulator/websocket"
date: "2024-12-21"
title: "WebSocket architecture"
categories:
  - mainCategory: "Area"
    subCategory: "stock-simulator"
---

# WebSocket을 왜 사용해야 할까요?

WebSocket은 하나의 TCP 연결로 클라이언트와 서버가 지속적으로 실시간 데이터를 전송할 수 있는 프로토콜 입니다. 간단히 말하면 실시간 양방향 데이터 전송 프로토콜이라 할 수 있습니다.

HTTP는 매 요청마다 연결과 응답이 끝나면 다시 연결을 맺어야 합니다. 데이터를 지속적으로 주고받으려면 polling을 사용해야 하는데,  polling 방식은 서버의 자원을 많이 사용합니다.

그래서 주식 현재가, 거래 데이터 같은 실시간 데이터를 주고받을 때는 WebSocket을 활용하는 것이 효율적입니다.

# WebSocket 구성을 어떻게 해야할까?

Stocket simulator를 제작하면서, 한국투자증권의 API를 사용했습니다.
프론트엔드, 백엔드, 한투 서버 이렇게 3가지를 두고 실시간 데이터를 전송하려면, WebSocket을 이중으로 구현해야 합니다.

그래서 Backend와 한투 서버 사이의 WebSocket 통신과, 백엔드와 프론트 사이의 WebSocket 통신 두 가지를 함께 구성해야 했습니다.

# 어떤 문제가 있었을까?

구조를 설계하면서, 세 가지 문제가 있었습니다.

1. WebSocket연결이 중복 생성되어 너무 많은 WebSocket연결이 생성되어 서버가 감당하지 못했습니다.
2. 페이지를 나갈 때 WebSocket 연결이 제대로 끊어지지 않아서 낭비가 발생했습니다.
3. 두 WebSocket Handler가 서로를 순환참조 하여 에러가 발생했습니다.

## 1번 문제 해결

먼저, 다음과 같은 구조를 설계했습니다.

각 WebSocket 요청 별로, key를 생성하여, 그 요청을 요구하는 Session들을 저장하는 자료구조를 만들었습니다. 
```java
private final Map<String, Set<WebSocketSession>> subscriptions = new ConcurrentHashMap<>();
```
WebSocket subscribe요청이 들어오면, key 값으로 같은 요청이 있는지 판단하고 없으면 그 요청을 생성하고 있다면 이미 있는 요청에 구독자로 추가됩니다.
```java
if ("subscribe".equals(type)) {  
    String subscriptionKey = trId + "|" + trKey;  
  
    // 중복 요청 확인  
    subscriptions.computeIfAbsent(subscriptionKey, k -> new CopyOnWriteArraySet<>()).add(session);  
    System.out.println("User Subscribed: " + session.getId() + " to " + subscriptionKey);  
  
    eventPublisher.publishEvent(new WebSocketEvent(this, trId, trKey, trType));  
}else if ("unsubscribe".equals(type)) {  
    removeSession(session, trId, trKey);  
}
```
구독을 취소할 때는, 구독자가 남아있는지 판단하여 구독자가 없다면 그 key의 연결을 아예 삭제합니다.
```java
public void removeSession(WebSocketSession session, String trId, String trKey) {  
    String subscriptionKey = trId + "|" + trKey;  
    Set<WebSocketSession> sessions = subscriptions.get(subscriptionKey);  
  
    if (sessions != null) {  
        // session 삭제  
        if (sessions.remove(session)) {  
            System.out.println("Removed session: " + session.getId() + " from subscription: " + subscriptionKey);  
  
            System.out.println(sessions.size());  
            // sessions가 비어 있으면 subscriptions에서 subscriptionKey 삭제
            if (sessions.isEmpty()) {  
                subscriptions.remove(subscriptionKey);  
                eventPublisher.publishEvent(new WebSocketEvent(this, trId, trKey, "2"));  
            }  
        } else {  
            System.out.println("Session not found in subscription: " + subscriptionKey);  
        }  
    } else {  
        System.out.println("No sessions found for subscription key: " + subscriptionKey);  
    }  
}

```

이러한 구조를 구현하여, 같은 요청에 대해 중복된 WebSocket 연결을 생성하지 않고, 필요없는 연결을 삭제할 수 있도록 설계했습니다.


## 2번 문제 해결

주식 페이지를 벗어날 때, 그 주식에 대해 unsubscribe가 되지 않는 문제가 있었습니다.

이 문제는 useEffect의 cleanup과 eventListener를 이용해 해결했습니다.

먼저 주식 정보 페이지에 들어가면, subscibe 요청을 보냅니다.
구독 취소를 요청하는 함수를 작성한 후, useEffect의 return에서 호출합니다. 원래라면 이 때 구독 해제가 잘 작동해야 하는데 페이지를 벗어날 때 잘 작동하지 않는 문제가 있었습니다.

그래서 beforeunload eventListener에 해당 함수를 등록해두고, cleanup에서 제거해주는 방식을 채택했습니다.



```typescript
useEffect(() => {
    if (isConnected) {
      const socketOpenData = JSON.stringify({
        type: "subscribe",
        tr_type: "1",
        rq_type: "current",
        symbol: stockSymbol,
      });
  
      sendMessage(socketOpenData);
    }
  
    const handleBeforeUnload = () => {
      const unsubscribeMessage = JSON.stringify({
        type: "unsubscribe",
        tr_type: "2",
        rq_type: "current",
        symbol: stockSymbol,
      });
      sendMessage(unsubscribeMessage);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      handleBeforeUnload();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isConnected, stockSymbol, location.pathname]);
```


## 3번 문제 해결

프론트-백 WebSocket에서 백-한투 WebSocket에 구독, 구독해제 정보를 보내기 위해 호출해야하고.
백-한투 WebSocket에서 프론트-백 WebSocket에 데이터 전송을 위해 호출해야 하는데, 이 과정에서 순환 참조가 발생하여 오류가 났습니다.

이 문제는 Java의 EventListener 기능을 사용하여 해결했습니다.
한쪽에서 Event를 발행하고, Listener가 그 Event를 듣고 함수를 호출하면, 인스턴스를 직접 호출할 필요가 없어집니다.

먼저, Event 객체를 만들어줍니다. 
```java
package com.stock.stock_simulator.event;  
import org.springframework.context.ApplicationEvent;  
  
public class WebSocketEvent extends ApplicationEvent {  
    private final String tr_id;  
    private final String tr_key;  
    private final String tr_type;  
  
    public WebSocketEvent(Object source, String trId, String trKey, String trType) {  
        super(source);  
        tr_id = trId;  
        tr_key = trKey;  
        tr_type = trType;  
    }  
  
    //getter
}
```
프론트-백 WebSocket Handler에서 event를 발행합니다.
```java
private final ApplicationEventPublisher eventPublisher;

public FrontendWebSocketHandler(ApplicationEventPublisher eventPublisher) {  
    this.eventPublisher = eventPublisher;    
}

eventPublisher.publishEvent(new WebSocketEvent(this, trId, trKey, "2"));
```

백-한투 WebSocket Handler에서 발행된 Event를 수신합니다.
```java
public class WebSocketHandler extends TextWebSocketHandler implements ApplicationListener<WebSocketEvent> {
	@Override  
	public void onApplicationEvent(WebSocketEvent event) {  
	    String tr_id = event.getTr_id();  
	    String tr_key = event.getTr_key();  
	    String tr_type = event.getTr_type();  
	  
	    try {  
	        sendMessage(tr_id, tr_key, tr_type);  
	    } catch (Exception e) {  
	        throw new RuntimeException(e);  
	    }  
	}

}
```


# 코드를 분석해봅시다

아래부터는 어떻게 두가지 WebSocket Handler를 구성했는지에 대한 자세한 코드입니다. 필요시 참고만 해주세요.
## Frontend - Backend WebSocket Config

- EnableWebsocket annotation을 통해 Spring이 WebSocket 관련 처리를 하게 해줍니다.
- frontendWebSocketHandler를 등록하고, /ws를 WebSocket을 위한 endpoint로 사용합니다.
- cors 설정으로, Frontend를 허용합니다.

``` java
@Configuration  
@EnableWebSocket  
public class WebSocketConfig implements WebSocketConfigurer {  
  
    private final FrontendWebSocketHandler frontendWebSocketHandler;  
  
    public WebSocketConfig(FrontendWebSocketHandler frontendWebSocketHandler) {  
        this.frontendWebSocketHandler = frontendWebSocketHandler;  
    }  
  
    @Override  
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {  
        registry.addHandler(frontendWebSocketHandler, "/ws") // WebSocket 엔드포인트  
                .setAllowedOriginPatterns(  
                        "http://localhost:5173",  
                        "https://beming-stock.kro.kr",  
                        "http://beming-stock.kro.kr",  
                );  
    }  
}
```

## Backend - 한투 API WebSocket 설정
- Spring에서 제공하는 WebSocket client (StandardWebSocketClient) 를 사용합니다.
- WebSocket key를 가져오고, 한투의 WebSocket 주소와 연결합니다.
- 앱 실행시 자동으로 WebSocket이 연결되도록 합니다.
```java
@Configuration  
@EnableWebSocket  
public class WebSocketExternalConfig implements WebSocketConfigurer {  
    private final StockApiInterface stockApi;  
    private final WebSocketHandler webSocketHandler;  
  
    public WebSocketExternalConfig(StockApiInterface stockApi, WebSocketHandler webSocketHandler, FrontendWebSocketHandler frontendWebSocketHandler) {  
        this.stockApi = stockApi;  
        this.webSocketHandler = webSocketHandler;  
    }  
  
    @Override  
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {  
        WebSocketClient webSocketClient = new StandardWebSocketClient();  
  
        String webSocketKey = stockApi.getWebSocketKey();  
        webSocketHandler.setWebSocketKey(webSocketKey);  
  
        WebSocketConnectionManager connectionManager = new WebSocketConnectionManager(  
                webSocketClient, webSocketHandler, "ws://ops.koreainvestment.com:21000"  
        );  
  
        connectionManager.setAutoStartup(true);  
        connectionManager.start();  
    }  
}
```

## 프론트-백엔드 Handler
```java
  
@Component  
public class FrontendWebSocketHandler extends TextWebSocketHandler {  
    private final Map<String, Set<WebSocketSession>> subscriptions = new ConcurrentHashMap<>();  
    private final ApplicationEventPublisher eventPublisher;  
    private final StockRepository stockRepository;  
  
    public FrontendWebSocketHandler(ApplicationEventPublisher eventPublisher, StockRepository stockRepository) {  
        this.eventPublisher = eventPublisher;  
        this.stockRepository = stockRepository;  
    }  
  
    public void removeSession(WebSocketSession session, String trId, String trKey) {  
        String subscriptionKey = trId + "|" + trKey;  
        Set<WebSocketSession> sessions = subscriptions.get(subscriptionKey);  
  
        if (sessions != null) {  
            // session 삭제  
            if (sessions.remove(session)) {  
                System.out.println("Removed session: " + session.getId() + " from subscription: " + subscriptionKey);  
  
                System.out.println(sessions.size());  
                // sessions가 비어 있으면 subscriptions에서 subscriptionKey 삭제 (옵션)  
                if (sessions.isEmpty()) {  
                    subscriptions.remove(subscriptionKey);  
                    eventPublisher.publishEvent(new WebSocketEvent(this, trId, trKey, "2"));  
                }  
            } else {  
                System.out.println("Session not found in subscription: " + subscriptionKey);  
            }  
        } else {  
            System.out.println("No sessions found for subscription key: " + subscriptionKey);  
        }  
    }  
  
  
    @Override  
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {  
        System.out.println("Frontend WebSocket Connected: " + session.getId());  
    }  
  
    @Override  
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {  
        subscriptions.values().forEach(sessions -> sessions.remove(session));  
        System.out.println("Frontend WebSocket Disconnected: " + session.getId());  
    }  
  
    @Override  
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {  
        String payload = message.getPayload();  
        ObjectMapper objectMapper = new ObjectMapper();  
  
        try {  
            // JSON 데이터를 JsonNode로 파싱  
            JsonNode rootNode = objectMapper.readTree(payload);  
  
            // 각 키의 값 추출  
            String type = rootNode.get("type").asText();  
            String trType = rootNode.get("tr_type").asText();  
            String symbol = rootNode.get("symbol").asText(); //symbol  
            String rq_type = rootNode.get("rq_type").asText();  
            String trId;  
            String trKey;  
  
            Stock stockData = stockRepository.findBySymbol(symbol)  
                    .orElseThrow(() -> new Exception("Invalid symbol: " + symbol));  
  
            switch(rq_type.toLowerCase()) {  
                case "current":  
                    if(Objects.equals(stockData.getCountry(), "KSP")  
                            || Objects.equals(stockData.getCountry(), "KSD")){  
                        trId = "H0STCNT0";  
                        trKey=symbol;  
                    }else{  
                        trId = "HDFSCNT0";  
                        trKey="D" + stockData.getCountry() + symbol;  
                    }  
                    break;  
                default:  
                    throw new Exception("Invalid rq_type: " + rq_type);  
            }  
  
            System.out.println(type + symbol);  
            // 추가 로직  
            if ("subscribe".equals(type)) {  
                String subscriptionKey = trId + "|" + trKey;  
  
                // 중복 요청 확인  
                subscriptions.computeIfAbsent(subscriptionKey, k -> new CopyOnWriteArraySet<>()).add(session);  
                System.out.println("User Subscribed: " + session.getId() + " to " + subscriptionKey);  
  
                eventPublisher.publishEvent(new WebSocketEvent(this, trId, trKey, trType));  
            }else if ("unsubscribe".equals(type)) {  
                removeSession(session, trId, trKey);  
            }  
  
        } catch (Exception e) {  
            System.err.println("Failed to parse JSON payload: " + e.getMessage());  
            e.printStackTrace();  
        }  
  
    }  
  
    public void broadcastToSubscribers(String trId, String trKey, String message) {  
        String subscriptionKey = trId + "|" + trKey;  
        Set<WebSocketSession> sessions = subscriptions.get(subscriptionKey);  
  
        if (sessions != null) {  
            sessions.forEach(session -> {  
                try {  
                    if (session.isOpen()) {  
                        session.sendMessage(new TextMessage(message));  
                    }  
                } catch (Exception e) {  
                    e.printStackTrace();  
                }  
            });  
        }  
    }  
}
```

## 백엔드-한투 api handler
```java
@Component  
public class WebSocketHandler extends TextWebSocketHandler implements ApplicationListener<WebSocketEvent> {  
    @Autowired  
    private FrontendWebSocketHandler frontendWebSocketHandler;  
    private String webSocketKey;  
    private WebSocketSession session;  
  
    public void setWebSocketKey(String webSocketKey) {  
        this.webSocketKey = webSocketKey;  
    }  
  
    @Override  
    public void onApplicationEvent(WebSocketEvent event) {  
        String tr_id = event.getTr_id();  
        String tr_key = event.getTr_key();  
        String tr_type = event.getTr_type();  
  
        try {  
            sendMessage(tr_id, tr_key, tr_type);  
        } catch (Exception e) {  
            throw new RuntimeException(e);  
        }  
    }  
  
    @Override // 웹 소켓 연결시  
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {  
        System.out.println("WebSocket Connected: ");  
        System.out.println(webSocketKey);  
        this.session = session;  
    }  
  
    private void sendMessage(String tr_id, String tr_key, String tr_type) throws Exception {  
        if (session == null || !session.isOpen()) {  
            System.out.println("WebSocket session is not open or is null.");  
            return;  
        }  
        // Gson 객체 생성  
        Gson gson = new Gson();  
  
        // Header 작성  
        Map<String, String> header = new HashMap<>();  
        header.put("approval_key", webSocketKey); // WebSocket Key  
        header.put("custtype", "P"); // 고객 타입: 개인  
        header.put("tr_type", tr_type); // 거래 타입: 등록  
        header.put("content-type", "utf-8"); // Content-Type  
  
        // Input 작성 (Body 내부의 중첩 필드)  
        Map<String, String> input = new HashMap<>();  
        input.put("tr_id", tr_id); // 거래 ID        input.put("tr_key", tr_key); // 거래 Key (종목코드)  
  
        // Body 작성  
        Map<String, Object> body = new HashMap<>();  
        body.put("input", input);  
  
        // 최종 요청 작성  
        Map<String, Object> request = new HashMap<>();  
        request.put("header", header);  
        request.put("body", body);  
  
        // JSON 직렬화  
        String jsonRequest = gson.toJson(request);  
        System.out.println("JSON Request: " + jsonRequest);  
  
        // WebSocket 메시지 전송  
        session.sendMessage(new TextMessage(jsonRequest));  
    }  
  
    @Override // 데이터 통신시  
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {  
        String payload = message.getPayload();  
        System.out.println("Received Message: " + payload);  
  
        if (payload.contains("PINGPONG")) {  
            System.out.println("Received PING. Sending PONG...");  
            session.sendMessage(new TextMessage("PONG"));  
            return;  
        }  
  
        String[] stockInfo = payload.split("\\^");  
  
        if(stockInfo.length >=4) {  
            String[] headerInfo = stockInfo[0].split("\\|");  
  
            String trId = headerInfo[1]; // 메시지에서 추출한 tr_id            String trKey = headerInfo[3]; // 메시지에서 추출한 tr_key  
            if (frontendWebSocketHandler != null) {  
                frontendWebSocketHandler.broadcastToSubscribers(trId, trKey, payload);  
            }  
        }  
    }  
  
    @Override // 웹소켓 통신 에러시  
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {  
        System.out.println("WebSocket Error: " + exception.getMessage());  
        exception.printStackTrace();  
        super.handleTransportError(session, exception);  
    }  
  
    @Override // 웹 소켓 연결 종료시  
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {  
        System.out.println("finished");  
        super.afterConnectionClosed(session, status);  
    }  
}
```