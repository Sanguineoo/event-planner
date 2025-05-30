interface Props {
    days: string[];
    dates: React.ReactNode[];
  }
  
  export default function CalendarGrid({ days, dates }: Props) {
    return (
      <>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {days.map(day => (
            <div key={day} className="text-center font-medium text-gray-600 text-sm">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 mb-6">{dates}</div>
      </>
    );
  }
  