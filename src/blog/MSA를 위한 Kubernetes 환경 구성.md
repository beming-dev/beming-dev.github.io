
본 포스팅은 단순히 환경 구성 기록용 입니다.


# 필수 패키지 설치, 시스템 설정
```shell
# 업데이트 및 필수 도구 설치
sudo apt-get update
sudo apt-get install -y \
  apt-transport-https \
  ca-certificates \
  curl \
  gnupg \
  lsb-release

# bridge 네트워크용 커널 모듈 활성화
sudo modprobe br_netfilter

# iptables 설정 영구 적용
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-iptables  = 1
net.ipv4.ip_forward                 = 1
net.bridge.bridge-nf-call-ip6tables = 1
EOF
sudo sysctl --system

```

- Kubernetes 저장소를 HTTPS로 안전하게 조회
- GPG 키 검증에 필요한 도구들
- lsb-release: 배포판 정보를 조회
- modprobe br_netfilter: CNI 플러그인이 Pod 간 트래픽을 브리지로 처리할 때 필수입니다.
- - - `net.bridge.bridge-nf-call-iptables = 1` → 브리지 인터페이스의 트래픽도 iptables 체인(FILTER/NAT)에 걸리도록 허용
- `net.ipv4.ip_forward = 1` → 노드가 IP 패킷을 다른 인터페이스로 포워딩하도록 허용 (클러스터 내부 라우팅)     
- `/etc/sysctl.d/k8s.conf`에 저장해 재부팅 후에도 유지되게 하고, `sysctl --system`으로 즉시 적용


# 컨테이너 런타임 설정
```shell
# containerd 설치
sudo apt-get install -y containerd

# 기본 설정 파일 생성
sudo mkdir -p /etc/containerd
sudo containerd config default | sudo tee /etc/containerd/config.toml

# systemd cgroup 사용하도록 변경
sudo sed -i 's/SystemdCgroup = false/SystemdCgroup = true/' /etc/containerd/config.toml

# 재시작
sudo systemctl restart containerd
sudo systemctl enable containerd

```
containerd 설치
- Kubernetes가 직접 통신하는 CRI(Container Runtime Interface) 호환 런타임입니다.
- Docker 엔진보다 가볍고, Docker가 내부적으로 사용하는 런타임 자체이기도 합니다.
# Kubernetes 컴포넌트 설치
```shell
# GPG 키 가져오기
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.30/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg

# 리포지터리 등록
echo "deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.30/deb/ /" | sudo tee /etc/apt/sources.list.d/kubernetes.list

sudo apt-get update

# 컴포넌트 설치
sudo apt-get install -y kubelet kubeadm kubectl

# 버전 업데이트 방지
sudo apt-mark hold kubelet kubeadm kubectl

```

- GPG 키를 가져오고, kubernetes 공식 바이너리의 APT 저장소 추가
- 자동 업그레이드 시 버전 충돌을 막기 위해, 이 세 패키지를 고정

# 램스왑 끄기

``` shell
KUBELET_EXTRA_ARGS="--fail-swap-on=false"
```
kubernetes는 기본적으로 swap 메모리를 허용하지 않습니다. 위 플래그를 주어 swap 메모리를 허용하거나, swap메모리를 삭제합시다.

# 마스터 노드 초기화
``` shell
sudo kubeadm init \
  --pod-network-cidr=10.244.0.0/16 \
  --apiserver-advertise-address=$(hostname -i)
```

# Kubectl 설정 (비 root 사용자용)
``` shell
# 일반 사용자 홈 디렉터리로 설정 복사
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

# CNI 배포

``` shell
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
```

# 단일 노드에 워커 스케줄링 허용
``` shell
kubectl taint nodes --all node-role.kubernetes.io/master-
```