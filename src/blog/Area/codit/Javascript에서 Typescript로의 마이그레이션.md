---
thumbnail: default.jpg
slug: /blog/codit/typescript
date: 2025-06-01
title: Javascript에서 Typescript로의 마이그레이션
categories:
  - mainCategory: Area
    subCategory: codit
---

# 개요

코딧의 서비스는 여전히 Javascript를 사용하고 있는 곳이 많습니다.
api서버는 typescript로의 마이그레이션을 마쳤지만, 크롤러, 인덱서, admin등 나머지 코드는 전부 javascript를 사용하고 있습니다.

서비스 자체가 데이터 요구사항, 기획 변경등에 따라 수정이 잦고, 여러명이 관리하기 때문에 javascript로 작성된 코드를 유지보수 하는것이 디버깅, 개발 속도 면에서 불리했습니다.

그래서 이번 기회에 javascript코드를 typescript로 점진적으로 마이그레이션 하며 개발을 진행하기로 했습니다.

Javascript를 Typescript로 마이그레이션 할 때는 모든 파일을 이동할 필요 없이 점진적으로 적용할 수 있기 때문에, 실제 운영 중인 서비스에서도 무리 없이 진행할 수 있었습니다.

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
3. **버전 관리**  
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

typescript는 결국 javascript로 컴파일 되기 때문에, allowJS 옵션을 허용하여 컴파일 대상에 포함시킵니다.
## 점진적 파일 확장자 변경

1. **핵심 유틸리티부터**
	자주 변경되지 않는 안정적인 유틸리티부터 `.js → .ts` 변경
2. **비즈니스 로직**
    데이터 모델, 서비스 레이어 등 점진적 변경    
3. **엔트리 포인트**
	최종적으로 `index.js` 등 엔트리 포인트를 `.ts`로 변환

---

## 마이그레이션 단계별 가이드

### 1) 컴파일러 테스트

```bash
npx tsc --noEmit
```

위 명령으로 파일을 컴파일하며 오류를 해결합니다.
--noEmit옵션으로 타입검사 만을 수행합니다.

### 2) 빌드 스크립트 수정

- `package.json` 예시

```json
{   
  "scripts": {     
    "build": "tsc",     
    "start": "node dist/index.js",     
    "dev": "ts-node-dev --respawn src/index.ts"   
  } 
}
```

### 3) 코드 수정 및 타입 추가

- **`any` 남용 지양**
- **타입 가드** 활용
```typescript
function isString(x: unknown): x is string {   
	return typeof x === 'string'; 
}
```


---

## 주요 고려사항 및 팁

- **`strictNullChecks`**: 널 안전성을 확보하려면 반드시 활성화
- **`esModuleInterop`**: CommonJS 모듈과의 호환성
- **파일간 순환 참조**: 타입만 분리된 `*.d.ts`로 순환 방지
- **`skipLibCheck`**: 빌드 속도 vs. 타입 안전성 균형
- **점진적 마이그레이션**: 작은 단위로 PR 생성, 코드 리뷰 강화


---

## 결론

위 단계들을 적용하며 파일을 하나씩 typescript로 변환하면, 큰 오류 없이 모든 파일을 typescript로 