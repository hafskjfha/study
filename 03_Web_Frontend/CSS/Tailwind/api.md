# 3. Tailwind CSS 주요 API 상세 설명 및 코드 예제

Tailwind CSS는 유틸리티 클래스 기반의 프레임워크로, 여러 클래스를 조합하여 빠르게 스타일을 적용할 수 있습니다. 아래는 주요 API를 카테고리별로 정리한 상세 설명과 함께 코드 예제를 제공합니다.

---

## 3.1 레이아웃(Layout)

레이아웃을 구성하기 위해 Flexbox 및 Grid 유틸리티를 사용할 수 있습니다.

### a. **Flexbox** 클래스
- `flex`: 요소를 Flex 컨테이너로 지정합니다.
- `justify-*`: 주축(가로) 정렬 방식 지정 (`start`, `center`, `end`, `between`, `around`, `evenly`).
- `items-*`: 교차축(세로) 정렬 방식 지정 (`start`, `center`, `end`, `stretch`).

**예제:**
```tsx
const FlexExample: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-4 bg-blue-500 text-white">Centered Box</div>
    </div>
  );
};
```

### b. **Grid** 클래스
- `grid`: 요소를 Grid 컨테이너로 지정합니다.
- `grid-cols-*`: 열의 개수 지정 (`grid-cols-1`, `grid-cols-2`, `grid-cols-3`, 등).
- `gap-*`: 그리드 항목 간의 간격 지정.

**예제:**
```tsx
const GridExample: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <div className="bg-red-500 p-4 text-white">Item 1</div>
      <div className="bg-green-500 p-4 text-white">Item 2</div>
      <div className="bg-blue-500 p-4 text-white">Item 3</div>
    </div>
  );
};
```

---

## 3.2 스페이싱(Spacing)

요소의 내부 여백(`padding`)과 외부 여백(`margin`)을 조절하는 클래스입니다.

- `p-*`: 내부 여백 설정 (`p-4`, `px-2`, `py-3` 등).
- `m-*`: 외부 여백 설정 (`m-4`, `mx-2`, `my-3` 등).
- `space-x-*`: 인접 형제 요소 간의 가로 간격 설정.
- `space-y-*`: 인접 형제 요소 간의 세로 간격 설정.

**예제:**
```tsx
const SpacingExample: React.FC = () => {
  return (
    <div className="flex space-x-4 p-4">
      <div className="p-4 bg-yellow-500">Box 1</div>
      <div className="p-4 bg-purple-500">Box 2</div>
      <div className="p-4 bg-pink-500">Box 3</div>
    </div>
  );
};
```

---

## 3.3 타이포그래피(Typography)

텍스트 크기, 색상, 굵기 등을 조절하는 클래스입니다.

- `text-*`: 글자 크기 설정 (`text-sm`, `text-lg`, `text-4xl` 등).
- `font-*`: 글자 굵기 설정 (`font-thin`, `font-bold`, `font-extrabold` 등).
- `leading-*`: 줄 간격 설정 (`leading-none`, `leading-tight`, `leading-loose` 등).
- `tracking-*`: 글자 간격 설정 (`tracking-tight`, `tracking-wide` 등).

**예제:**
```tsx
const TypographyExample: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-gray-800">Tailwind Typography</h1>
      <p className="text-lg text-gray-600 leading-relaxed">
        This is an example of how to style text using Tailwind CSS classes.
      </p>
    </div>
  );
};
```

---

## 3.4 색상 및 배경(Color & Background)

Tailwind는 기본 색상 팔레트를 제공하며, 이를 유틸리티 클래스로 쉽게 사용할 수 있습니다.

- `text-*`: 텍스트 색상 설정 (`text-red-500`, `text-blue-700` 등).
- `bg-*`: 배경색 설정 (`bg-green-300`, `bg-gray-900` 등).
- `border-*`: 테두리 색상 설정 (`border-yellow-400` 등).

**예제:**
```tsx
const ColorExample: React.FC = () => {
  return (
    <div className="p-4 bg-gradient-to-r from-green-400 to-blue-500">
      <h2 className="text-white text-3xl font-semibold">Gradient Background</h2>
    </div>
  );
};
```

---

## 3.5 상태 기반 스타일링(Pseudo-class Variants)

상호작용에 따라 스타일을 변경할 수 있는 상태 기반 클래스입니다.

- `hover:*`: 마우스 오버 시 스타일 적용 (`hover:bg-blue-500`).
- `focus:*`: 포커스 상태일 때 스타일 적용 (`focus:outline-none`).
- `active:*`: 클릭 상태일 때 스타일 적용 (`active:scale-95`).

**예제:**
```tsx
const ButtonExample: React.FC = () => {
  return (
    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none active:scale-95">
      Hover Me
    </button>
  );
};
```

---

## 3.6 반응형 디자인(Responsive Design)

반응형 브레이크포인트를 사용하여 화면 크기별로 다른 스타일을 적용할 수 있습니다.

- `sm:*`: 작은 화면 (`640px` 이상).
- `md:*`: 중간 화면 (`768px` 이상).
- `lg:*`: 큰 화면 (`1024px` 이상).
- `xl:*`: 초대형 화면 (`1280px` 이상).

**예제:**
```tsx
const ResponsiveExample: React.FC = () => {
  return (
    <div className="p-4">
      <div className="bg-red-500 text-white p-2 sm:bg-green-500 md:bg-blue-500 lg:bg-yellow-500 xl:bg-purple-500">
        Resize the window to see the color change!
      </div>
    </div>
  );
};
```

---

## 3.7 테두리(Border)

테두리를 추가하거나 둥글게 만들기 위한 클래스입니다.

- `border`: 기본 테두리 추가.
- `border-*`: 테두리 색상 지정 (`border-red-500`).
- `rounded-*`: 모서리 둥글게 (`rounded-lg`, `rounded-full`).

**예제:**
```tsx
const BorderExample: React.FC = () => {
  return (
    <div className="p-4 border-4 border-dashed border-blue-500 rounded-lg">
      Dashed Border with Rounded Corners
    </div>
  );
};
```
---
## 3.8 너비(width)
`w-1/5`와 같은 Tailwind CSS 클래스는 **너비(width)**를 비율로 설정할 때 사용하는 유틸리티입니다. Tailwind에서는 `%` 대신 **분수 형태**로 너비를 설정할 수 있도록 다양한 클래스를 제공합니다. 

#### **비율 기반 너비 클래스 예시**

| 클래스     | 의미                         | 설명                               |
|------------|------------------------------|------------------------------------|
| `w-1/2`    | 50% 너비                     | 컨테이너의 절반 너비               |
| `w-1/3`    | 33.333% 너비                 | 컨테이너의 1/3 너비                |
| `w-2/3`    | 66.666% 너비                 | 컨테이너의 2/3 너비                |
| `w-1/4`    | 25% 너비                     | 컨테이너의 1/4 너비                |
| `w-3/4`    | 75% 너비                     | 컨테이너의 3/4 너비                |
| `w-1/5`    | 20% 너비                     | 컨테이너의 1/5 너비                |
| `w-full`   | 100% 너비                    | 전체 너비를 차지                   |
| `w-auto`   | 내용에 따라 자동 너비 설정    | 내용에 맞게 너비 자동 조정         |

---

#### **코드 예제**

```tsx
const WidthExample: React.FC = () => {
  return (
    <div className="flex space-x-4">
      <div className="w-1/5 bg-blue-500 text-white p-4">1/5</div>
      <div className="w-2/5 bg-green-500 text-white p-4">2/5</div>
      <div className="w-2/5 bg-red-500 text-white p-4">2/5</div>
    </div>
  );
};
```

**결과:**
- 첫 번째 박스는 부모 컨테이너의 **20% 너비**(`w-1/5`)를 차지합니다.
- 두 번째 박스와 세 번째 박스는 각각 **40% 너비**(`w-2/5`)를 차지합니다.

---
## 3.9 높이(Height)

높이(`height`) 역시 너비와 마찬가지로 Tailwind CSS에서 비율, 고정값, 또는 유동적인 설정을 위한 클래스를 제공합니다.

---

#### **높이 클래스 예시**

| 클래스       | 의미                          | 설명                           |
|--------------|-------------------------------|--------------------------------|
| `h-1/2`      | 50% 높이                      | 컨테이너의 절반 높이           |
| `h-1/3`      | 33.333% 높이                  | 컨테이너의 1/3 높이            |
| `h-2/3`      | 66.666% 높이                  | 컨테이너의 2/3 높이            |
| `h-1/4`      | 25% 높이                      | 컨테이너의 1/4 높이            |
| `h-full`     | 100% 높이                     | 부모 컨테이너의 전체 높이 차지 |
| `h-screen`   | 화면 전체 높이                | 뷰포트 전체 높이 차지          |
| `h-auto`     | 자동 높이                     | 내용에 맞게 자동으로 조정      |

---

#### **코드 예제**

```tsx
const HeightExample: React.FC = () => {
  return (
    <div className="h-screen flex flex-col justify-between">
      <header className="h-1/4 bg-blue-500 text-white p-4">Header</header>
      <main className="h-1/2 bg-green-500 text-white p-4">Main Content</main>
      <footer className="h-1/4 bg-red-500 text-white p-4">Footer</footer>
    </div>
  );
};
```

**결과:**
- 헤더와 푸터는 각각 **화면의 25%**(`h-1/4`)를 차지합니다.
- 메인 컨텐츠는 **화면의 50%**(`h-1/2`)를 차지합니다.

---

## 3.10 반응형 너비 및 높이(Responsive Width & Height)

Tailwind CSS는 반응형 디자인을 지원하며, 브레이크포인트별로 다른 너비와 높이를 설정할 수 있습니다.

- `sm:w-*`, `md:w-*`, `lg:w-*`, `xl:w-*`: 화면 크기에 따라 다른 너비 설정.
- `sm:h-*`, `md:h-*`, `lg:h-*`, `xl:h-*`: 화면 크기에 따라 다른 높이 설정.

---

#### **코드 예제**

```tsx
const ResponsiveSizeExample: React.FC = () => {
  return (
    <div className="p-4">
      <div className="bg-yellow-500 text-white p-2 sm:w-1/3 md:w-1/2 lg:w-3/4 xl:w-full">
        Responsive Width Box
      </div>
      <div className="bg-purple-500 text-white p-2 mt-4 sm:h-20 md:h-32 lg:h-40 xl:h-64">
        Responsive Height Box
      </div>
    </div>
  );
};
```

**결과:**
- 첫 번째 박스는 작은 화면에서는 **33% 너비**(`sm:w-1/3`), 중간 화면에서는 **50% 너비**(`md:w-1/2`), 큰 화면에서는 **75% 너비**(`lg:w-3/4`), 초대형 화면에서는 **전체 너비**(`xl:w-full`)를 차지합니다.
- 두 번째 박스는 브레이크포인트에 따라 높이가 점차 커집니다.

---

## 3.11 최대/최소 너비 및 높이(Max/Min Width & Height)

Tailwind는 최대 및 최소 너비/높이 설정을 위한 클래스도 제공합니다.

#### **클래스 예시**
| 클래스       | 의미                          | 설명                           |
|--------------|-------------------------------|--------------------------------|
| `max-w-sm`   | 최대 너비 `640px`              | 작은 크기 기준 최대 너비 설정  |
| `min-w-full` | 최소 너비 100%                 | 최소 너비가 부모의 100% 차지   |
| `max-h-screen` | 최대 높이 화면 크기          | 뷰포트 전체 높이 차지          |
| `min-h-0`    | 최소 높이 0                   | 최소 높이 제한 없음            |

---

#### **코드 예제**

```tsx
const MinMaxExample: React.FC = () => {
  return (
    <div className="p-4">
      <div className="bg-blue-500 text-white p-4 max-w-md">
        This box has a maximum width of `md`.
      </div>
      <div className="bg-red-500 text-white p-4 mt-4 min-h-20">
        This box has a minimum height.
      </div>
    </div>
  );
};
```

---
Tailwind CSS에서 레이아웃과 스타일링을 다루기 위해 유용한 몇 가지 추가 기능을 더 소개하겠습니다. 이 부분을 포함하면 더 풍부한 정리 자료가 될 것입니다.

---

## 3.12 **유동 크기 설정(Fractional Sizing)**

Tailwind CSS는 비율 기반 너비/높이 외에도 **유동 크기** 설정을 위한 클래스들을 제공합니다.

- **클래스**: 
  - `w-min`, `w-max`: 내용에 따라 최소/최대 너비 적용.
  - `h-min`, `h-max`: 내용에 따라 최소/최대 높이 적용.

#### **코드 예제**
```tsx
const DynamicSizeExample: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <div className="bg-green-500 text-white p-4 w-min">Min Width</div>
      <div className="bg-blue-500 text-white p-4 w-max">Max Width</div>
    </div>
  );
};
```

---

## 3.13 **z-index & 포지셔닝(Positioning)**

요소를 원하는 위치에 배치하거나 **레이어 순서**를 조정할 때 사용하는 유틸리티입니다.

#### a. **포지셔닝 클래스**
- `relative`, `absolute`, `fixed`, `sticky`: 요소 위치 지정.
- `top-*`, `right-*`, `bottom-*`, `left-*`: 요소의 위치 값 설정.

#### b. **z-index 클래스**
- `z-0`, `z-10`, `z-20`, `z-30`: 요소의 z축 순서 조정.

#### **코드 예제**
```tsx
const PositionExample: React.FC = () => {
  return (
    <div className="relative h-64">
      <div className="absolute top-0 left-0 bg-red-500 text-white p-4 z-10">
        Top Left (z-10)
      </div>
      <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-4 z-20">
        Bottom Right (z-20)
      </div>
    </div>
  );
};
```

---

## 3.14 **Flex 및 Grid 보완 유틸리티**

#### a. **Flex 유틸리티**
- `flex-wrap`: 자식 요소들이 넘칠 때 줄 바꿈 허용.
- `flex-grow`, `flex-shrink`: 자식 요소의 확장 및 축소 비율 조정.

#### **코드 예제**
```tsx
const FlexGrowExample: React.FC = () => {
  return (
    <div className="flex">
      <div className="flex-grow bg-yellow-500 p-4">Grow</div>
      <div className="bg-green-500 p-4">Fixed</div>
    </div>
  );
};
```

#### b. **Grid 보완 유틸리티**
- `auto-cols-*`, `auto-rows-*`: 그리드 자동 크기 조정.
- `place-items-*`, `place-content-*`: 그리드 정렬.

#### **코드 예제**
```tsx
const GridAutoExample: React.FC = () => {
  return (
    <div className="grid grid-cols-auto gap-4">
      <div className="bg-red-500 p-4">Item 1</div>
      <div className="bg-blue-500 p-4">Item 2</div>
    </div>
  );
};
```

---

## 3.15 **애니메이션(Animation)**

Tailwind는 간단한 애니메이션 및 트랜지션을 위한 유틸리티도 제공합니다.

- `transition`, `duration-*`: 애니메이션 트랜지션 설정.
- `ease-linear`, `ease-in-out`: 트랜지션 곡선 설정.
- `animate-*`: 기본 애니메이션 클래스(`animate-bounce`, `animate-spin` 등).

#### **코드 예제**
```tsx
const AnimationExample: React.FC = () => {
  return (
    <button className="bg-blue-500 text-white px-4 py-2 rounded transition duration-500 ease-in-out transform hover:scale-110">
      Hover Me
    </button>
  );
};
```

---

## 3.16 **다크 모드 지원(Dark Mode)**

Tailwind CSS는 **다크 모드**를 기본적으로 지원하며, 클래스에 조건부 스타일링을 적용할 수 있습니다.

- `dark:bg-*`, `dark:text-*`: 다크 모드에서 적용될 배경색/텍스트 색상.

#### **코드 예제**
```tsx
const DarkModeExample: React.FC = () => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 dark:text-white">
      <h2 className="text-2xl">Dark Mode Example</h2>
      <p>Switch your OS theme to see the effect.</p>
    </div>
  );
};
```

---

## 3.17 **유용한 플러그인(Forms, Typography 등)**

Tailwind는 공식 플러그인도 제공합니다.

- **Forms 플러그인**: 기본 폼 스타일링(`@tailwindcss/forms`).
- **Typography 플러그인**: 프로세스드 마크업 스타일링(`@tailwindcss/typography`).

#### **Forms 예제**
```tsx
const FormExample: React.FC = () => {
  return (
    <form className="space-y-4">
      <input type="text" className="w-full border-gray-300 rounded-md" placeholder="Name" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
};
```

---

