import { useMemo, useState } from "react";
import { Building2, ChevronDown, MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const hospitals = [
  {
    id: 1,
    name: "Shifa international",
    area: "H-8",
    city: "Islamabad",
    rating: 4.6,
    specialties: ["Cardiology", "Orthopedics", "Pediatrics"],
    doctors: 14,
    leadDoctor: "Dr Farah Ahmed",
    avatars: [
      { label: "FA", color: "bg-rose-100 text-rose-700" },
      { label: "SK", color: "bg-green-100 text-green-700" },
    ],
    extraDoctors: 12,
  },
  {
    id: 2,
    name: "Ashfaq medical center",
    area: "Gulberg",
    city: "Lahore",
    rating: 4.8,
    specialties: ["Neurology", "Dermatology", "ENT"],
    doctors: 9,
    leadDoctor: "Dr Maria Khan",
    avatars: [
      { label: "MK", color: "bg-amber-100 text-amber-800" },
      { label: "HR", color: "bg-blue-100 text-blue-700" },
    ],
    extraDoctors: 7,
  },
  {
    id: 3,
    name: "Aga Khan University Hospital",
    area: "Stadium Road",
    city: "Karachi",
    rating: 4.9,
    specialties: ["Cardiology", "Neurology", "Pediatrics"],
    doctors: 22,
    leadDoctor: "Dr Ali Raza",
    avatars: [
      { label: "AR", color: "bg-violet-100 text-violet-700" },
      { label: "SN", color: "bg-cyan-100 text-cyan-700" },
    ],
    extraDoctors: 20,
  },
];

const specialties = [
  "All specialties",
  "Orthopedics",
  "Cardiology",
  "Neurology",
  "Dermatology",
  "Pediatrics",
  "ENT",
];

function HospitalCard({ hospital }) {
  const navigate = useNavigate();

  return (
    <article className="flex min-h-[260px] flex-col rounded-2xl border border-[#e1e1e1] bg-white p-[22px] shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      <div className="flex items-start gap-3">
        <div className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-[13px] bg-[#d8e9ff] text-[#195fa7]">
          <Building2 size={25} strokeWidth={2.1} />
        </div>

        <div className="min-w-0 flex-1 pt-px">
          <div className="flex items-start justify-between gap-2">
            <div className="truncate text-[21px] font-semibold leading-7 text-[#171717]">
              {hospital.name}
            </div>
            <div className="flex shrink-0 items-center gap-1 pt-1 text-[16px] font-medium text-[#175aa4]">
              <Star size={18} fill="white" strokeWidth={1.8} />
              <span>{hospital.rating}</span>
            </div>
          </div>
          <div className="mt-px flex items-center gap-1.5 text-[16px] text-[#555]">
            <MapPin size={17} strokeWidth={2} />
            <span>{hospital.area}, {hospital.city}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {hospital.specialties.map((specialty) => (
          <span key={specialty} className="rounded-full bg-[#fafafa] px-3 py-1 text-[15px] leading-5 text-[#555]">
            {specialty}
          </span>
        ))}
      </div>

      <p className="mb-0 mt-3 text-[16px] text-[#888]">{hospital.doctors} doctors available</p>

      <div className="mt-2.5 flex min-w-0 items-center">
        <div className="flex shrink-0 items-center pl-0.5">
          {hospital.avatars.map((avatar, index) => (
            <span
              key={avatar.label}
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-[13px] font-medium ${avatar.color} ${index ? "-ml-1.5" : ""}`}
            >
              {avatar.label}
            </span>
          ))}
          <span className="-ml-1.5 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#f6f6f6] text-[12px] text-[#444]">
            +{hospital.extraDoctors}
          </span>
        </div>
        <span className="ml-3 truncate text-[16px] text-[#555]">{hospital.leadDoctor} and others</span>
      </div>

      <button
        type="button"
        onClick={() => navigate("/doctorSearch", { state: { city: hospital.city } })}
        className="mt-auto w-full rounded-[11px] bg-[#2f79d4] px-4 py-2.5 text-[17px] font-semibold text-white transition hover:bg-[#286bbd] active:scale-[0.99]"
      >
        View hospital
      </button>
    </article>
  );
}

export default function Hospitals() {
  const [city, setCity] = useState("");
  const [specialty, setSpecialty] = useState("Orthopedics");

  const filteredHospitals = useMemo(() => {
    const cityQuery = city.trim().toLowerCase();
    return hospitals.filter((hospital) => {
      const matchesCity = !cityQuery || hospital.city.toLowerCase().includes(cityQuery);
      const matchesSpecialty = specialty === "All specialties" || hospital.specialties.includes(specialty);
      return matchesCity && matchesSpecialty;
    });
  }, [city, specialty]);

  return (
    <main className="min-h-screen bg-[#fbfbfa] px-4 py-[11px] sm:px-6">
      <div className="mx-auto max-w-[1120px]">
        <label className="relative block">
          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#929292]" size={19} strokeWidth={2} />
          <input
            value={city}
            onChange={(event) => setCity(event.target.value)}
            type="search"
            placeholder="Search by city"
            aria-label="Search hospitals by city"
            className="h-[50px] w-full rounded-lg border border-[#dedede] bg-white pl-11 pr-4 text-[20px] text-[#222] outline-none transition placeholder:text-[#777] focus:border-[#6da3df] focus:ring-2 focus:ring-blue-100"
          />
        </label>

        <label className="relative mt-3 block">
          <select
            value={specialty}
            onChange={(event) => setSpecialty(event.target.value)}
            aria-label="Filter hospitals by specialty"
            className="h-[50px] w-full appearance-none rounded-lg border border-[#dedede] bg-white px-[22px] pr-12 text-[21px] text-[#151515] outline-none transition focus:border-[#6da3df] focus:ring-2 focus:ring-blue-100"
          >
            {specialties.map((item) => <option key={item}>{item}</option>)}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-black" size={20} />
        </label>

        {filteredHospitals.length ? (
          <section className="mt-5 grid grid-cols-1 gap-[18px] md:grid-cols-2">
            {filteredHospitals.map((hospital) => <HospitalCard key={hospital.id} hospital={hospital} />)}
          </section>
        ) : (
          <div className="mt-5 rounded-2xl border border-[#e1e1e1] bg-white px-6 py-16 text-center text-[17px] text-[#777]">
            No hospitals match these filters.
          </div>
        )}
      </div>
    </main>
  );
}
