'use client';

import { useState, useRef } from 'react';
import CalendarHeader from '@/components/dashboard/CalendarHeader';
import CalendarGrid from '@/components/dashboard/CalendarGrid';
import Legend from '@/components/dashboard/Legend';
import DatePopup from '@/components/dashboard/DatePopup';
import { getDaysInMonth, getFirstDayOfMonth } from '@/utils/calendar';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [optionsPosition, setOptionsPosition] = useState({ top: 0, left: 0 });
  const calendarRef = useRef<HTMLDivElement>(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const goToPreviousMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      const today = new Date();
      return newDate < new Date(today.getFullYear(), today.getMonth()) ? today : newDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const goToToday = () => setCurrentDate(new Date());

  const handleDateClick = (
    year: number, month: number, day: number, event: React.MouseEvent<HTMLDivElement>
  ) => {
    setShowOptions(false);
    const dateObj = new Date(year, month, day);
    setSelectedDate(dateObj);

    if (calendarRef.current) {
      const rect = calendarRef.current.getBoundingClientRect();
      const top = event.clientY - rect.top - 100 - 10;
      const left = Math.max(0, Math.min(event.clientX - rect.left - 75, rect.width - 150));
      setOptionsPosition({ top, left });
      setShowOptions(true);
    }
  };

  const handleAction = (action: string) => {
    if (!selectedDate) return;
    alert(`${action === 'lock' ? 'Date locked' : 'Date booked'}: ${selectedDate.toLocaleDateString()}`);
    setShowOptions(false);
  };

  const renderCalendar = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dates = [];

    for (let i = 0; i < firstDay; i++) dates.push(<div key={`empty-${i}`} className="h-10 px-2 py-2" />);

    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(year, month, i);
      const isPast = d < today;
      const isToday = d.toDateString() === today.toDateString();
      const className = `${isToday ? 'bg-blue-100 text-blue-600 font-semibold rounded-full ' : ''} ${isPast ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'}`;
      const onClick = isPast ? undefined : (e: React.MouseEvent<HTMLDivElement>) => handleDateClick(year, month, i, e);

      dates.push(
        <div key={i} className={`h-10 px-2 py-2 text-center ${className}`} onClick={onClick}>
          {i}
        </div>
      );
    }

    return dates;
  };

  return (
    <div ref={calendarRef} className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg relative">
      <CalendarHeader
        month={months[currentDate.getMonth()]}
        year={currentDate.getFullYear()}
        onPrev={goToPreviousMonth}
        onNext={goToNextMonth}
        onToday={goToToday}
      />

      <CalendarGrid days={days} dates={renderCalendar()} />
      <Legend />

      {showOptions && (
        <DatePopup
          position={optionsPosition}
          onClose={() => setShowOptions(false)}
          onAction={handleAction}
        />
      )}
    </div>
  );
}