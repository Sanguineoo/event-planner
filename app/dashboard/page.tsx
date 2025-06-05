'use client';

import { useRef, useState } from 'react';
import CalendarHeader from '@/components/dashboard/CalendarHeader';
import CalendarGrid from '@/components/dashboard/CalendarGrid';
import DatePopup from '@/components/dashboard/DatePopup';
import Legend from '@/components/dashboard/Legend';
import LockDateForm from '@/components/dashboard/LockDateForm';
import { getDaysInMonth, getFirstDayOfMonth } from '@/utils/calendar';
import { LockDateFormValues } from '@/lib/validations/lockDateForm';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [showLockForm, setShowLockForm] = useState(false);
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
      const isBeforeToday =
        newDate.getFullYear() < today.getFullYear() ||
        (newDate.getFullYear() === today.getFullYear() && newDate.getMonth() < today.getMonth());

      return isBeforeToday ? today : newDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleDateClick = (
    year: number,
    month: number,
    day: number,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const date = new Date(year, month, day);
    setSelectedDate(date);
    setShowOptions(false);

    if (calendarRef.current) {
      const rect = calendarRef.current.getBoundingClientRect();
      const popupWidth = 150;
      const popupHeight = 100;

      const top = event.clientY - rect.top - popupHeight - 10;
      const left = Math.max(0, Math.min(event.clientX - rect.left - popupWidth / 2, rect.width - popupWidth));

      setOptionsPosition({ top, left });
      setShowOptions(true);
    }
  };

  const handlePopupAction = (action: string) => {
    if (!selectedDate) return;

    if (action === 'lock') {
      setShowOptions(false);
      setShowLockForm(true);
    } else if (action === 'book') {
      alert(`Date booked: ${selectedDate.toLocaleDateString()}`);
      setShowOptions(false);
    }
  };

  const handleLockSubmit = (data: LockDateFormValues) => {
    console.log("Form submitted:", {
      date: selectedDate?.toLocaleDateString(),
      ...data
    });
    setShowLockForm(false);
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = getFirstDayOfMonth(year, month);
    const daysInMonth = getDaysInMonth(year, month);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const grid: React.ReactNode[] = [];

    for (let i = 0; i < firstDay; i++) {
      grid.push(<div key={`empty-${i}`} className="h-10 px-2 py-2" />);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const isToday = date.toDateString() === today.toDateString();
      const isPast = date < today;

      const className = `
        h-10 px-2 py-2 text-center 
        ${isToday ? 'bg-blue-100 text-blue-600 font-semibold rounded-full' : ''}
        ${isPast ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'}
      `;

      const onClick = isPast ? undefined : (e: React.MouseEvent<HTMLDivElement>) =>
        handleDateClick(year, month, i, e);

      grid.push(
        <div key={i} className={className} onClick={onClick}>
          {i}
        </div>
      );
    }

    return grid;
  };

  return (
    <div
      ref={calendarRef}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg relative"
    >
      <CalendarHeader
        month={months[currentDate.getMonth()]}
        year={currentDate.getFullYear()}
        onPrev={goToPreviousMonth}
        onNext={goToNextMonth}
        onToday={goToToday}
      />

      <CalendarGrid days={days} dates={renderCalendar()} />
      <Legend />

      {showOptions && selectedDate && (
        <DatePopup
          position={optionsPosition}
          onClose={() => setShowOptions(false)}
          onAction={handlePopupAction}
        />
      )}

      {selectedDate && (
        <LockDateForm
          date={selectedDate}
          open={showLockForm}
          onClose={() => setShowLockForm(false)}
          onSubmit={handleLockSubmit}
        />
      )}
    </div>
  );
}
