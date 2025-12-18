function ActionCard({ label, color, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200 bg-white hover:-translate-y-1"
    >
      <div
        className={`h-12 w-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300`}
      >
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 text-center">
        {label}
      </span>
    </button>
  );
}
export default ActionCard;
