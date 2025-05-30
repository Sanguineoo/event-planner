export default function Legend() {
    return (
      <div className="border-t pt-4 mt-2">
        <div className="flex flex-col space-y-2 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-gray-300 mr-2"></div>
            <span className="text-gray-700">Date Locked</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
            <span className="text-gray-700">Date Unavailable</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full border border-gray-300 mr-2"></div>
            <span className="text-gray-700">Date Available</span>
          </div>
        </div>
      </div>
    );
  }
  