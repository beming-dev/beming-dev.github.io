---
thumbnail: univting.png
slug: "/blog/univting/chakra"
date: "2023-01-03"
title: "유니브팅 - Chakra UI"
categories: "project"
typora-copy-images-to: ..\images
typora-root-url: ..\images
---

## Chakra UI란

Chakra UI는 React앱을 빌드할때 사용가능한 블록들을 제공합니다. Chakra UI의 블록들은 props로 style을 받기 때문에 따로 css를 사용할 필요가 없습니다.

## Chakra UI 사용이유

앞서 말한것처럼 따로 css를 사용할 필요가 없는것도 장점이고, display:flex같이 자주 사용하는 것들을 이미 \<Flex> 처럼 하나의 블록으로 정의 해뒀기 때문에 개발 시간이 더 단축됩니다.</br>
이 외에도 Chakra설정파일을 이용하면 자주 사용하는 color나 size등을 변수처럼 저장해두고 사용할 수도 있습니다.</br>
또한 이전 프로젝트를 할때, classname을 생각해내는게 머리가 아팠는데, Chakra를 사용하면 classname도 지정해줄 필요가 없습니다.

## 사용

```javascript
import { Flex, Image, Text } from "@chakra-ui/react"
import { IChatting, IUser } from "../global"

interface Props {
  chat: IChatting;
  user: IUser;
}

export default function Chat({ chat, user }: Props) {
  return (
    <Flex
      alignItems="center"
      flexDirection={chat.user_id === user?.id + "" ? "row-reverse" : "row"}
      margin="5px 0"
    >
      <Image
        borderRadius="full"
        objectFit="cover"
        boxSize="50px"
        src="/profile.jpg"
        alt="profile"
        margin="0 5px"
      />
      <Flex flexDirection="column">
        <Text
          as="b"
          fontSize="md"
          alignSelf={chat.user_id === user?.id + "" ? "end" : "start"}
        >
          {/* {chat.name} */}
        </Text>
        <Text
          padding="5px 10px"
          backgroundColor={
            chat.user_id === user?.id + "" ? "red.100" : "blackAlpha.200"
          }
          borderRadius="5px"
          fontSize="sm"
        >
          {chat.description}
        </Text>
      </Flex>
    </Flex>
  )
}
```
