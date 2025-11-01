This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🚀 Getting Started

### 1. 환경 변수 설정

`.env` 파일을 생성하고 다음 내용을 추가하세요:

```bash
# 데이터베이스
DATABASE_URL=postgresql://postgres:postgres@localhost:5431/postgres

# 카카오 로그인
KAKAO_REST_API_KEY=your_rest_api_key
KAKAO_REDIRECT_URI=http://localhost:3000/api/auth/kakao
NEXT_PUBLIC_KAKAO_JS_KEY=your_javascript_key

# AI 서버
AI_SERVER=http://localhost:8000
```

### 2. 데이터베이스 시작

```bash
docker-compose up -d
```

### 3. 데이터베이스 마이그레이션

```bash
make migrate

# 또는
npx prisma migrate dev
```

### 4. 개발 서버 실행

```bash
npm run dev
```

## 📊 AI 트레이딩 분석 API

AI 트레이딩 분석 API를 사용하여 코인 캔들 데이터를 분석할 수 있습니다.

### API 엔드포인트

```
POST /api/trading/analyze
```

### 요청 예시

```bash
curl -X POST "http://localhost:3000/api/trading/analyze" \
     -H "Content-Type: application/json" \
     -d '{
       "market": "KRW-BTC",
       "interval": 15,
       "hours": 12
     }'
```

### 요청 파라미터

- `market`: 코인 마켓 코드 (예: KRW-BTC)
- `interval`: 캔들 시간 간격 (분 단위, 예: 15)
- `hours`: 분석할 시간 범위 (시간 단위, 예: 12)

### 동작 방식

- **AI_SERVER가 localhost인 경우**: 실제 API 요청을 보내지 않고 빈 객체 `{}`를 반환합니다.
- **AI_SERVER가 설정된 경우**: AI 서버로 분석 요청을 전송하고 결과를 반환합니다.

