import React, { useState } from 'react';

const WEEKDAYS = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}
function pad(n) {
  return n.toString().padStart(2, '0');
}

const Calendar = ({ selectedDate, setSelectedDate, activities }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  // Figma calendar starts with Saturday, so adjust
  const startOffset = (firstDay + 1) % 7;

  // Previous month days
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

  // Build calendar grid
  let calendarDays = [];
  // Previous month days
  for (let i = startOffset - 1; i >= 0; i--) {
    calendarDays.push({
      day: daysInPrevMonth - i,
      type: 'prev',
      dateISO: `${prevYear}-${pad(prevMonth + 1)}-${pad(daysInPrevMonth - i)}`
    });
  }
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      day: i,
      type: 'current',
      dateISO: `${currentYear}-${pad(currentMonth + 1)}-${pad(i)}`
    });
  }
  // Next month days
  while (calendarDays.length % 7 !== 0) {
    calendarDays.push({
      day: calendarDays.length - daysInMonth - startOffset + 1,
      type: 'next',
      dateISO: `${currentMonth === 11 ? currentYear + 1 : currentYear}-${pad((currentMonth + 2) % 13 || 1)}-${pad(calendarDays.length - daysInMonth - startOffset + 1)}`
    });
  }

  // Handlers
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Month names
  const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div
      className="bg-white rounded-2xl shadow-lg p-4 border border-[#e5e7eb] font-inter"
      style={{ width: 390.77, height: 288, minHeight: 240, paddingTop: 16, paddingBottom: 16, boxSizing: 'border-box' }}
    >
      <div className="flex items-center justify-between mb-2">
        <button className="text-[#bdbdbd] text-lg px-1 py-0.5 rounded hover:bg-[#e5e7eb] transition" onClick={handlePrevMonth}>&#8592;</button>
        <div className="font-bold text-[#222] text-base font-poppins">{MONTHS[currentMonth]} {currentYear}</div>
        <button className="text-[#bdbdbd] text-lg px-1 py-0.5 rounded hover:bg-[#e5e7eb] transition" onClick={handleNextMonth}>&#8594;</button>
      </div>
      <div className="grid grid-cols-7 gap-0.5 text-xs text-center mb-1 font-semibold font-poppins">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            style={{ color: day === 'Fri' ? '#544C4C' : '#000000' }}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5 text-center">
        {calendarDays.map((d, i) => {
          const isSelected = selectedDate === d.dateISO;
          const isToday = d.type === 'current' &&
            today.getFullYear() === currentYear &&
            today.getMonth() === currentMonth &&
            d.day === today.getDate();
          const hasActivity = activities.some(a => a.date === d.dateISO);
          // Get JS day index for this date (0=Sun, 5=Fri, 6=Sat)
          const jsDate = new Date(d.dateISO);
          const isFriday = jsDate.getDay() === 5;
          return (
            <div
              key={i}
              className={`relative font-medium font-poppins flex items-center justify-center transition select-none cursor-pointer`}
              onClick={() => d.type === 'current' && setSelectedDate(d.dateISO)}
              style={{ minHeight: 24, height: 32 }}
            >
              <span
                className={
                  `inline-flex items-center justify-center w-7 h-7 text-xs font-medium ` +
                  (isSelected
                    ? 'bg-[#329D7F] text-white font-bold rounded-full border-2 border-[#329D7F]'
                    : isToday
                      ? 'border border-[#329D7F] font-bold rounded-full'
                      : isFriday
                        ? 'text-[#544C4C]'
                        : d.type !== 'current'
                          ? 'text-[#696767]'
                          : 'text-[#000000]')
                }
                style={{ transition: 'all 0.2s' }}
              >
                {d.day}
              </span>
              {hasActivity && d.type === 'current' && (
                <span className="absolute left-1/2 -translate-x-1/2 bottom-0.5 w-1.5 h-1.5 rounded-full bg-[#329D7F] inline-block"></span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
