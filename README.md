# User Management System

Sistema completo de gerenciamento de usuários, com autenticação via cookies, validações robustas com Zod e comunicação entre front-end (Next.js) e back-end (NestJS).

---

## 🧠 Tecnologias utilizadas

### Back-end (NestJS)

- NestJS
- TypeORM
- PostgreSQL
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

### 🏗️ Docker
1. Execute o comando para montar e subir o container do banco de dados no docker:
```bash
docker-compose up -d --build
```

### 🖥️ Backend (NestJS)

1. Acesse a pasta `back/`:
```bash
cd back
```

2. Instale as dependências:
```bash
npm install
```

3. Crie o arquivo .env na raiz do projeto:
```
DB_HOST=localhost
DB_PORT=33065
DB_USERNAME=root
DB_PASSWORD=root
DB_NAME=database

SECRET_KEY=MY_SECRET_KEY
FRONTEND_URL=http://localhost:3001
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run start:dev
```

5. A documentação está disponível em: http://localhost:3000/docs

### 🖥️ Frontend (Next.js)

1. Acesse a pasta `front/`:
```bash
cd front
```

2. Instale as dependências:
```bash
npm install
```

3. Crie o arquivo .env na raiz do projeto:
```
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_WEBPACK_USEPOLLING=1
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. Acesse no navegador o endereço: http://localhost:3001

### 🔐 Funcionalidades principais
1. Cadastro de usuários  
2. Login com cookies HTTP-only  
3. Logout e proteção de rotas  
4. Atualização de perfil com troca de senha segura  
5. Validações front-end e back-end com Zod  
6. Toasts de feedback com Sonner  
7. Documentação Swagger no back-end  
8. Autenticação persistente via cookies (SSR-ready)

### 📌 Requisitos
- Node.js >= 18  
- Docker (para baixar a imagem do banco de dados)