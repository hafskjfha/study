const monthYear = document.getElementById('monthYear');
const datesContainer = document.getElementById('dates');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');
const todayButton = document.getElementById('todayButton'); // 오늘 버튼 선택자 추가
const addEventBtn = document.getElementById('addEventBtn');
const eventModal = document.getElementById('eventModal');
const closeModal = document.querySelector('.close');
const eventForm = document.getElementById('eventForm');
const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');
const eventTitleInput = document.getElementById('eventTitle');

let events = [];

// 현재 날짜 가져오기
const today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth(); // 0부터 시작하므로 오늘의 월로 설정

const renderCalendar = () => {
    const date = new Date(currentYear, currentMonth);
    const monthName = date.toLocaleString('ko-KR', { month: 'long' });
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    monthYear.textContent = `${currentYear} ${monthName}`;

    datesContainer.innerHTML = '';

    // 첫 주에 공백 채우기
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('date', 'empty');
        datesContainer.appendChild(emptyCell);
    }

    // 날짜 채우기
    for (let i = 1; i <= lastDateOfMonth; i++) {
        const dateCell = document.createElement('div');
        dateCell.classList.add('date');
        dateCell.style.position = 'relative';

        const currentDate = new Date(currentYear, currentMonth, i, 9);

        // 날짜 텍스트를 위한 요소 추가 (가장 위에 표시)
        const dateText = document.createElement('div');
        dateText.style.position = 'absolute';
        dateText.style.zIndex = '3'; // 가장 위에 표시되도록 z-index 설정
        dateText.style.top = '5px';
        dateText.style.right = '5px';
        dateText.style.fontWeight = 'bold';
        dateText.style.color = 'black'; // 글자 색상
        dateText.style.border = '2px solid white'; // 흰색 테두리
        dateText.style.borderRadius = '50%'; // 테두리의 모서리를 둥글게
        dateText.style.padding = '2px 6px'; // 패딩 추가
        dateText.style.backgroundColor = 'rgba(255, 255, 255, 0.7)'; // 약간 투명한 배경색
        dateText.textContent = i;
        dateCell.appendChild(dateText);

        // 현재 날짜에 해당하는 이벤트 필터링
        const currentEvents = events.filter(event => currentDate >= event.startDate && currentDate <= event.endDate);
        if (currentEvents.length > 0) {
            currentEvents.forEach((event, index) => {
                const eventOverlay = document.createElement('div');
                eventOverlay.style.position = 'absolute';
                eventOverlay.style.top = `${(index * 100) / currentEvents.length}%`;
                eventOverlay.style.left = 0;
                eventOverlay.style.width = '100%';
                eventOverlay.style.height = `${100 / currentEvents.length}%`;
                eventOverlay.style.backgroundColor = event.color;
                eventOverlay.style.opacity = '0.6';
                eventOverlay.style.zIndex = '1';
                dateCell.appendChild(eventOverlay);

                if (currentDate.getDate() === event.startDate.getDate()) {
                    const eventTitle = document.createElement('div');
                    eventTitle.classList.add('event-title');
                    eventTitle.style.position = 'absolute';
                    eventTitle.style.zIndex = '2';
                    eventTitle.style.top = `${(index * 100) / currentEvents.length}%`;
                    eventTitle.textContent = event.title;
                    dateCell.appendChild(eventTitle);
                }
            });
        }

        datesContainer.appendChild(dateCell);
    }
};

prevMonthButton.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
});

nextMonthButton.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
});

// 오늘 버튼 클릭 시 현재 달로 이동
todayButton.addEventListener('click', () => {
    currentYear = today.getFullYear();
    currentMonth = today.getMonth();
    renderCalendar();
});

// + 버튼 클릭 시 모달 열기
addEventBtn.addEventListener('click', () => {
    eventModal.style.display = 'block';
});

// 모달 닫기
closeModal.addEventListener('click', () => {
    eventModal.style.display = 'none';
});

// 모달 바깥 클릭 시 모달 닫기
window.addEventListener('click', (e) => {
    if (e.target === eventModal) {
        eventModal.style.display = 'none';
    }
});

// 일정 추가 폼 제출 처리
eventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const startDate = new Date(startDateInput.value);
    const endDate = new Date(endDateInput.value);
    const title = eventTitleInput.value;
    const color = `hsl(${Math.random() * 360}, 70%, 70%)`; // 랜덤 색상

    // 일정 추가
    events.push({ startDate, endDate, title, color });

    // 달력 다시 렌더링
    renderCalendar();

    // 폼 초기화 및 모달 닫기
    eventForm.reset();
    eventModal.style.display = 'none';
});

// 페이지 로드 시 초기 달력 렌더링
renderCalendar();
