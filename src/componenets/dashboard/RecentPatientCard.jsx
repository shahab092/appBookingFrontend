import { MessageSquare } from "lucide-react";

function RecentPatientCard({ name, status, color, time }) {
  return (
    <div className="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-all duration-150 cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700 shadow-sm">
            {name[0]}
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-400"></div>
        </div>
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-xs text-gray-400 mt-0.5">{time}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span
          className={`text-xs font-medium px-3 py-1.5 rounded-full ${color}`}
        >
          {status}
        </span>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-gray-100 rounded-lg">
          <MessageSquare className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
}

export default RecentPatientCard