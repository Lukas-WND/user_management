# User Management System

Sistema completo de gerenciamento de usuários, com autenticação via cookies, validações robustas com Zod e comunicação entre front-end (Next.js) e back-end (NestJS).

---

## 🧠 Tecnologias utilizadas

### Back-end (NestJS)

- NestJS  
- TypeORM  
- MySQL  
- Zod (validação)  
- Swagger (documentação)  
- Bcrypt (hash de senhas)  
- Cookie Parser  

### Front-end (React - Next.js)

- React  
- Next.js App Router  
- React Query  
- Axios  
- Tailwind CSS  
- Zod + React Hook Form  
- Sonner (toasts)  
- Context API  

---

## 🚀 Como rodar o projeto localmente

### 📥 Clonando o projeto

1. Clone o repositório:
```bash
git clone https://github.com/Lukas-WND/user_management.git
```

2. Acesse o diretório do projeto:
```bash
cd user_management
```

---

### 🖥️ Backend (NestJS)

3. Acesse a pasta do back-end:
```bash
cd back
```

4. Crie o arquivo `.env` com as variáveis de ambiente:
```
DB_HOST=database
DB_PORT=3306
DB_USER=root
DB_PASS=root
DB_NAME=database

SECRET_KEY=MY_SECRET_KEY
FRONTEND_URL=http://localhost
```

5. Volte para a raiz do projeto:
```bash
cd ..
```

---

### 🖥️ Frontend (Next.js)

6. Acesse a pasta do front-end:
```bash
cd front
```

7. Crie o arquivo `.env` com as variáveis de ambiente:
```
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_WEBPACK_USEPOLLING=1
```

8. Volte para a raiz do projeto:
```bash
cd ..
```

---

### 🐳 Docker

9. Construa e inicie os containers com o Docker Compose:
```bash
docker-compose up -d --build
```

---

## 🔐 Funcionalidades principais

1. Cadastro de usuários  
2. Login com cookies HTTP-only  
3. Logout e proteção de rotas  
4. Atualização de perfil com troca de senha segura  
5. Validações front-end e back-end com Zod  
6. Toasts de feedback com Sonner  
7. Documentação Swagger no back-end (`/docs`)  
8. Autenticação persistente via cookies (SSR-ready)  

---

## 📌 Requisitos

- Node.js >= 18  
- Docker e Docker Compose