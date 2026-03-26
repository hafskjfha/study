# Bootstrap + TypeScript (TSX) 사용법 및 주요 API 정리

## 목차  
1. [Bootstrap 소개](#1-bootstrap-소개)  
2. [프로젝트 설정](#2-프로젝트-설정)  
3. [Bootstrap 컴포넌트 TSX 예제](#3-bootstrap-컴포넌트-tsx-예제)  
4. [Bootstrap 주요 컴포넌트 및 API](#4-bootstrap-주요-컴포넌트-및-api)  
   - [버튼(Button)](#버튼button)  
   - [카드(Card)](#카드card)  
   - [폼(Form)](#폼form)  
   - [모달(Modal)](#모달modal)  
   - [네비게이션 바(Navbar)](#네비게이션-바navbar)  
5. [커스텀 스타일 적용](#5-커스텀-스타일-적용)  
6. [유의사항](#6-유의사항)  

---

## 1. Bootstrap 소개  
Bootstrap은 웹 개발을 위한 CSS 프레임워크로, 반응형 레이아웃과 다양한 UI 컴포넌트를 제공합니다. TypeScript 기반의 React 프로젝트에서는 **react-bootstrap** 패키지를 사용해 컴포넌트를 쉽게 활용할 수 있습니다.

---

## 2. 프로젝트 설정  

### 1) 설치  
```bash  
npm install bootstrap react-bootstrap  
```  

### 2) TypeScript 설정 확인  
`tsconfig.json`에서 JSX 옵션이 설정되어 있는지 확인합니다.  
```json  
{
  "jsx": "react-jsx"
}
```  

### 3) CSS 추가  
`index.tsx` 또는 `App.tsx` 파일에서 Bootstrap CSS를 가져옵니다.  
```tsx  
import 'bootstrap/dist/css/bootstrap.min.css';  
```  

---

## 3. Bootstrap 컴포넌트 TSX 예제  

### 1) 버튼(Button) 예제  
```tsx  
import { Button } from 'react-bootstrap';  

function App() {  
  return <Button variant="primary">Primary Button</Button>;  
}  
```  

### 2) 카드(Card) 예제  
```tsx  
import { Card } from 'react-bootstrap';  

function ExampleCard() {  
  return (  
    <Card style={{ width: '18rem' }}>  
      <Card.Body>  
        <Card.Title>Card Title</Card.Title>  
        <Card.Text>This is a card example with React Bootstrap.</Card.Text>  
        <Button variant="primary">Go somewhere</Button>  
      </Card.Body>  
    </Card>  
  );  
}  
```  

---

## 4. Bootstrap 주요 컴포넌트 및 API  

### 버튼(Button)  
| 속성          | 설명                               | 타입                         | 기본값    |  
|---------------|------------------------------------|------------------------------|----------|  
| `variant`     | 버튼 스타일 지정                   | `'primary'`, `'secondary'`, `'success'`, 등 | `'primary'` |  
| `size`        | 버튼 크기 지정                     | `'sm'`, `'lg'`               | -        |  
| `disabled`    | 버튼 비활성화 여부                 | `boolean`                    | `false`  |  
| `onClick`     | 클릭 이벤트 핸들러                 | `(event: MouseEvent) => void`| -        |  

**예시**:  
```tsx  
<Button variant="danger" size="lg" onClick={() => alert('Button Clicked')}>
  Click Me
</Button>  
```  

---

### 카드(Card)  
| 속성         | 설명                            | 타입                 | 기본값  |  
|--------------|---------------------------------|----------------------|--------|  
| `bg`         | 카드 배경색 지정                | `'primary'`, `'secondary'`, `'dark'` 등 | - |  
| `text`       | 카드 텍스트 색상 지정           | `'light'`, `'dark'`  | -      |  
| `style`      | 인라인 스타일 지정              | `CSSProperties`      | -      |  

**예시**:  
```tsx  
<Card bg="dark" text="white" style={{ width: '18rem' }}>  
  <Card.Body>  
    <Card.Title>Dark Card</Card.Title>  
    <Card.Text>Example with dark background.</Card.Text>  
  </Card.Body>  
</Card>  
```  

---

### 폼(Form)  
| 속성          | 설명                            | 타입              | 기본값  |  
|---------------|---------------------------------|-------------------|--------|  
| `controlId`   | 폼 컨트롤의 고유 ID 지정       | `string`          | -      |  
| `type`        | 입력 필드 타입 지정            | `'text'`, `'email'`, `'password'` 등 | - |  
| `placeholder` | 입력 필드 기본 텍스트          | `string`          | -      |  

**예시**:  
```tsx  
<Form.Group controlId="formBasicEmail">  
  <Form.Label>Email address</Form.Label>  
  <Form.Control type="email" placeholder="Enter email" />  
</Form.Group>  
```  

---

### 모달(Modal)  
| 속성         | 설명                              | 타입                 | 기본값 |  
|--------------|-----------------------------------|----------------------|--------|  
| `show`       | 모달 표시 여부                   | `boolean`            | -      |  
| `onHide`     | 모달 닫기 이벤트 핸들러          | `() => void`         | -      |  
| `size`       | 모달 크기 지정                   | `'sm'`, `'lg'`, `'xl'` | -   |  

**예시**:  
```tsx  
import { Modal, Button } from 'react-bootstrap';  

function ExampleModal({ show, onHide }) {  
  return (  
    <Modal show={show} onHide={onHide} size="lg">  
      <Modal.Header closeButton>  
        <Modal.Title>Modal Title</Modal.Title>  
      </Modal.Header>  
      <Modal.Body>Modal content goes here.</Modal.Body>  
      <Modal.Footer>  
        <Button variant="secondary" onClick={onHide}>Close</Button>  
      </Modal.Footer>  
    </Modal>  
  );  
}  
```  

---

### 네비게이션 바(Navbar)  
| 속성         | 설명                            | 타입               | 기본값 |  
|--------------|---------------------------------|--------------------|--------|  
| `bg`         | 네비게이션 바 배경색 지정       | `'light'`, `'dark'` | -    |  
| `variant`    | 네비게이션 바 스타일 지정       | `'light'`, `'dark'` | -    |  
| `expand`     | 반응형 확장 여부                | `'sm'`, `'md'`, `'lg'` 등 | - |  

**예시**:  
```tsx  
import { Navbar, Nav } from 'react-bootstrap';  

function ExampleNavbar() {  
  return (  
    <Navbar bg="dark" variant="dark" expand="lg">  
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>  
      <Nav className="me-auto">  
        <Nav.Link href="#home">Home</Nav.Link>  
        <Nav.Link href="#features">Features</Nav.Link>  
        <Nav.Link href="#pricing">Pricing</Nav.Link>  
      </Nav>  
    </Navbar>  
  );  
}  
```  

---

## 5. 커스텀 스타일 적용  

### 1) 클래스 추가  
```tsx  
<Button className="custom-class">Custom Button</Button>  
```  

### 2) 인라인 스타일  
```tsx  
<Button style={{ backgroundColor: 'green' }}>Inline Styled Button</Button>  
```  

### 3) CSS 파일 사용  
```css  
/* App.css */  
.custom-class {  
  background-color: purple;  
  color: white;  
}  
```  

```tsx  
import './App.css';  
```  

---

## 6. 유의사항  
- **React-Bootstrap**은 Bootstrap의 JavaScript 부분을 대체하여 React 친화적인 컴포넌트를 제공합니다.  
- TypeScript 사용 시 컴포넌트의 타입을 명확히 지정하여 오류를 방지할 수 있습니다.  
- 커스텀 스타일을 적용할 때 Bootstrap의 기본 클래스와 충돌하지 않도록 주의하세요.  
