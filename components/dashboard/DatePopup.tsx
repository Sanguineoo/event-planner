import { X } from 'lucide-react';

interface Props {
  position: { top: number; left: number };
  onClose: () => void;
  onAction: (action: string) => void;
}

export default function DatePopup({ position, onClose, onAction }: Props) {
  return (
    <div
      className="absolute bg-white shadow-lg rounded-md p-2 border border-gray-200 z-10"
      style={{ top: `${position.top}px`, left: `${position.left}px`, width: '150px' }}
    >
      <div className="flex justify-end items-center mb-2">
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={16} />
        </button>
      </div>
      <div className="flex flex-col space-y-2">
        <button onClick={() => onAction('lock')} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded">
          Lock Date
        </button>
        <button onClick={() => onAction('book')} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded">
          Book Date
        </button>
      </div>
    </div>
  );
}
