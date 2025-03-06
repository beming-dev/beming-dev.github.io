---
thumbnail: default.jpg
slug: /blog/about/error
date: 2025-02-01
title: "Express.js는 어떻게 Error Handling을 할까?"
categories:
  - mainCategory: Area
    subCategory: about
---
다음 [Express.js 공식문서](https://expressjs.com/en/guide/error-handling.html) 를 참고하여 작성하였습니다.
# Express.js는 어떻게 Error Handling을 할까?

Express.js에는 default error handler가 있습니다. 공식 문서에 따르면, 내부적으로 error가 발생하면 다음의 정보들을 추가해 클라이언트로 전송합니다.
- res.statusCode: err.status의 값으로 설정됩니다.
- res.statusMessage: statusCode에 따라 설정됩니다.
- body: HTML 형식의 status code message
- err.headers object에 정의된 header

만약 에러가 발생할 때 next() 에 아무 매개변수나 넘겨주면 Express가 에러라 판단하고 error handler로 보냅니다.

Express4 까지는 비동기에서 발생한 에러는 따로 처리 해줘야 했지만, Express5부터는 비동기에서 발생한 에러도 자동으로 next(err)를 호출해주기 때문에 따로 처리할 필요가 없습니다.

# Custom Error Handler는 어떻게 만들까?

Custom Error Handler를 만들 땐, 기존 middleware 형식에 (err, req, res, next) 이렇게 4개의 인자를 넘겨주면 됩니다.
``` javascript
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```
Express.js는 정의된 middleware와 route를 순차적으로 처리합니다. 
다음과 같이 맨 마지막에 Error handler를 정의해야 오류를 처리할 수 있습니다.

```javascript
setupRoutes() {
    this.app.get("/", (req, res, next) => res.send("hello world"));
    // 라우터 설정
    this.app.use("/user", user);
    this.app.use(ErrorHandler);
  }
```

# 왜 Custom Error Handler를 만들게 되었을까?

제가 기존에 정의해둔 Error Handler는 Express의 default error handler와 크게 다른게 없었습니다.
```javascript
import { NextFunction, Request, Response } from "express";

  

const ErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("Middleware Error Handling");
  console.log(err);
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  
  res.status(errStatus).json({
      success: false,
	  status: errStatus,
	  message: errMsg,
      stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};
  
export default ErrorHandler;
```
단순히 logging을 하고, 클라이언트로 에러를 보내는 형식입니다.

이 방식을 사용할 때는 다음과 같은 문제가 있었습니다.
1. 어떤 Error인지 구분되지 않습니다. Validation과정에서 발생한 에러인지, Database에서 발생한 에러인지 구분이 가능하다면 더 빠른 대처가 가능할 것입니다.
2. 예상한 예외에서 발생한 에러인지, 예기치 않게 발생한 에러인지 구분되지 않습니다. 에러처리가 된 곳에서 발생한 에러가 아닌 것을 따로 처리하여 앱의 안정성을 높이고 싶었습니다.

이를 해결하기 위해 다음과 같은 Error Handler를 정의했습니다.
```javascript
import { NextFunction, Request, Response } from "express";
  
const ErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.errors && { errors: err.errors }),
    });
  } else {
    console.log("Unexpected Error: ", err);
    res.status(500).json({
      success: false,
      message: "An unexpected error occured",
    });
  }
};
  
export default ErrorHandler;
```
Custom Error Type을 정의한 후, error에 isOperational 맴버를 추가하여 예상한 오류인지 구분해줍니다. 또한 각각의 Custom Error에서 status코드를 지정해줄겁니다.

아래는 직접 정의한 AppError입니다. 이 AppError를 상속받는 Error들을 만들어줄 겁니다. 그럼 그 Error들은 isOperational 필드를 가지고, 각각 미리 정의된 status code를 갖게 됩니다.

- AppError
```javascript
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  
    Error.captureStackTrace(this, this.constructor);
  }
}
```

예를 들면 아래와 같습니다.
- DatabaseError
```javascript
import { AppError } from "./AppError";
  
export class DatabaseError extends AppError {
  constructor(message: string = "Database error occurred") {
    super(message, 500); 
  }
}
```

- ValidationError
```javascript
import { AppError } from "./AppError";
  

export class ValidationError extends AppError {
  public readonly errors: string[];
  
  consructor(message: string = "Validation error", errors: string[] = []) {
    super(message, 400); 
    this.errors = errors;
  }
}
```
이런 형태로 Custome Error를 지정해주면 

```
throw new ValidationErrror();
next(new ValidationError());
```
와 같은 형식으로 사용할 수 있습니다.