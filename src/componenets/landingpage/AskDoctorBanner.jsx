import { CheckCircle } from "lucide-react";

export default function AskDoctorBanner() {
  return (
    <div className="w-full px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#eef6f7] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Content */}
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-4">
              Get free medical advice by asking <br /> a doctor
            </h1>

            {/* Features */}
            <div className="flex flex-wrap gap-6 mb-6">
              <Feature text="Ask anonymously" />
              <Feature text="Verified replies" />
              <Feature text="10,000+ Doctors" />
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 rounded-lg border border-[var(--color-primary)] text-[var(--color-primary)] font-semibold hover:bg-blue-50 transition">
                View All Questions
              </button>
              <button className="px-6 py-3 rounded-lg bg-[var(--color-primary)] text-white font-semibold hover:opacity-90 transition">
                Ask a Question
              </button>
            </div>
          </div>

          <div className="shrink-0">
            <div className="bg-white rounded-2xl p-3 shadow-md">
              <img
                src="/assets/img/WhatsApp Image 2026-01-12 at 1.17.25 PM.jpeg"
                alt="Doctor"
                className="w-[220px] md:w-[260px] rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ text }) {
  return (
    <div className="flex items-center gap-2 text-gray-700 font-medium">
      <CheckCircle className="w-5 h-5 text-[var(--color-primary)]" />
      <span>{text}</span>
    </div>
  );
}
