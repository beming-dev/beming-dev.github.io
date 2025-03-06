---
thumbnail: default.jpg
slug: /blog/about/errorhandling
date: 2025-02-15
title: "Nest.js는 어떻게 Error Handling을 할까?"
categories:
  - mainCategory: Area
    subCategory: about
---
# Nest.js의 Exception filters

Nest.js는 내부적으로 build-in exceptions layer를 가집니다. 발생한 예외가 application code에서 처리되지 않으면, exceptions layer로 넘어간 후 처리됩니다.
이 때, 에러가 HttpException 혹은 HttpException을 상속한다면 해당 에러에 맞게 응답을 전송하고, 그 외의 경우는 아래와 같은 응답을 보냅니다.
``` json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```
따라서 CustomError를 정의하고 싶다면 아래와 같이 HttpException을 상속 받아 정의하면 됩니다.
```typescript
export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}
```
그러나 Nest.js에는 미리 정의된 Exception이 @nestjs/common package에 정의돼 있습니다. 상황에 맞게 잘 사용하면 좋습니다.

# Nest.js에서 에러 로깅하기
Nest.js는 HttpException Type의 오류를 자연스러운 앱의 흐름으로 보기 때문에, 따로 로깅을 하지 않습니다. 따라서 HttpException Type의 error를 로깅하기 위해선, 직접 HttpExceptionFilter를 작성해줘야 합니다.
Nest.js는 Exception Filter라는 예외 발생 시 동작하는 Filter를 제공합니다.

저는 다음과 같이 ExceptionFilter를 작성했습니다.
``` typescript
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: LoggerService,
  ) {}
  
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
  
    this.logger.error(exception);
  
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
```
큰 기능은 없지만 winston logger를 이용해 logging 기능을 추가해줬습니다.

필터를 전역에 적용하기 위해 app.module.ts에 해당 Exception Filter를 추가해줍니다.
```typescript
providers: [
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    ...
  ],
```
# Winston을 이용한 logging

위의 코드에서 Logger로 Winston Logger를 사용했습니다.
console.log 대신 winston을 선택한 이유가 몇가지 있습니다.

1. Log level 관리. console.log에서는 console.log, console.error, console.warn 등을 따로 써야하지만, winston에서는 따로 처리하지 않아도 됩니다.
2. 자동으로 logging된 시간이 기록됩니다. 로그 분석시 매우 유용합니다.
3. Winston은 log 포맷을 지정할 수 있습니다. ELK에서 로그를 관리할 때, 이런 포맷이 지정돼있는 형태가 유리합니다.

저는 winston에 간단한 설정을 추가해 로그를 json 형태로 관리할 예정입니다.
main.ts에 다음과 같은 설정을 추가해줍니다.

``` typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
    bodyParser: true,
    rawBody: true,
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({ format: winston.format.json() }),
      ],
    }),
  });
```
이제 아래와 같이 일관된 json 형태로 로깅이됩니다.
```
{"context":"ExceptionsHandler","level":"error","message":"no token","stack":[null]}
{"context":"RouterExplorer","level":"info","message":"Mapped {/vote2/test, GET} route"}
```
