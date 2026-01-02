# 📦 Pnpm & Turborepo 모노레포 구성 가이드

이 가이드는 Express API 서버와 크롤러 등 여러 서비스를 하나의 코드 베이스에서 관리하기 위한 최적화된 설정 방법을 담고 있습니다.

## 1. 초기 구조 생성

```bash
# 프로젝트 폴더 생성
mkdir my-monorepo && cd my-monorepo

# pnpm 초기화 및 폴더 구조 생성
pnpm init
mkdir -p apps/api-server apps/crawler packages/shared packages/tsconfig

```

## 2. 루트(Root) 설정

### `pnpm-workspace.yaml`

```yaml
packages:
  - 'apps/*'
  - 'packages/*'

```

### `turbo.json`

```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}

```

---

## 3. TypeScript 공통 설정 (`packages/tsconfig`)

### `packages/tsconfig/package.json`

```json
{
  "name": "@my/tsconfig",
  "version": "0.0.0",
  "private": true,
  "main": "base.json",
  "exports": {
    "./base.json": "./base.json"
  }
}

```

### `packages/tsconfig/base.json` (⚠️ noEmit 주의)

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "target": "ESNext",
    "module": "CommonJS",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "composite": true,
    "declaration": true,
    "declarationMap": true,
    "noEmit": false
  }
}

```

---

## 4. 공유 패키지 설정 (`packages/shared`)

### `packages/shared/package.json`

```json
{
  "name": "@my/shared",
  "version": "0.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc"
  },
  "devDependencies": {
    "@my/tsconfig": "workspace:*",
    "typescript": "^5.0.0"
  }
}

```

### `packages/shared/tsconfig.json`

```json
{
  "extends": "@my/tsconfig/base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}

```

---

## 5. 앱 서비스 설정 (예: `apps/api-server`)

### `apps/api-server/package.json`

```json
{
  "name": "api-server",
  "dependencies": {
    "@my/shared": "workspace:*"
  },
  "devDependencies": {
    "@my/tsconfig": "workspace:*",
    "typescript": "^5.0.0"
  }
}

```

### `apps/api-server/tsconfig.json` (Project Reference)

```json
{
  "extends": "@my/tsconfig/base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "references": [{ "path": "../../packages/shared" }]
}

```

---

## 🚀 자주 사용하는 명령어

| 작업 | 명령어 |
| --- | --- |
| **전체 의존성 설치** | `pnpm install` |
| **전체 프로젝트 빌드** | `pnpm build` (또는 `pnpm turbo run build`) |
| **모든 앱 개발 모드 실행** | `pnpm dev` |
| **특정 앱만 실행** | `pnpm dev --filter api-server` |
| **새 패키지 추가(앱에)** | `pnpm add [패키지명] --filter [앱이름]` |
| **TS 에러 발생 시** | `Ctrl+Shift+P` -> `TypeScript: Restart TS Server` |
