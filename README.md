# App Básica — Docker + CI + Deploy AWS EC2

## Rodando localmente

```bash
docker compose up --build
```

Acesse: http://localhost:3000

## Rodando testes localmente

```bash
npm install
npm test
```

## CI (GitHub Actions)

O workflow `.github/workflows/ci.yml` roda os testes e valida o build da imagem
Docker em todo push/PR para a branch `main`.

## Deploy para EC2

O workflow `.github/workflows/deploy.yml` roda os testes, builda a imagem, envia
para o Docker Hub e faz deploy via SSH em uma instância EC2, toda vez que houver
push na branch `main`.

### 1. Preparar a instância EC2

- Suba uma instância EC2 (Ubuntu 22.04, t2.micro serve pro básico).
- Libere as portas no Security Group:
  - 22 (SSH) — apenas do seu IP
  - 80 (HTTP) — de qualquer lugar (0.0.0.0/0)
- Conecte via SSH e instale o Docker:

```bash
sudo apt update
sudo apt install -y docker.io
sudo systemctl enable --now docker
sudo usermod -aG docker $USER
```

### 2. Criar conta no Docker Hub

Crie um repositório público (ex: `seu-usuario/app-basica`) e gere um Access Token
em Account Settings > Security.

### 3. Configurar Secrets no GitHub

No repositório: **Settings > Secrets and variables > Actions > New repository secret**

| Secret | Valor |
|---|---|
| `DOCKERHUB_USERNAME` | seu usuário do Docker Hub |
| `DOCKERHUB_TOKEN` | o access token gerado |
| `EC2_HOST` | IP público da instância EC2 |
| `EC2_USER` | geralmente `ubuntu` |
| `EC2_SSH_KEY` | conteúdo da chave privada `.pem` usada para acessar a instância |

### 4. Push para main

```bash
git push origin main
```

O workflow builda, testa, sobe a imagem e faz o deploy automaticamente.
Depois, acesse `http://<IP_DA_EC2>` no navegador.
