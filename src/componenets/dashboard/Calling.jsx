import React from "react";
import { Mic, Video } from "lucide-react";
// import { Mic, Video } from "react-icons/ri";

export default function Calling() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">

            {/* Top Navbar */}
            <header className="w-full bg-white shadow-sm py-4 px-8 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                        alt="logo"
                        className="w-8 h-8"
                    />
                    <h1 className="text-lg font-semibold text-[#187BCD]">
                        Online Consultation
                    </h1>
                </div>

                <button className="flex items-center gap-2 text-gray-600">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/1827/1827504.png"
                        className="w-5 h-5"
                    />
                    Tech Support
                </button>
            </header>

            {/* Main Content */}
            <div className="flex flex-col items-center mt-10">

                {/* Doctor Image */}
                <img
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80"
                    alt="Doctor"
                    className="w-28 h-28 rounded-full object-cover shadow-md"
                />

                {/* Doctor Name */}
                <h2 className="text-2xl font-bold mt-4">Dr. John Carter</h2>
                <p className="text-gray-500 text-sm">Cardiology Specialist</p>

                {/* Patient Image */}
                <div className="relative mt-8">
                    <img
                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80"
                        alt="Patient"
                        className="w-[340px] h-[340px] rounded-2xl object-cover shadow-lg"
                    />

                    {/* Icons Overlay */}
                    {/* Icons Overlay */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
                        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 transition-colors">
                            <Mic size={18} stroke="white" strokeWidth={2} />
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 transition-colors">
                            <Video size={18} stroke="white" strokeWidth={2} />
                        </button>
                    </div>

                </div>

                {/* Accept / Decline Buttons */}
                <div className="flex gap-6 mt-10">
                    <button
                        className="px-10 py-3 text-white text-lg rounded-full shadow-md"
                        style={{ backgroundColor: "#1DA851" }}
                    >
                        Accept
                    </button>

                    <button
                        className="px-10 py-3 text-white text-lg rounded-full shadow-md"
                        style={{ backgroundColor: "#D84343" }}
                    >
                        Decline
                    </button>
                </div>
            </div>
        </div>
    );
}
