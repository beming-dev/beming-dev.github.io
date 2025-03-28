Javascript를 완전히 포함하며 추가적인 타입 안정성을 제공합니다.
컴파일 타입까지의 타입 오류를 방지할 수 있고, IDE가 제공하는 자동완성 등을 이용할 수 있어서 개발 생산성이 증가합니다.

타입 명시도 가능하고 타입 추론을 하기도 합니다.

any: 어떤 타입도 상관없음
unknown: 타입을 미리 알 수 없을 때 사용. 실제 사용 시점에 타입 체크해야 함.

never: 절대 반환되지 않는 함수의 반환 타입

인터페이스: 객체, 클래스의 형태를 정의. 객체의 구조를 기술하거나 클래스가 가져야 할 맴버를 정의
타입 별칭: 특정 타입에 대한 별칭을 부여.

인터페이스는 확장 가능

클래스 문법에 접근 제어자 추가. Public, Private, Protected
생성자의 매개변수에 접근 제어자를 명시해 자동으로 맴버 변수 초기화

제네릭: 재사용 가능한 컴포넌트 생성
```
function identity<T>(arg: T): T {
	return arg;
}
```
열거형 사용하면 상구 그룹을 명명된 형태로 관리
```
enum Direction{
	UP, 
	DOWN
}
```

데코레이터: Annotation 형태로 기능 확장 가능.

타입 유틸리티
- Partial<T>
- Required<T>
- Pick<T, K extends keyof T>
- Omit <T, K extends keyof T>
- ReadOnly<T>
- Record<K, T>
- ReturnType<T>
- InstanceType<T>

tsconfig.json: 컴파일 옵션이나, 파일포함/제외 등 전반적 설정을 관리

# TypeScript 왜쓰나요
Javascript가 동적 타이핑 언어이기 때문에, 런타임까지 타입 에러를 알 수가 없다.
TS를 사용하면 컴파일 단계에서 타입 오류를 해결할 수 있다 또한 IDE의 자동 완성 기능으로 생산성을 높일 수 있다.

# Interface 와 type 차이
Interface는 주로 객체의 구조를 정의할 때 쓰입니다. Type은 새로운 타입 정의, 유니온 등에 쓰입니다.
Interface는 같은 이름으로 여러번 선언하면 타입 병합이 가능하지만, type은 붉능합니다.

# Generic
제네릭은 하나의 선언으로 다양한 타입을 처리할 수 있게 하기 위해 사용됩니다. 코드 재사용성을 높입니다.

# Never
절대 발생할 수 없는 타입을 의미합니다. 예를들면 무조건 error를 throw하는 함수는 반환값으로 never를 가집니다.

# abstract와 interface 차이
abstract는 추상 메서드를 포함할 수 있는 클래스입니다.
상속받은 클래스에서 추상 메서드를 구현해야 합니다.
interface는 클래스의 형태를 정의하거나, 객체 구조를 정의합니다. 구현체가 없고, implements하여 사용할 수 있습니다.

# Decorator
데코레이터는 동작을 수정하거나 확장할 수 있게 해줍니다.

# tsconfig
target: javascript의 버전 선택
module: 모듈 시스템 설정
strict: 엄격한 타입 체킹
outdir, rootdir: 컴파일된 파일이 출력될 폴더와 소스 폴더 지정

# any는 언제 사용하나요?
안사용하는게 좋지만, 정말 타입 알 수 없거나, 타이핑 안되는 외부 라이브러리를 임시로 연동할 때 사용할 수 있습니다.

# Typescript 에러가 없다고 좋나요?
너무 느슨하거나 너무 엄격하면 좋지 않을 수 있다.
도메인을 잘 표현하는 타입 설계하고 유지보수를 편하게 하는게 좋다.

