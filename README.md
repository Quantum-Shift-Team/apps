This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🚀 Getting Started

### 1. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```bash
# 데이터베이스
DATABASE_URL=postgresql://postgres:postgres@localhost:5431/postgres

# 카카오 로그인
KAKAO_REST_API_KEY=your_rest_api_key
KAKAO_REDIRECT_URI=http://localhost:3000/api/auth/kakao
NEXT_PUBLIC_KAKAO_JS_KEY=your_javascript_key
```

### 2. 데이터베이스 시작

```bash
# Docker Compose로 PostgreSQL 시작
make db-up

# 또는
docker-compose up -d
```

### 3. 데이터베이스 마이그레이션

```bash
make db-migrate

# 또는
npx prisma migrate dev
```

### 4. 개발 서버 실행

```bash
npm run dev
# or
make dev
```

