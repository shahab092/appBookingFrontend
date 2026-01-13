import { Video, CheckCircle, MapPin, ShieldCheck } from "lucide-react";

const DoctorCard = ({ doctor }) => {
  if (!doctor) return null;

  return (
    <div className="w-full max-w-6xl bg-white/80 backdrop-blur border border-gray-200 rounded-2xl p-5 flex flex-col md:flex-row gap-5 shadow-lg hover:shadow-xl transition-all duration-300 mb-6">
      {/* Left: Doctor Image */}
      <div className="relative flex-shrink-0 flex flex-col items-center">
        <img
          src={doctor.image || "https://via.placeholder.com/140"}
          alt={doctor.name}
          className="w-32 h-32 rounded-2xl object-cover border-2 border-blue-500"
        />
        {doctor.isVerified && (
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow">
            <ShieldCheck size={12} /> Verified
          </span>
        )}
      </div>

      {/* Middle: Info */}
      <div className="flex-1">
        {/* Name */}
        <h2 className="text-xl font-bold text-gray-800">{doctor.name}</h2>

        <p className="text-blue-700 font-medium">{doctor.specialty}</p>
        <p className="text-gray-500 text-sm">{doctor.qualifications}</p>

        {/* Stats */}
        <div className="flex flex-wrap gap-6 mt-3 text-sm">
          <Stat
            value={doctor.reviews}
            label="Reviews"
            color="text-orange-500"
          />
          <Stat value={doctor.experience} label="Years Exp" />
          <Stat
            value={doctor.satisfaction}
            label="Satisfaction"
            color="text-green-600"
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {doctor.tags?.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-full border border-blue-200"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Booking Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
          {doctor.consultations?.map((loc, idx) => (
            <BookingCard
              key={idx}
              title={loc.title}
              subtitle={loc.subtitle}
              price={loc.price}
              fast={loc.fast}
              icon={
                loc.type === "video" ? (
                  <Video size={20} />
                ) : (
                  <MapPin size={20} />
                )
              }
              highlight={loc.highlight}
            />
          ))}
        </div>
      </div>

      {/* Right: CTA */}
      <div className="flex flex-col justify-between min-w-[200px]">
        <div className="space-y-3">
          <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:scale-[1.02] transition text-white px-6 py-3 rounded-xl font-semibold shadow-md flex items-center justify-center gap-2">
            <Video size={18} /> Video Call
          </button>
          <button className="w-full bg-gradient-to-r from-blue-700 to-blue-800 hover:scale-[1.02] transition text-white px-6 py-3 rounded-xl font-semibold shadow-md">
            👤 View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

/* Small Components */

const Stat = ({ value, label, color = "text-gray-800" }) => (
  <div>
    <p className={`text-lg font-bold ${color}`}>{value}</p>
    <p className="text-xs text-gray-500">{label}</p>
  </div>
);

/* Booking Card */

const BookingCard = ({ title, subtitle, price, fast, icon, highlight }) => {
  return (
    <div
      className={`relative border rounded-xl p-4 transition-all cursor-pointer hover:-translate-y-1 hover:shadow-lg ${
        highlight
          ? "border-blue-500 bg-gradient-to-br from-blue-50 to-white"
          : "bg-white"
      }`}
    >
      {fast && (
        <span className="absolute -top-3 right-3 text-xs bg-green-500 text-white px-3 py-1 rounded-full shadow flex items-center gap-1">
          <CheckCircle size={12} /> Fast
        </span>
      )}

      <div className="flex gap-3">
        <div className="text-blue-600">{icon}</div>
        <div>
          <p className="text-sm font-semibold text-gray-800 leading-tight">
            {title}
          </p>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-lg font-bold text-gray-900">{price}</p>
        <span className="text-xs text-blue-600 font-medium">Book Now →</span>
      </div>
    </div>
  );
};

export default DoctorCard;
