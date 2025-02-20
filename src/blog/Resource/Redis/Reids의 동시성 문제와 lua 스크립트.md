# 동시성 문제

만약에 Redis에서 GET관련 함수로 값을 가져오고 그 값을 애플리케이션에서 업데이트 한다음에, 다시 Redis에 save한다고 생각해봅시다.

만약 A가 값을 읽고 가서 Redis에 저장하는 사이에 B가 값을 읽어 간다면 어떻게 될까요?

A가 값을 Redis에 쓰는 사이 B는 본인이 읽어온 값으로 처리를 하고, 그 값을 Redis에 또 저장할 것입니다. 결과적으로 A의 작업이 무시 됩니다.

이러한 동시성 문제는 어떠한 값을 읽어와서 처리하고 다시 저장하는 구조에서는 언제 어디서든 일어날 수 있는 문제입니다. Redis에서는 어떻게 이 문제를 해결할까요?

1. atomic한 update 명령을 사용한다.
2. WATCH명령을 통한 transaction을 실행한다.
3. lock을 사용한다.
4. lua script를 사용한다.

## atomic한 명령 사용하기
Redis에는 값을 읽어와서 수정하고 저장하는게 아니라, 특정 값을 한번에 수정시키는 명령이 있습니다.

예를 들면, HINCRBY와 같은 명령이 있습니다. 
만약 Hash의 특정 값을 1 증가시켜 달라는 명령이 2개가 동시에 들어온다면, 2가 되길 기대하지만 동시성 문제로 최종 결과가 1이 될 수 있습니다.
그럴때, HINCRBY를 사용하면 결과가 무조건 2가 됩니다.

## Transaction

트랜잭션이란, 내부적으로 여러 명령을 묶어서 처리하고 그 중간에 다른 명령이 끼어들 수 없도록 처리하는 것입니다.
다른 데이터베이스와 같이 Redis에서도 Transaction 처리를 할 수 있습니다.

하지만 다른 데이터베이스에서는 트랜잭션을 롤백, 취소 할 수 있는것과 다르게 Redis에서는 롤백, 취소가 불가능합니다. 그래서 다른 데이터베이스와는 다르게 약간 활용도가 떨어집니다.

### MULTI
MULTI 명령은 여러 명령을 Redis로 전송하지만 실행하지는 않습니다.

### EXEC
EXEC 명령어는 대기중인 모든 명령을 실행합니다.

예를 들어보면
```
MULTI
SET color red
SET count 5
EXEC
```
다음과 같이 사용할 수 있습니다.

### WATCH 명령 사용하기
WATCH \[key]

watch명령은 특정 key에 저장된 값을 지켜봅니다.
다음 트랜잭션이 실행되기 전에 해당 key의 값이 변경되면, 트랜잭션이 자동으로 실패합니다.

```
WATCH color
MULTI
SET color red
SET count 5
EXEC
```
이렇게 사용할 수 있습니다. 그럼 EXEC 명령이 실행되기 전, color에 저장된 값이 바뀐다면, 해당 transaction이 취소됩니다.

Redis에서는 이렇게 WATCH MULTI ~ EXEC 명령을 사용해 동시성 문제를 해결할 수 있습니다.

추가로 알아둬야 할 것은, Transaction은 Redis와의 connection을 완전히 점유하기 때문에, Transaction을 생성할 때 새 연결을 추가해야 한다는 것입니다.

## LUAscript 사용하기

만약 redis의 sorted set에서 score가 2의 배수인 모든 member를 찾으려 한다고 생각해봅시다.
Redis의 명령 중 이걸 한번에 할 수 있는 명령은 없습니다.
모든 값을 읽고, filter를 적용해야하죠.

### LUAscript
luascript는 redis의 모든 명령에 접근 가능한 서버에 작성하는 코드입니다.
이를 redis에 전송하면, LUAscript를 실행하고 결과를 server로 전송 받을 수 있습니다.
하나의 luascript로 여러개의 redis명령을 동시에 실행할 수 있습니다.

LUAscript의 명령을 간단히만 알아봅시다.

```lua
print(123)
print('hello world')

local sum = 1 + 1; --지역 변수 선언
sum2 = 1 + 2 --전역 변수 선언. redis에서 사용할 수 없음.

print(sum)

if sum > 0 then --조건문
	print("big")
end
if sum ~= 0 then --조건문
	print("wrong")
end
if sum == 0 then --조건문
	print("right")
end

--of 추가로 0, 빈 문자열 등은 false의 의미로 쓰이지 않음
if 0 and '' then --조건문
	print("it will be printed")
end

if false or not true then --조건문
	print("it will not be printed")
end

--null의 역할을 하는건 nil입니다.
if nil then --조건문
	print("it will not be printed")
end
```

```lua
local colors = {'red, 'green', 'blue'}
print(colors[1]) --배열의 idx는 1부터 시작합니다.
print(#colors) --배열의 길이 출력

table.insert(colors, 'orange') --배열 마지막에 값 추가

for i, v in ipairs(colors) do
	print(i, v) --i:인덱스, v:값
end

for i=5, 10 do --시작값, 종료값
	print(i)
end

-- LUA table == JS object
local user = {id = 'a', name = 'samantha'}
print(user['id'])

for k, v in pairs(user) do
	print(k, v)
end
```
LUAscript의 사용은 다음과 같은 과정을 거칩니다.
1. script 작성
2. script load -> script의 ID 반환받음
3. script ID 이용하여 호출: EVALSHA명령 사용


### script 작성

SCRIPT LOAD 'return 1 + 1'
다음 명령을 실행하면 redis에서 script의 ID를 긴 문자열로 반환해줍니다.

### script 사용
EVALSHA \[scriptID] 0 \[arg1] ...
ex) EVALSHA \[ID] 0 '10' '20' '30'
0의 의미는 잠시 후 설명하겠습니다.
arg로는 문자를 전달해줘야 합니다. LUA에서 tonumber함수로 숫자로 변환할 수 있습니다.
idx가 1부터 시작한다는 걸 주의해야 합니다.

### script에서 redis 사용
```lua
return redis.call('GET', 'color')
```
다음과 같은 명령은 잘 작동하지만 이렇게 사용해서는 안됩니다.
이 script를 호출하면 EVALSHA에서 어떤 키를 썼는지 모른 채 호출하게 됩니다.
EVALSHA를 호출할 때 key를 전달해주는 방식을 사용해줘야 합니다.

```lua
return redis.call('GET', KEYS[1])
```
KEYS는 자동으로 정의되는 전역변수입니다.

EVALSHA \[scriptID] 1 \[key1] \[arg1] ...

ex) EVALSHA \[ID] 1 color '10' '20' '30'
아까의 명령에 있던 0은 key의 개수를 나타내는 것이었습니다.
사용할 key의 개수만큼 적고, 그 뒤에 key들을 적고 그 뒤에 arg를 적어주면 됩니다.

위에서 본 것처럼, EVALSHA에서 명시하지 않은 key를 사용하는 script를 작성해도 오류가 발생하지는 않습니다. 하지만 나중에 문제를 일으킬 가능성이 매우 높으므로, 사용하지 않는게 좋습니다.
