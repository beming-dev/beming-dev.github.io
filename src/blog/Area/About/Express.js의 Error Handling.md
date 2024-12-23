---
thumbnail: default.jpg
slug: /blog/about/error
date: 2024-10-21
title: "Express.js의 Error Handling"
categories:
  - mainCategory: Area
    subCategory: about
typora-copy-images-to: ..\images
typora-root-url: ..\images
---

# Express.js의 오류 처리 방식

Express.js는 다음과 같은 미들웨어로 에러를 처리합니다.
```javascript
app.use((err, req, res, next) => { 
	console.error(err.stack); // 오류 스택 출력 
	res.status(500).send('Something broke!'); // 클라이언트에게 오류 메시지 반환 
});
```
Express.js는 정의된 미들웨어와 라우트를 순차적으로 처리하기 때문에, 맨 마지막에 오류 처리 미들웨어를 정의해야 오류를 처리할 수 있습니다.

```javascript
setupRoutes() {
    this.app.get("/", (req, res, next) => res.send("hello world"));
    // 라우터 설정
    this.app.use("/user", user);
    this.app.use(ErrorHandler);
  }
```
다음과 같이 Route들을 먼저 위치시키고 마지막에 ErrorHandler를 위치시켜야 합니다.

# Custom Error

기존에 제가 정의해둔 ErrorHandler는 다음과 같습니다.
단순히 Error가 발생하면, log를 찍고 응답으로 그대로 전달하는 미들웨어입니다.
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

이런 에러 처리 방식에는 몇 가지 문제가 있습니다.

수정한 미들웨어는 다음과 같습니다.
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

- DatabaseError
```javascript
import { AppError } from "./AppError";
  
export class DatabaseError extends AppError {
  constructor(message: string = "Database error occurred") {
    super(message, 500); // 기본적으로 500 상태 코드 사용
  }
}
```

- ValidationError
```javascript
import { AppError } from "./AppError";
  

export class ValidationError extends AppError {
  public readonly errors: string[];
  
  consructor(message: string = "Validation error", errors: string[] = []) {
    super(message, 400); // 기본적으로 400 상태 코드 사용
    this.errors = errors; // 추가적인 오류 정보를 포함할 수 있음
  }
}
```

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