# Nextjs
## 프로젝트 생성
```
npx create-next-app@latest <프로젝트명> --typescript
```
ts템플릿으로 시작.
```
✔ Would you like to use ESLint? … No / Yes
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like your code inside a `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to use Turbopack for `next dev`? … No / Yes
✔ Would you like to customize the import alias (`@/*` by default)? … No / Yes
```
알아서 선택.
## 프로젝트 구조 (Turbopack/App Router 사용)
```
project/
├── app/                # Turbopack 기반 라우팅 페이지
│   ├── layout.tsx      # 공통 레이아웃 파일
│   ├── page.tsx        # 홈 페이지
└── public/             # 정적 파일
```
여기서 api만드는법은 app/api/<api엔드포인트>/route.ts에서 만들자. [자세한정보](#api만들기-예제) <br>
여기서 일반페이지 만드는법은 app/<페이지엔드포인트>/page.tsx에서 만들자. [자세한정보](#page만들기-예제)

## api만들기 예제
```ts
import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json(null,{ status: 403 });
}

export async function POST(request: Request) {
    const body = await request.json();
    return NextResponse.json({
      message: 'POST request received',
      data: body,
    },
);
}
```
## page만들기 예제
```tsx
export default function HelloPage() {
    return (
      <div>
        <h1>Hello, Turbopack!</h1>
        <p>Welcome to the /hello route.</p>
      </div>
    );
  }
```
