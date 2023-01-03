---
thumbnail: univting.png
slug: "/blog/univting/telefunc"
date: "2023-01-02"
title: "유니브팅 - Telefunc"
categories: "project"
typora-copy-images-to: ..\images
typora-root-url: ..\images
---

## Telefunc란

Telefunc는 기존 서버와 통신하는 방식인 rest api나 graphql과 다르게, fontend에서 backend의 함수를 직접 호출하는 것처럼 사용할 수 있는 방식을 제공한다.

## Telefunc사용 이유

우리 프로젝트는 backend가 복잡하게 구성되진 않을 것 같아서 nextjs의 api routes를 서버로 사용하려 했다.
그러던 중, Telefunc를 사용하면 nextjs에서 Backend를 따로 분리하지 않아도 된다는걸 알게 됐고, 프로젝트에 한번 적용해보기로 했다.

## 사용

- /next.config.js

```javascript
const withTelefunc = require("telefunc/next").default

module.exports = withTelefunc()
```

- /pages/\_app.tsx

```javascript
...
const isBrowser = typeof window !== 'undefined';
if (isBrowser) {
  config.telefuncUrl = '/api/_telefunc';
}

export default function App({ Component, pageProps }: AppProps) {
	...
}
```

-pages/api/\_telefunc.ts
위의 \_app.tsx에서 설정한 telefuncUrl에서 아래와 같이 설정해두면 알아서 Telefunc함수 호출을 http request로 바꿔주는 방식인듯 하다.

```javascript
import { telefunc, config } from "telefunc"
import type { NextApiRequest, NextApiResponse } from "next"
import assert from "assert"
import { getIronSession } from "iron-session"
import { SESSION_OPTION } from "../../config/cookie"

config.telefuncUrl = "/api/_telefunc"

export default async function telefuncMiddleware(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getIronSession(req, res, SESSION_OPTION)
  const { url, method, body } = req
  assert(url && method)
  const httpRequest = {
    url,
    method,
    body,
    context: { session },
  }
  const httpResponse = await telefunc(httpRequest)
  res.status(httpResponse.statusCode).send(httpResponse.body)
}
```

- /TelefuncContext.ts

```javascript
import { IronSession } from 'iron-session';
import 'telefunc';

declare module 'telefunc' {
  namespace Telefunc {
    interface Context {
      session: IronSession;
    }
  }
}

```

- /components/Nav.tsx

```javascript
...
import { onGetUser, onLogout } from '../router/login.telefunc';

export default function Nav() {
	...
  useEffect(() => {
    (async () => {
      const user = await onGetUser();
      setUser(user);
    })();
  }, []);

  async function logout() {
    await onLogout();
    setUser(null);
    router.reload();
  }

  return (
    <nav>
      <Flex justifyContent="space-between">
        <Link href="/">
          <strong>Univting</strong>
        </Link>
        {user && (
          <Button background="none" onClick={logout}>
            Logout
          </Button>
        )}
      </Flex>
    </nav>
  );
}
```

Telefunc 설정을 마치면 이제 frontend에서 ~.telefunc.ts 파일에 정의한 함수를 import하고 호출하여 사용할 수 있다.
