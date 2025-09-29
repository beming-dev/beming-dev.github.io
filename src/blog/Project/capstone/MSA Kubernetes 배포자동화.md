---
thumbnail: default.jpg
slug: "/blog/capstone/cicd"
date: "2025-07-30"
title: "MSA - Kubernetes, ArgoCD 배포자동화"
categories:
  - mainCategory: "Project"
    subCategory: "capstone"
---

# Argo CD

ArgoCD는 애플리케이션의 선언적 메니페스트를 Git 저장소에 두고, 클러스터 상태를 Git에 저장된 상태와 실시간으로 비교하고 동기화 해 주는 도구입니다. Git commit만으로 배포, 롤백, 드리프트 감지 등의 기능을 제공합니다.

Kubernetes 애플리케이션의 자동 배포를 위한 CD 툴로, Helm또는 Kustomize방식을 사용합니다.

Git저장소를 단일 출처로 삼아, 매니페스트 파일을 Git에 두면, ArgoCD가 주기적으로 Git에서 desired state를 가져와 클러스터의 live state와 비교하고, 차이가 있다면 kubectl apply, kubectl delete와 같은 명령으로 자동 동기화를 합니다.

---

# 과정 기록

아래는 제가 git, ArgoCD를 이용해 CI/CD 파이프라인을 구성한 방법입니다.
Spring backend 배포를 기준으로 작성하였습니다.

## Git Repository 준비

먼저, 두가지의 Git Repository가 준비돼야 합니다.

- 백엔드 Repository

```csharp
backend-repo/
├── .github/
│	└── workflows/
│		└── ci-cd.yml
├── src/…           # Spring Boot 소스
├── pom.xml
└── Dockerfile
```

Docker image가 빌드 되는 Dockerfile과, github action을 실행할 수 있는 yaml파일이 필요합니다.

- ci/cd용 repo

```csharp
infra-repo/
├── argocd/
│   ├── backend-app.yaml
├── base/
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   └── kustomization.yaml
│   └── namespace.yaml
└── overlays/
    └── production/
	    └── patches/
		│   └── backend-env.yaml
		│   └── backend-replicas.yaml
        └── kustomization.yaml
        └── sealedsecret-backend-env.yaml
```

## 먼저, CI 파이프라인을 설정해봅시다.

backend repository의 ci-cd.yaml파일에 아래와 같이 작성합니다.

```yaml
# .github/workflows/backend-deploy.yml

name: Backend CI/CD Pipeline

on:
  push:
    branches: [main]
    paths:
      - "backend/**"

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      # 1. 소스 코드 체크아웃
      - name: Checkout code
        uses: actions/checkout@v4

      # 2. Docker Buildx 설정 (최신 버전 사용)
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      # 3. Docker Hub 로그인 (시크릿 이름은 실제 설정에 맞게 확인)
      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }} # 또는 secrets.DOCKER_USER
          password: ${{ secrets.DOCKERHUB_TOKEN }} # 또는 secrets.DOCKER_TOKEN

      # 4. Docker 이미지 빌드 및 푸시 (context 경로 수정)
      - name: Build & Push image
        uses: docker/build-push-action@v5
        with:
          context: ./backend/chatirumae # <-- backend 디렉토리를 빌드 컨텍스트로 명시
          push: true
          tags: beming/chat-irumae-backend:${{ github.sha }}

      # 5. GitOps(Infra) 리포지토리 체크아웃
      - name: Checkout infra repo
        uses: actions/checkout@v4
        with:
          repository: ChatIrumae/gitops
          token: ${{ secrets.INFRA_TOKEN }} # GitOps 리포지토리에 push 권한이 있는 토큰
          path: infra

      # 6. yq 설치 (매우 중요!)
      - name: Install yq
        uses: mikefarah/yq@v4.34.1 # yq 설치 액션 사용

      # 7. Kustomize 이미지 태그 업데이트 (yq 실행)
      - name: Update Kustomize image tag
        run: |
          cd infra/base/backend

          REPO_NAME=${{ github.event.repository.name }}
          IMAGE_NAME="beming/chat-irumae-backend"
          NEW_TAG=${{ github.sha }}

          echo "🔧 Updating image $IMAGE_NAME to tag $NEW_TAG"

          # yq를 사용하여 이미지 태그 업데이트
          yq e '(.images[] | select(.name == "'"$IMAGE_NAME"'") ).newTag = "'"$NEW_TAG"'"' -i kustomization.yaml

          echo "✅ Diff after update:"
          git -C ../../.. diff # infra 루트에서 diff 실행

      # 8. 변경사항 커밋 및 푸시 (git add 경로 수정)
      - name: Commit & Push infra changes
        run: |
          cd infra
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add base/backend/kustomization.yaml # <-- 수정한 파일만 명시적으로 add

          # 변경사항이 있을 때만 커밋
          if ! git diff --staged --quiet; then
            git commit -m "chore(backend): Bump ${{ github.repository }} image to ${{ github.sha }}"
            git push
          else
            echo "No changes to commit."
          fi

```

위 yaml파일을 간단히 설명하면, main 브랜치에 코드가 push 되면, Dockerfile을 build하여 Docker hub에 push합니다.

그런 다음, ci-cd repository로 이동한 후, 방금 push한 이미지의 태그값을 kustomization.yaml파일에 알려주며 해당 repository에 커밋을 넣습니다.

이 커밋은 나중에 argoCD를 트리거하는 역할을 할 것입니다.

이 과정에서 세가지 환경변수를 git backend repository에 등록해야 합니다.

- DOCKER_USER: Docker hub username
- DOCKER_TOKEN: Docker hub에서 발급해주는 토큰
- INFRA_TOKEN: git에서 발급받은 ci-cd repository에 접근 가능한 토큰

INFRA_TOKEN은 git profile 클릭 -> settings -> developer settings -> personal access tokens -> Tokens(classic)에서 발급받을 수 있습니다.

환경변수는 backend repository에 접속 후, setting -> Secrets and Variables -> actions 에서 등록 가능합니다.

## ArgoCD를 설정해봅시다.

이제 kubernetes가 설치돼있는, kubectl 명령을 사용할 수 있는 인스턴스에 접속합니다.

kubernetes에 argoCD를 설치해줍시다.

```bash
# 1) Argo CD 네임스페이스 생성
kubectl create namespace argocd

# 2) Argo CD 컨트롤러 설치
kubectl apply -n argocd \
  -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# 3) 서버 접근을 위해 포트포워딩 (로컬 테스트용)
kubectl -n argocd port-forward svc/argocd-server 8080:443
```

이제 public_ip:8080 번 포트로 접속하면 argoCD의 로그인 창을 볼 수 있습니다.
물론 인스턴스의 방화벽에서 8080번 포트가 허용돼있어야 합니다.

초기 ID값은 admin이고,
비밀번호는 아래의 명령으로 확인할 수 있습니다.

```bash
# admin 비밀번호 = Argo CD server Pod 이름
kubectl -n argocd get pods -l app.kubernetes.io/name=argocd-server -o name \
  | cut -d'/' -f2

# 안되면 아래의 방법을 사용
argocd admin initial-password -n argocd
```

로그인에 성공했다면, 아래와 같은 화면을 볼 수 있습니다.
![[Pasted image 20250714114029.png]]

## 이제 cicd repository의 스크립트 설정을 해봅시다.

아까전에 아래와 같이 꽤 복잡한 구조를 구성해뒀습니다.

```csharp
infra-repo/
├── argocd/
│   ├── backend-app.yaml
├── base/
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   └── kustomization.yaml
│   └── namespace.yaml
└── overlays/
    └── production/
	    └── patches/
		│   └── backend-env.yaml
		│   └── backend-replicas.yaml
        └── kustomization.yaml
        └── sealedsecret-backend-env.yaml
```

먼저, argoCD의 진입점은 /overlays/production/kustomization.yaml 파일입니다.

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - ../../../base/backend
  - sealedsecret-backend-env.yaml
patches:
  - path: backend-replicas.yaml
    target:
      kind: Deployment
      name: spring-backend
  - path: backend-env.yaml
    target:
      kind: Deployment
      name: spring-backend

```

이 파일을 로드하면서

- `resources` 로 지정된 `../../../base` 디렉토리와
- `sealedsecret-backend-env.yaml` 을 순서대로 가져옵니다.

그런 다음, /base/kustomization.yaml에 있는 파일을 읽습니다.

```yaml
resources:
  - backend-deploy.yaml
  - backend-svc.yaml
  - namespace.yaml

images:
  - name: beming/stock-simulator-back
    newTag: placeholder-backend

apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
```

- `backend-deploy.yaml`, `backend-svc.yaml`, `namespace.yaml` 을 차례로 읽습니다.
- `images` 블록에 따라 Deployment의 `image:` 필드를 치환하는데, 이 때 tag값은 아까전의 github action에서 치환하여 commit을 넣어줍니다.

/base/backend-deploy.yml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: spring-backend
  labels:
    app: spring-backend
spec:
  replicas: 1 # base에서는 1로 두고, overlays에서 프로덕션/스테이징 복제 수 조정
  selector:
    matchLabels:
      app: spring-backend
  template:
    metadata:
      labels:
        app: spring-backend
    spec:
      containers:
        - name: spring-backend
          # CI에서 placeholder-backend를 실제 SHA/tag로 교체합니다
          image: beming/chat-irumae-backend:placeholder-backend
          # envFrom:
          #   - secretRef:
          #       name: backend-env
          ports:
            - containerPort: 3001
              name: http
          # 선택: 헬스체크
          # readinessProbe:
          #   httpGet:
          #     path: /actuator/health
          #     port: http
          #   initialDelaySeconds: 20
          #   periodSeconds: 10
          # livenessProbe:
          #   httpGet:
          #     path: /actuator/health
          #     port: http
          #   initialDelaySeconds: 60
          #   periodSeconds: 20
          # 선택: 리소스 요청·제한
          resources:
            requests:
              cpu: "100m"
              memory: "128Mi"
            limits:
              cpu: "500m"
              memory: "512Mi"

```

/base/spring-svc.yml

```yaml
apiVersion: v1
kind: Service
metadata:
  name: spring-backend-service
spec:
  type: NodePort
  selector:
    app: spring-backend
  ports:
    - protocol: TCP
      port: 3001
      targetPort: 3001
      nodePort: 30081
```

/base/namespace.yaml

```apiVersion: v1
kind: Namespace
metadata:
  name: backend-namespace
```

/patches/backend-env.yaml

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: spring-backend # base/backend-deploy.yaml 의 metadata.name 과 반드시 일치
spec:
  template:
    metadata:
      # (선택) 프로덕션 환경을 나타내는 라벨 추가
      labels:
        environment: production
    spec:
      containers:
        - name: spring-backend # base 의 container name 과 일치
          # 1) 프로덕션 프로파일 활성화를 위한 환경변수
          env:
            - name: SPRING_PROFILES_ACTIVE
              value: production
            - name: JAVA_OPTS
              value: "-Xms512m -Xmx1g"
          # 2) 리소스 요청(requests) / 제한(limits)
          resources:
            requests:
              cpu: "500m"
              memory: "512Mi"
            limits:
              cpu: "1"
              memory: "1Gi"
```

/patches/backend-replicas.yaml

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: spring-backend # base/backend-deploy.yaml 에 정의된 Deployment 이름과 동일해야 합니다
spec:
  replicas: 3 # 프로덕션에서 원하는 복제본 수

```

아래는 GPT가 그려준 대략적인 과정입니다.

```text
┌────────────────────────────────────┐
│ 1. Git 클론 및 overlays/production 로 진입
└────────────────────────────────────┘
             ↓
┌────────────────────────────────────┐
│ 2. Kustomize load overlays/...    │
│    ├── import base/ (resources)    │
│    └── import sealedsecret...      │
└────────────────────────────────────┘
             ↓
┌────────────────────────────────────┐
│ 3. base/kustomization.yaml 적용   │
│    ├─ backend-deploy.yaml      │
│    ├─ backend-svc.yaml         │
│    └─ namespace.yaml               │
│    + images.newTag 치환            │
└────────────────────────────────────┘
             ↓
┌────────────────────────────────────┐
│ 4. overlays/sealedsecret 추가     │
└────────────────────────────────────┘
             ↓
┌────────────────────────────────────┐
│ 5. patches 병합                   │
│    - replicas 변경                │
│    - envFrom secretRef 추가       │
└────────────────────────────────────┘
             ↓
┌────────────────────────────────────┐
│ 6. 최종 매니페스트 출력            │
└────────────────────────────────────┘
             ↓
┌────────────────────────────────────┐
│ 7. Argo CD가 kubectl apply (sync) │
└────────────────────────────────────┘

```

## 환경변수 지정

제가 가장 애먹었던 부분은 바로 환경변수를 지정하는 방법입니다.
환경변수가 public repository에 노출되지 않으면서, ArgoCD에 알려줄 수 있는 그런 방법이 필요했습니다.

위의 고민을 해결하기 위해, Sealed Secret Controller를 사용했습니다.
먼저 아래와 같이 Sealed Secret Controller를 설치해줍니다.

```bash
kubectl apply \
  -f https://github.com/bitnami-labs/sealed-secrets/releases/latest/download/controller.yaml
```

아래와 같은 명령으로 secret파일을 생성해줍니다.

secret-plain.yaml

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: backend-env
  namespace: backend-namespace
stringData:
  FRONT_BASE_URL: "https://beming-stock.kro.kr"
  JWT_SECRET: "randomstrlongerthan32fortestdonotusethisvalue"
```

아래 명령으로 Sealed Secret을 생성합니다.

```bash
kubeseal --format yaml \
  < secret-plain.yaml > sealedsecret.yaml
```

이제 결과로 암호화된 sealedsecret파일을 얻을 수 있습니다.
해당파일을 프로젝트의 /overlays/production 밑에 위치시켜줍니다.

그 후, /overlays/production/kustomization.yaml의 resources에,
sealedsecret.yaml 과 같이 등록해줍니다.

```yaml
resources:
  - ../../base
  - sealedsecret-backend-env.yaml
```

마지막으로, backend-env.yaml파일에 secret 이름을 추가해줍니다.

```yaml
---
spec:
  replicas: 1
  selector:
    matchLabels:
      app: spring-backend
  template:
    metadata:
      labels:
        app: spring-backend
    spec:
      containers:
        - name: spring-backend
          # CI에서 placeholder-backend를 실제 SHA/tag로 교체합니다
          image: beming/stock-simulator-back:placeholder-backend
          envFrom:
            - secretRef:
                name: backend-env
```

이제 컨테이너 내부에서 환경변수에 접근할 수 있게 됩니다.

모든 과정이 성공적으로 완료되면, 아래와 같은 화면을 볼 수 있습니다.
![[Pasted image 20250714134954.png]]

## 배포 확인

성공적으로 배포됐다면 api로 요청을 보낼 수 있어야겠죠?

저희는 service를 생성하는 backend.svc.yaml 파일에서, 30080번 포트를 외부에 노출시켰습니다.

아래 명령으로 EXTERNAL_IP값을 확인해줍시다.

```bash
kubectl get services -n backend-namespace

# 아래와 같은 결과가 나옵니다.
NAME TYPE CLUSTER-IP EXTERNAL-IP PORT(S) AGE
spring-backend NodePort 10.107.223.38 <none> 80:30080/TCP 3h31m
```

저의 경우는 EXTERNAL_IP가 비어있는데, 이런 경우는 인스턴스의 publicIP로 요청을 보내면 됩니다.

```
curl http://${EXTERNAL_IP}:30080/actuator/health
```

위의 결과로 제대로 된 응답이 온다면 성공입니다. 이제 백엔드를 kubernetes에 자동으로 배포하는 CI/C파이프라인이 구성됐습니다.

# 트러블 슈팅

## ArgoCD가 접속이 되지 않음

처음에 ArgoCD로 포트포워딩이 제대로 되지 않아 접속이 불가했습니다.

해결방법은 다음과 같습니다.

- 인스턴스의 방화벽 설정을 열어준다
- 아래와 같이 모든 인터페이스에 대해 포트 포워딩을 걸어준다.

```
kubectl port-forward \
  --address 0.0.0.0 \
  svc/argocd-server -n argocd 8080:443
```

이제 http://<EC2 퍼블릭IP>:8080
으로 접속이 가능합니다.

아래와 같이 백그라운드에서 실행하면 좀 더 편리합니다.

```
nohup kubectl -n argocd port-forward svc/argocd-server 8080:443 --address 0.0.0.0 \
  > ./argocd-port-forward.log 2>&1 &
```

## 이미지 pull이 실패하는 경우

argoCD UI에서 sync버튼을 눌러 backend deploy를 하면, Docker image pull 이 실패합니다.

그 이유는 저희가 Docker image의 tag값을 git에서 커밋으로 올려주도록 해뒀기 때문입니다.

이 상황을 피하고 싶다면, tag값을 latest로 해서 항상 이미지를 가져올 수 있게 하던가,
github action을 트리거 시켜서 argoCD를 작동시키면 됩니다.

태그값이 잘 들어갔는지는 argoCD의 UI log에서 확인 가능합니다.

## 배포에 성공했는데 ArgoCD에서 오류가 뜨는 경우

저희는 앱이 살아있다는 신호를 /actuator/health 라우트에서 신호를 받도록 yaml파일에 설정해뒀습니다.

이 신호를 받기 위해서는, actuator 의존성을 Spring에 추가해둬야 합니다.

gradle 기준 아래 명령을 build.gradle에 추가합니다.

```
implementation 'org.springframework.boot:spring-boot-starter-actuator'
```

application.properties에서 endpoint를 노출시킵니다.

```
server.port=3000
management.server.port=${server.port}
management.endpoints.web.exposure.include=health,info
management.endpoint.health.show-details=always
```

이렇게 하고 Docker image를 다시 빌드하면 해당 라우트가 잘 작동합니다.

참고로 server.port값은 Dockerfile의 Expose값과도 일치해야 하고, yaml파일에서도 포트 번호를 잘 신경써줘야 제대로 동작합니다.
