import { Session } from 'express-session';

declare module 'express-serve-static-core' {
  interface Request {
    session: Session & { access_token?: string }; // 세션에 access_token 프로퍼티 추가
  }
}
declare module 'express-session' {
  interface Session {
    access_token?: string; // access_token 프로퍼티 추가
  }
}