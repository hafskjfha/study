# Tailwind CSS + TSX(React + TypeScript) 사용법 및 API 정리

## 1. 프로젝트 설정

### a. React + TypeScript 프로젝트 생성
```bash
npx create-react-app my-app --template typescript
cd my-app
```

### b. Tailwind CSS 설치 및 설정
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### c. `tailwind.config.js` 수정
`src` 디렉토리를 대상으로 Tailwind가 클래스 검색을 할 수 있도록 설정합니다.

```js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: []
};
```

### d. 글로벌 CSS 파일 설정
`src/index.css` 파일에 Tailwind 디렉티브를 추가합니다.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### e. `index.tsx`에 스타일 연결
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## 2. Tailwind CSS 클래스 사용 예시 (TSX)

### a. 기본 사용법
React 컴포넌트에서 Tailwind 클래스를 문자열로 전달하여 스타일링할 수 있습니다.

```tsx
const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">Hello, Tailwind with TSX!</h1>
    </div>
  );
};

export default App;
```

### b. 조건부 Tailwind 클래스 적용
`classnames` 라이브러리를 사용하면 조건에 따라 Tailwind 클래스를 쉽게 적용할 수 있습니다.

```bash
npm install classnames
```

```tsx
import classNames from 'classnames';

interface ButtonProps {
  primary?: boolean;
  label: string;
}

const Button: React.FC<ButtonProps> = ({ primary, label }) => {
  const buttonClass = classNames(
    'px-4 py-2 rounded',
    {
      'bg-blue-500 text-white': primary,
      'bg-gray-200 text-black': !primary,
    }
  );

  return <button className={buttonClass}>{label}</button>;
};

export default Button;
```

### c. Dynamic Styling (TSX 내 변수 활용)
```tsx
const color = 'red-500';

const DynamicComponent: React.FC = () => {
  return (
    <div className={`text-${color} font-bold`}>
      Dynamic Tailwind Class
    </div>
  );
};
```

*위 코드는 직접적인 문자열 연결을 권장하지 않으며, TypeScript의 타입 검사와 충돌할 수 있으므로 `classnames` 사용을 권장합니다.*

---

## 3. Tailwind CSS 주요 API 정리

### a. Utility 클래스 예시
- **레이아웃**  
  - `flex`, `grid`, `block`, `inline-block`, `hidden`
  - `justify-center`, `items-center`, `gap-4`
  
- **스페이싱**  
  - `p-4`, `m-2`, `px-4`, `py-2`, `space-x-4`
  
- **타이포그래피**  
  - `text-sm`, `text-lg`, `font-bold`, `italic`
  
- **색상**  
  - `bg-blue-500`, `text-gray-700`, `border-red-400`
  
- **상태 기반 스타일**  
  - `hover:bg-blue-700`, `focus:outline-none`, `active:scale-95`
  
- **반응형**  
  - `sm:text-base`, `md:text-lg`, `lg:text-xl`, `xl:text-2xl`

자세한건 [api.md](api.md)

### b. 커스터마이징
`tailwind.config.js`에서 테마 확장이 가능합니다.

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        customBlue: '#1E40AF',
      },
      spacing: {
        '72': '18rem',
      },
    },
  },
};
```

---

## 4. TypeScript 지원 향상

### a. Tailwind CSS IntelliSense 설치
VS Code 확장 프로그램 **Tailwind CSS IntelliSense**를 설치하면 자동 완성 기능을 지원합니다.

```bash
npm install -D @tailwindcss/typography @tailwindcss/forms
```

### b. 타입 안전을 위한 타입 선언
프로젝트에서 Tailwind 클래스를 타입 안전하게 관리하려면 아래와 같이 선언합니다:

```tsx
type TailwindClassNames = 'text-red-500' | 'bg-blue-400' | 'p-4';
```

---

