const monthYear = document.getElementById('monthYear');
const datesContainer = document.getElementById('dates');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');
const events = [
    { startDate: new Date(2024, 8, 10), endDate: new Date(2024, 8, 13), title: "test1" },
    { startDate: new Date(2024, 8, 12), endDate: new Date(2024, 8, 14), title: "test2" }
];


let currentYear = 2024;
let currentMonth = 7; // 8월 (0부터 시작하므로 7은 8월)

const renderCalendar = () => {
    const date = new Date(currentYear, currentMonth);
    const monthName = date.toLocaleString('ko-KR', { month: 'long' });
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    monthYear.textContent = `${monthName} ${currentYear}`;

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
        dateCell.textContent = i;

        const currentDate = new Date(currentYear, currentMonth, i);

        // 이벤트가 있는 날짜인지 확인
        events.forEach((event, index) => {
            if (currentDate >= event.startDate && currentDate <= event.endDate) {
                const eventBar = document.createElement('div');
                eventBar.classList.add('event-bar');
                eventBar.style.bottom = `${10 + index * 8}px`; // 각 이벤트 선을 서로 겹치지 않게 배치
                eventBar.style.backgroundColor = `hsl(${index * 60}, 70%, 50%)`; // 각 이벤트마다 다른 색상

                // 일정 제목을 시작일에만 표시
                if (currentDate.getTime() === event.startDate.getTime()) {
                    const eventTitle = document.createElement('div');
                    eventTitle.classList.add('event-title');
                    eventTitle.textContent = event.title;
                    eventBar.appendChild(eventTitle);
                }

                dateCell.appendChild(eventBar);
            }
        });

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

// 페이지 로드 시 초기 달력 렌더링
renderCalendar();