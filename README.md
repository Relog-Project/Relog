# 1. ngrok 실행
ngrok http 3000

# 2. 출력된 URL 복사
# https://xxxx.ngrok-free.app

# 3. .env.local 업데이트
NEXTAUTH_URL=https://xxxx.ngrok-free.app

# 4. constants/config.ts 업데이트
export const BASE_URL = 'https://xxxx.ngrok-free.app';

# 5. Next.js 서버 재시작
npm run dev