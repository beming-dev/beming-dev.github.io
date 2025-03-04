제작중인 StockSimulation 애플리케이션은 Spring과 Mysql을 사용하고 있습니다. 애플리케이션의 핵심 데이터인 한국, 미국 상장 주식 데이터는 Stock이라는 테이블에 저장돼있고, 약 8200개 정도의 column을 가집니다.

Symbol값을 primary key로 설정한다면 좋겠지만, 혹시 모를 중복에 대비해 primary key를 따로 설정해두어서 symbol 값에는 index가 설정돼있지 않습니다.

그래서 Symbol 값에 index를 설정해두기 전에, 몇몇 query들에서 얼마나 유의미한 시간차이가 생기는지 간단히 확인해보겠습니다.

## 시간 측정 annotation 만들기
함수의 실행시간을 편하게 측정하기 위해 먼저 annotation을 하나 만들어 주겠습니다.
기능은 Aspect를 사용하여 주입할거기 때문에 이렇게 annotation만 만들어주면 됩니다.
- annotations/LogExcecutionTime.java
```java  
@Retention(RetentionPolicy.RUNTIME)  
@Target(ElementType.METHOD)  
public @interface LogExecutionTime {  
}
```
- aspects/ExecutionTimeAspect.java
```java
@Aspect  
@Component  
public class ExecutionTimeAspect {  
    @Around("@annotation(logExecutionTime)")  
    public Object logExecutionTime(ProceedingJoinPoint joinPoint, LogExecutionTime logExecutionTime) throws Throwable{  
        long startTime = System.currentTimeMillis();  
        Object result = joinPoint.proceed();  
        long endTime = System.currentTimeMillis();  
  
        long executionTime = endTime - startTime;  
        System.out.println(joinPoint.getSignature() + "executed in" + executionTime + "ms");  
  
        return result;  
    }  
}
```
logExecutionTime annotation이 달린 메소드의 시간을 측정하고 log를 남기도록 작성한 Aspect입니다.

## 단순 조회 시간 측정
이제 함수에 annotation을 달고 실행을 시켜봅시다.
``` java
@Override  
@LogExecutionTime  
public String getCurrentStockPrice(String symbol) throws Exception {
	...
}
```

### index가 없는 경우
getCurrentStockPrice(String)executed in199ms
getCurrentStockPrice(String)executed in116ms
getCurrentStockPrice(String)executed in127ms
getCurrentStockPrice(String)executed in71ms
getCurrentStockPrice(String)executed in76ms
getCurrentStockPrice(String)executed in86ms

getCurrentStockPrice(String)executed in102ms
getCurrentStockPrice(String)executed in122ms

getCurrentStockPrice(String)executed in113ms
getCurrentStockPrice(String)executed in99ms
getCurrentStockPrice(String)executed in101ms

### index가 있는 경우

getCurrentStockPrice(String)executed in87ms
getCurrentStockPrice(String)executed in142ms
getCurrentStockPrice(String)executed in88ms
getCurrentStockPrice(String)executed in78ms
getCurrentStockPrice(String)executed in77ms
getCurrentStockPrice(String)executed in77ms
getCurrentStockPrice(String)executed in89ms

getCurrentStockPrice(String)executed in120ms
getCurrentStockPrice(String)executed in78ms
getCurrentStockPrice(String)executed in84ms

## Join 시간 측정