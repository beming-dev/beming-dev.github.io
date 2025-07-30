브라우저 탭 전환 시 버퍼링 문제 해결 과정을 자세히 설명해드리겠습니다.

## �� 문제 진단

### 원인 분석

1. 메시지 누적: WebSocket으로 받은 실시간 데이터가 무제한으로 쌓임

2. 불필요한 리렌더링: 탭 전환 시 쌓인 메시지를 모두 처리하면서 성능 저하

3. 메모리 누수: 이벤트 리스너와 상태가 제대로 정리되지 않음

4. 타입 불일치: 문자열과 숫자 간 변환 오류로 인한 계산 실패

## �� 개선 사항 및 원리

### 1. 메시지 처리 최적화

#### Before (문제가 있던 코드)

typescript

Apply

// 모든 메시지를 순서대로 처리

pendingMessages.forEach((msg) => processMessage(msg));

#### After (최적화된 코드)

typescript

Apply

// 가장 최신 메시지만 처리하여 성능 향상

const latestMessage = pendingMessagesRef.current[pendingMessagesRef.current.length - 1];

processMessage(latestMessage);

개선 원리:

- 시간 복잡도: O(n) → O(1)로 단축

- 메모리 사용량: 모든 메시지 저장 → 최신 메시지만 저장

- 처리 속도: 백그라운드에서 쌓인 수백 개 메시지를 모두 처리하는 대신, 최신 상태만 반영

### 2. 중복 처리 방지 메커니즘

typescript

Apply

// 중복 메시지 방지

if (lastProcessedTime.current === lastMessage.time) return;

lastProcessedTime.current = lastMessage.time;

개선 원리:

- 중복 제거: 동일한 시간의 메시지는 한 번만 처리

- 불필요한 계산 방지: 같은 데이터로 차트를 여러 번 업데이트하지 않음

- CPU 사용량 감소: 중복 연산 제거로 성능 향상

### 3. 메모리 사용량 제한

#### WebSocket 컨텍스트

typescript

Apply

// 최대 10개만 유지하여 메모리 사용량 제한

const limitedMessages = updatedMessagesForSymbol.slice(-10);

#### 차트 데이터

typescript

Apply

// 최대 100개만 유지

setChartData((cd) => [newData, ...cd.slice(0, 99)]);

개선 원리:

- 메모리 누수 방지: 무제한 데이터 누적 방지

- 가비지 컬렉션 최적화: 오래된 데이터 자동 제거

- 성능 안정성: 메모리 사용량이 일정 수준으로 유지

### 4. React 성능 최적화

#### React.memo 적용

typescript

Apply

const StockDetail: React.FC = React.memo(() => {

  // 컴포넌트 내용

});

const CandleChart: React.FC<CandleChartProps> = React.memo(({ data }) => {

  // 차트 컴포넌트 내용

});

개선 원리:

- 불필요한 리렌더링 방지: props가 변경되지 않으면 리렌더링 생략

- 가상 DOM 비교 최적화: 실제 DOM 조작 최소화

- CPU 사용량 감소: 렌더링 비용 절약

#### useCallback과 useMemo 활용

typescript

Apply

const processMessage = useCallback((lastMessage: StructuredDataType) => {

  // 메시지 처리 로직

}, []);

const series = useMemo(() => [

  // 차트 데이터 변환

], [data]);

개선 원리:

- 함수 재생성 방지: 의존성이 변경되지 않으면 동일한 함수 참조 유지

- 계산 결과 캐싱: 동일한 입력에 대해 재계산 생략

- 자식 컴포넌트 최적화: 메모이제이션된 props로 자식 리렌더링 방지

### 5. 가시성 기반 처리 최적화

typescript

Apply

const isVisible = useRef<boolean>(true);

const onVisibilityChange = () => {

  const isNowVisible = document.visibilityState === "visible";

  isVisible.current = isNowVisible;

  if (isNowVisible && pendingMessagesRef.current.length > 0) {

    // 탭이 다시 보일 때만 처리

    const latestMessage = pendingMessagesRef.current[pendingMessagesRef.current.length - 1];

    processMessage(latestMessage);

  }

};

개선 원리:

- 리소스 절약: 숨겨진 탭에서는 불필요한 처리 중단

- 사용자 경험 향상: 탭 전환 시 즉시 최신 상태 반영

- 배터리 절약: 백그라운드에서 불필요한 연산 방지

### 6. 타입 안전성 개선

#### Before (타입 오류)

typescript

Apply

high: Math.max(lastChart.high, lastMessage.currentPrice), // string vs string

#### After (타입 안전)

typescript

Apply

const currentPrice = parseFloat(lastMessage.currentPrice);

const lastHigh = parseFloat(lastChart.high);

high: Math.max(lastHigh, currentPrice).toString(),

개선 원리:

- 런타임 오류 방지: 타입 변환으로 계산 오류 해결

- 코드 안정성: 예상치 못한 동작 방지

- 디버깅 용이성: 명확한 타입으로 버그 추적 가능

## 📊 성능 개선 효과

### 메모리 사용량

- Before: 무제한 메시지 누적 (수백 MB 가능)

- After: 최대 10개 메시지 + 100개 차트 데이터 (수 MB)

### 처리 속도

- Before: O(n) - 모든 쌓인 메시지 처리

- After: O(1) - 최신 메시지만 처리

### 리렌더링 횟수

- Before: 메시지 수만큼 리렌더링

- After: 실제 변경사항만 리렌더링

### 탭 전환 응답성

- Before: 2-3초 버퍼링

- After: 즉시 반응

## �� 핵심 원리 요약

1. 데이터 제한: 무제한 누적 → 제한된 개수만 유지

2. 중복 제거: 모든 메시지 처리 → 최신 메시지만 처리

3. 메모이제이션: 매번 재계산 → 캐싱된 결과 사용

4. 가시성 최적화: 백그라운드 처리 중단 → 리소스 절약

5. 타입 안전성: 런타임 오류 방지 → 안정적인 계산

이러한 최적화를 통해 실시간 주식 데이터 처리 시 브라우저 성능이 크게 향상되고, 사용자 경험이 개선됩니다