import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  month: string;
  year: number;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

export default function CalendarHeader({ month, year, onPrev, onNext, onToday }: Props) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold text-gray-800">{month} {year}</h2>
      <div className="flex space-x-2">
        <button onClick={onPrev} className="p-2 rounded-full hover:bg-gray-100" aria-label="Previous month">
          <ChevronLeft size={20} />
        </button>
        <button onClick={onToday} className="px-3 py-1 text-sm bg-gray-200 rounded-md hover:bg-gray-300">
          Today
        </button>
        <button onClick={onNext} className="p-2 rounded-full hover:bg-gray-100" aria-label="Next month">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
