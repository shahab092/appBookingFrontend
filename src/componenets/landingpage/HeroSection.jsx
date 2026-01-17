import React from "react";
import AppButtons from "../common/AppButtons";

export default function HeroSection() {
  return (
    <div className="w-full bg-[#f5f9ff] py-8 ">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#f8fbff] to-[#eef5ff] p-12 shadow-xl">
          {/* Decorative Gradient Blobs */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400/20 rounded-full blur-[120px]" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-400/20 rounded-full blur-[120px]" />

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* LEFT CONTENT */}
            <div>
              {/* Badge */}
              <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                Healthcare Platform
              </span>

              {/* Heading */}
              <h1 className="text-gray-900">
                Your Health in <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-success">
                  Your Pocket.
                </span>
              </h1>

              {/* Description */}
              <p className="mt-6 text-gray-600 max-w-lg text-lg">
                Our award-winning mobile platform brings top-tier psychiatry and
                medical care to your fingertips. Secure, intuitive, and designed
                for your well-being.
              </p>

              {/* CTA + QR */}
              <AppButtons className="mt-10" />
            </div>

            {/* RIGHT CONTENT */}
            <div className="relative flex justify-center">
              {/* Glow behind card */}
              <div className="absolute w-[420px] h-[420px] bg-gradient-to-br from-blue-400/30 to-emerald-400/30 rounded-full blur-[120px]" />

              {/* Tilted Card */}
              <div className="relative w-[380px] h-[380px] bg-white/60 backdrop-blur-xl border border-white/50 rounded-[28px] rotate-[-8deg] flex items-center justify-center shadow-2xl">
                {/* Phone */}
                <img
                  src="/assets/img/Doctor.svg"
                  alt="App Preview"
                  className="w-[200px] rotate-[8deg] drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
