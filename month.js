const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const monthNames = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

const calendar = document.getElementById('calendarDays');
const monthYearLabel = document.getElementById('monthYear');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

function renderCalendar(month, year) {
  calendar.innerHTML = '';

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = (firstDay.getDay() + 6) % 7;

  monthYearLabel.textContent = `${monthNames[month]} ${year}`;

  // Дни недели
  daysOfWeek.forEach(day => {
    const dayElem = document.createElement('div');
    dayElem.className = 'day';
    dayElem.textContent = day;
    calendar.appendChild(dayElem);
  });

  
  for (let i = 0; i < startDay; i++) {
    const empty = document.createElement('div');
    empty.className = 'date empty';
    calendar.appendChild(empty);
  }

  
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const dateElem = document.createElement('div');
    dateElem.className = 'date';
    dateElem.textContent = i;

    const thisDate = new Date(year, month, i);

    // сегодня
    if (
      i === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dateElem.classList.add('today');
    }

    //от 14 апреля 2025
    const shiftStartDate = new Date(2025, 3, 14); // 14.04.2025
    const daysSinceStart = Math.floor((thisDate - shiftStartDate) / (1000 * 60 * 60 * 24));

    if (daysSinceStart >= 0) {
      const shiftCycle = daysSinceStart % 4;
      if (shiftCycle === 0) {
        dateElem.classList.add('day-shift');
      } else if (shiftCycle === 1) {
        dateElem.classList.add('night-shift');
      }
    
    }

    calendar.appendChild(dateElem);
  }
}


prevBtn.addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
});

nextBtn.addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
});


renderCalendar(currentMonth, currentYear);

