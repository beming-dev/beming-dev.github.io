코딧의 서비스는 여전히 Javascript를 사용하고 있는 곳이 많습니다.
api서버는 typescript로의 마이그레이션을 마쳤지만, 크롤러와 admin등 나머지 코드는 전부 javascript를 사용하고 있습니다.



JavaScript 프로젝트를 TypeScript로 마이그레이션하면 코드베이스의 안정성과 가독성이 크게 향상됩니다. 이 글에서는 점진적이며 안전하게 마이그레이션하는 단계별 전략, `tsconfig.json` 설정 예시, 주요 고려사항 등을 살펴봅니다.

---

## 목차

1. [왜 TypeScript인가?](#왜-typescript인가)  
2. [사전 준비](#사전-준비)  
3. [`tsconfig.json` 설정하기](#tsconfigjson-설정하기)  
4. [점진적 파일 확장자 변경](#점진적-파일-확장자-변경)  
5. [타입 정의 추가 전략](#타입-정의-추가-전략)  
6. [마이그레이션 단계별 가이드](#마이그레이션-단계별-가이드)  
7. [주요 고려사항 및 팁](#주요-고려사항-및-팁)  
8. [테스트와 빌드 파이프라인 통합](#테스트와-빌드-파이프라인-통합)  
9. [결론](#결론)  

---

## 왜 TypeScript인가?

- **정적 타입 검증**: 컴파일 타임에 타입 오류를 잡아내 런타임 에러를 줄입니다.  
- **IDE 지원 강화**: 자동완성·리팩토링·정적 분석 기능 활용이 수월해집니다.  
- **명시적 문서화**: 인터페이스와 타입 별칭으로 코드 의도를 명확히 표현합니다.  
- **대규모 협업**: 명확한 계약(contract)이 있어 팀원 간 변경 충돌을 방지합니다.  

---

## 사전 준비

1. **Node.js & npm/yarn**  
   - 최소 Node.js 12 이상 권장  
2. **빌드 툴 확인**  
   - Webpack, Rollup, Babel 등  
3. **테스트 프레임워크**  
   - Jest, Mocha, Cypress 등  
4. **버전 관리**  
   - Git 브랜치를 분리하여 실험적 마이그레이션 진행  

---

## `tsconfig.json` 설정하기

```jsonc
{
  "compilerOptions": {
    "target": "ES2020",                 // 컴파일 후 타겟 JS 버전
    "module": "CommonJS",               // 모듈 시스템 설정
    "strict": true,                     // 모든 엄격 모드 옵션 활성화
    "noImplicitAny": true,              // 암묵적 any 금지
    "strictNullChecks": true,           // null, undefined 검사 강화
    "esModuleInterop": true,            // CommonJS 호환
    "skipLibCheck": true,               // @types 로딩 속도 최적화
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "outDir": "dist",
    "rootDir": "src",
    "declaration": true,                // .d.ts 파일 생성
    "allowJs": true,                    // .js 파일도 컴파일 대상
    "checkJs": false                    // JSDoc 검사 여부 (점진적 전환 시 true 추천)
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

- allowJs: true 로 초기 단계에서 .js 파일도 함께 컴파일하도록 설정하고
- 점차 .js → .ts 로 파일명을 변경해 나갑니다.

## 점진적 파일 확장자 변경

1. **핵심 유틸리티부터**
    
    - 자주 변경되지 않는 안정적인 유틸리티부터 `.js → .ts` 변경
        
2. **비즈니스 로직**
    
    - 데이터 모델, 서비스 레이어 등 점진적 변경
        
3. **엔트리 포인트**
    
    - 최종적으로 `index.js` 등 엔트리 포인트를 `.ts`로 변환
        

> 파일명 변경 예시
> 
> bash
> 
> 복사편집
> 
> `git mv src/utils/date.js src/utils/date.ts`

---

## 타입 정의 추가 전략

1. **자동 생성 JSDoc → TS**
    
    js
    
    복사편집
    
    ``/** @param {string} name */ function greet(name) {   return `Hello, ${name}!`; }``
    
    ↓
    
    ts
    
    복사편집
    
    ``function greet(name: string): string {   return `Hello, ${name}!`; }``
    
2. **타입 별칭(Type Alias)**
    
    ts
    
    복사편집
    
    `type User = {   id: number;   name: string;   email?: string; // optional };`
    
3. **인터페이스(Interface)**
    
    ts
    
    복사편집
    
    `interface ApiResponse<T> {   data: T;   error?: string; }`
    
4. **타사 라이브러리**
    
    - 공식 제공 `@types/` 있으면 설치
        
        bash
        
        복사편집
        
        `npm install --save-dev @types/lodash`
        
    - 직접 `.d.ts` 작성
        
        ts
        
        복사편집
        
        `// src/types/globals.d.ts declare module 'my-untyped-lib';`
        

---

## 마이그레이션 단계별 가이드

### 1) 컴파일러 테스트

bash

복사편집

`npx tsc --noEmit`

- 타입 오류를 확인하고 하나씩 해결
    

### 2) 빌드 스크립트 수정

- `package.json` 예시
    
    jsonc
    
    복사편집
    
    `{   "scripts": {     "build": "tsc",     "start": "node dist/index.js",     "dev": "ts-node-dev --respawn src/index.ts"   } }`
    

### 3) 코드 수정 및 타입 추가

- **`any` 남용 지양**
    
- **타입 가드** 활용
    
    ts
    
    복사편집
    
    `function isString(x: unknown): x is string {   return typeof x === 'string'; }`
    

### 4) 테스트 통합

- Jest 설정 예시 (`jest.config.js`)
    
    js
    
    복사편집
    
    `module.exports = {   preset: 'ts-jest',   testEnvironment: 'node',   roots: ['<rootDir>/src'],   moduleFileExtensions: ['ts','tsx','js'],   transform: {     '^.+\\.tsx?$': 'ts-jest'   }, };`
    

### 5) CI/CD 파이프라인 업데이트

- GitHub Actions 예시
    
    yaml
    
    복사편집
    
    `name: Build & Test on: [push, pull_request] jobs:   build:     runs-on: ubuntu-latest     steps:       - uses: actions/checkout@v3       - name: Setup Node.js         uses: actions/setup-node@v3         with: node-version: '18'       - run: npm ci       - run: npm run build       - run: npm test`
    

---

## 주요 고려사항 및 팁

- **`strictNullChecks`**: 널 안전성을 확보하려면 반드시 활성화
    
- **`esModuleInterop`**: CommonJS 모듈과의 호환성
    
- **파일간 순환 참조**: 타입만 분리된 `*.d.ts`로 순환 방지
    
- **`skipLibCheck`**: 빌드 속도 vs. 타입 안전성 균형
    
- **점진적 마이그레이션**: 작은 단위로 PR 생성, 코드 리뷰 강화
    
- **VSCode 설정**
    
    jsonc
    
    복사편집
    
    `// .vscode/settings.json {   "editor.formatOnSave": true,   "typescript.tsdk": "node_modules/typescript/lib" }`
    

---

## 테스트와 빌드 파이프라인 통합

1. **Type-Only Import** (TS 3.8+)
    
    ts
    
    복사편집
    
    `import type { User } from './models';`
    
2. **프로덕션 빌드 최적화**
    
    - `declarationMap` 활성화로 디버깅 편의성 향상
        
    
    jsonc
    
    복사편집
    
    `{   "compilerOptions": {     "declarationMap": true   } }`
    
3. **코드 커버리지**
    
    - `nyc` + `ts-node` 조합으로 커버리지 확보
        

---

## 결론

JavaScript 프로젝트를 TypeScript로 마이그레이션하면 초기 학습·설정 비용이 소폭 발생하지만, 장기적으로 코드 품질·안정성·협업 효율이 크게 향상됩니다. 위 단계별 전략과 설정 예시를 참고하여, 점진적이고 체계적으로 마이그레이션을 진행해 보세요. TypeScript 도입 후에는 IDE 지원·정적 분석 도구(ESLint·Prettier)와 함께 사용하여 최적의 개발 환경을 구성할 수 있습니다.