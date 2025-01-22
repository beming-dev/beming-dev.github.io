---
thumbnail: default.jpg
slug: "/blog/stock-simulator/websocket"
date: "2024-12-21"
title: "WebSocket architecture"
categories:
  - mainCategory: "Area"
    subCategory: "stock-simulator"
---

# 개요

Stocket simulator를 제작하면서, 한국 투자 증권의 API를 사용했습니다.
Backend가 한국 투자증권의 서버와 WebSocket으로 통신하고, Backend 서버와 Frontend 클라이언트 사이에도 WebSocket을 구성해야 해서 Backend에 두개의 WebSocket 연결을 가지는 Architecture를 구현했습니다.

# WebSocket


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