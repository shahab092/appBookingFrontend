import React from "react";
import { useNavigate } from "react-router-dom";

export default function DocterDetails() {
    const navigate = useNavigate();

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                                <span className="material-symbols-outlined">medical_services</span>
                            </div>
                            <span className="text-xl font-bold tracking-tight text-primary">HealthConnect</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                <span className="material-symbols-outlined block dark:hidden">dark_mode</span>
                                <span className="material-symbols-outlined hidden dark:block text-yellow-400">light_mode</span>
                            </button>
                            <button
                                onClick={() => navigate("/login")}
                                className="hidden md:block px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
                            >
                                Login
                            </button>
                            <button className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-opacity-90 transition-all shadow-md shadow-primary/20">
                                Book Appointment
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Profile Card */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden mb-8">
                    <div className="p-6 md:p-8">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="relative group">
                                <div className="w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-slate-50 dark:border-slate-700 shadow-xl ring-2 ring-primary/20">
                                    <img
                                        alt="Doctor Profile"
                                        className="w-full h-full object-cover"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdoH13EJEqwZH0P18HvVAgzWTukvstFy4E8ebiOLGIDGNdXkL40F49f3jhBpauls21KSeFMY93fWv_m9qJuzHroF3sEop-dUVjPsYYoPoUxMDKZZZTq2q9y_nisWG4UEgIVQeryhpb5YRY9drkvoG8mCOWZxsuR0ZILgMbKkzcSYMAKFoZwAomNmc0ARQmoXqnaLCpNrOEyn93kK0ZXOtsDXXwxTvaGq3CrvPUVkCHnjpflqgy6CQ0AJvNupJMm9C5kvv8amYfowA"
                                    />
                                </div>
                                <div className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white dark:border-slate-800"></div>
                            </div>
                            <div className="flex-1 space-y-4">
                                <div className="flex flex-wrap items-center gap-3">
                                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dr. Sarah Thompson</h1>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800">
                                        <span className="material-symbols-outlined text-[14px] mr-1">verified</span> PMDC Verified
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-lg font-medium text-primary">Senior Dermatologist</p>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">MBBS, FCPS (Dermatology), Specialization in Cosmetic Surgery</p>
                                </div>
                                <div className="grid grid-cols-3 gap-4 py-6 border-y border-slate-100 dark:border-slate-700">
                                    <div className="text-center md:text-left">
                                        <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Reviews</p>
                                        <div className="flex flex-col md:flex-row md:items-center gap-1">
                                            <span className="text-xl font-bold">4.9</span>
                                            <div className="flex text-yellow-400 scale-75 origin-left">
                                                <span className="material-symbols-outlined">star</span>
                                                <span className="material-symbols-outlined">star</span>
                                                <span className="material-symbols-outlined">star</span>
                                                <span className="material-symbols-outlined">star</span>
                                                <span className="material-symbols-outlined">star_half</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center md:text-left border-x border-slate-100 dark:border-slate-700 px-4">
                                        <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Experience</p>
                                        <p className="text-xl font-bold">12+ Yrs</p>
                                    </div>
                                    <div className="text-center md:text-left">
                                        <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Satisfaction</p>
                                        <p className="text-xl font-bold text-secondary">98%</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-4 py-1.5 rounded-full bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 text-sm font-medium border border-slate-200 dark:border-slate-600">Hair Problems</span>
                                    <span className="px-4 py-1.5 rounded-full bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 text-sm font-medium border border-slate-200 dark:border-slate-600">PRP</span>
                                    <span className="px-4 py-1.5 rounded-full bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 text-sm font-medium border border-slate-200 dark:border-slate-600">Laser Hair Removal</span>
                                    <span className="px-4 py-1.5 rounded-full bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 text-sm font-medium border border-slate-200 dark:border-slate-600">Acne Scars</span>
                                </div>
                            </div>
                            <div className="w-full md:w-64 space-y-3">
                                <button className="w-full bg-secondary text-white px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/10">
                                    <span className="material-symbols-outlined">videocam</span>
                                    Video Call
                                </button>
                                <button className="w-full bg-accent text-white px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-900 transition-all shadow-lg shadow-blue-900/10">
                                    <span className="material-symbols-outlined">calendar_today</span>
                                    Book Appointment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <section className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">person_search</span>
                                About Dr. Sarah Thompson
                            </h2>
                            <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
                                <p>
                                    Dr. Sarah Thompson is a highly skilled Dermatologist with over 12 years of experience in clinical and cosmetic dermatology. She specializes in advanced skin treatments, hair restoration procedures, and non-invasive cosmetic surgeries. Her patient-centric approach ensures tailored treatment plans that address both medical concerns and aesthetic goals.
                                </p>
                            </div>
                        </section>

                        <section className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">location_on</span>
                                Clinic Locations
                            </h2>
                            <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
                                <div className="xl:col-span-3 space-y-4">
                                    {[
                                        {
                                            id: "clinic_1",
                                            name: "Central Medical Complex",
                                            address: "Suite 405, 4th Floor, Sector F-10, PWD Town, Islamabad",
                                            timing: "Mon-Sat (09:00 AM - 08:00 PM)",
                                            phone: "+92 300 1234567",
                                            fee: "Rs. 2,500",
                                        },
                                        {
                                            id: "clinic_2",
                                            name: "City Health Plaza",
                                            address: "Plaza 12, Main Boulevard, Blue Area, Islamabad",
                                            timing: "Tue-Sun (10:00 AM - 06:00 PM)",
                                            phone: "+92 321 9876543",
                                            fee: "Rs. 3,000",
                                        },
                                        {
                                            id: "clinic_3",
                                            name: "Downtown Specialist Center",
                                            address: "7th Floor, Landmark Tower, DHA Phase 2, Islamabad",
                                            timing: "Wed-Fri (02:00 PM - 09:00 PM)",
                                            phone: "+92 333 5551122",
                                            fee: "Rs. 2,000",
                                        },
                                    ].map((clinic) => (
                                        <div className="relative" key={clinic.id}>
                                            <input
                                                type="radio"
                                                id={clinic.id}
                                                name="clinic_choice"
                                                className="sr-only"
                                                defaultChecked={clinic.id === "clinic_1"}
                                            />
                                            <label
                                                htmlFor={clinic.id}
                                                className={`flex flex-col md:flex-row items-start md:items-center gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all border-slate-100 dark:border-slate-700 hover:border-primary/30`}
                                            >
                                                <div
                                                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 border-slate-300 dark:border-slate-600`}
                                                >
                                                    <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                                                </div>
                                                <div className="flex-1 space-y-1">
                                                    <h3 className="font-bold text-slate-900 dark:text-white">{clinic.name}</h3>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400">{clinic.address}</p>
                                                    <div className="flex flex-wrap gap-4 mt-2">
                                                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                                            <span className="material-symbols-outlined text-[16px]">schedule</span> {clinic.timing}
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                                            <span className="material-symbols-outlined text-[16px]">call</span> {clinic.phone}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold md:self-center">{clinic.fee}</div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <div className="xl:col-span-2 h-[450px] rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 relative group">
                                    <img
                                        alt="Multi Location Map"
                                        className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwWs8diSgAAnUm48UUMabKoRUq9eXGAia_cbnj-f72EhSx10Onoq10iisUcUgpsLbXmht1FbkUdEqSQFf7evOvTUqYL7EgXoTj9HFdBrqMhgOnFgayPUx_msNgaDoH6V_7Y2MlvnXqGxGTHM_IiRQ7Rx5EsMDDSmUuBnKBMhI13mQrx6WDj0JDACmCg0UoGtVb5mWcymI0AXTn-Nm6LbWTwwNc4Ay63IetQ6dL_qAEAES2RF5ERKX9I2hemHnJdFTZ0H-FL-y_MWA"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="absolute top-[25%] left-[40%] group/pin cursor-pointer">
                                            <div className="bg-primary text-white p-2 rounded-full shadow-lg scale-110">
                                                <span className="material-symbols-outlined text-sm">location_on</span>
                                            </div>
                                        </div>
                                        <div className="absolute top-[60%] left-[20%] group/pin cursor-pointer opacity-50 hover:opacity-100">
                                            <div className="bg-primary text-white p-2 rounded-full shadow-lg">
                                                <span className="material-symbols-outlined text-sm">location_on</span>
                                            </div>
                                        </div>
                                        <div className="absolute bottom-[30%] right-[30%] group/pin cursor-pointer opacity-50 hover:opacity-100">
                                            <div className="bg-primary text-white p-2 rounded-full shadow-lg">
                                                <span className="material-symbols-outlined text-sm">location_on</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700">
                            <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">rate_review</span>
                                Patient Reviews
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10 pb-10 border-b border-slate-100 dark:border-slate-700">
                                <div className="md:col-span-4 flex flex-col items-center justify-center text-center">
                                    <div className="text-5xl font-black text-slate-900 dark:text-white mb-2">4.9</div>
                                    <div className="flex text-yellow-400 mb-2">
                                        <span className="material-symbols-outlined text-2xl">star</span>
                                        <span className="material-symbols-outlined text-2xl">star</span>
                                        <span className="material-symbols-outlined text-2xl">star</span>
                                        <span className="material-symbols-outlined text-2xl">star</span>
                                        <span className="material-symbols-outlined text-2xl">star</span>
                                    </div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Based on 124 reviews</p>
                                </div>
                                <div className="md:col-span-8 space-y-3">
                                    {[
                                        { label: "5 stars", value: "90%" },
                                        { label: "4 stars", value: "8%" },
                                        { label: "3 stars", value: "2%" },
                                        { label: "2 stars", value: "0%" },
                                        { label: "1 stars", value: "0%" },
                                    ].map((rating) => (
                                        <div className="flex items-center gap-4" key={rating.label}>
                                            <span className="text-xs font-medium text-slate-500 w-12">{rating.label}</span>
                                            <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-primary rounded-full" style={{ width: rating.value }}></div>
                                            </div>
                                            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 w-8 text-right">{rating.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6">
                                {[
                                    {
                                        name: "James D.",
                                        time: "2 weeks ago",
                                        initials: "JD",
                                        rating: 5,
                                        comment: "Dr. Sarah is exceptional! She explained my skin condition clearly and the treatment plan she prescribed showed results within just a few days. Very professional and caring.",
                                    },
                                    {
                                        name: "Anonymous Patient",
                                        time: "1 month ago",
                                        initials: null,
                                        rating: 5,
                                        comment: "Great experience at the Central Medical Complex. The wait time was minimal and the doctor was very thorough with the checkup. Highly recommend for any skin-related issues.",
                                    },
                                    {
                                        name: "Maria Khan",
                                        time: "2 months ago",
                                        initials: "MK",
                                        rating: 4.5,
                                        comment: "I had a PRP session here. The clinic staff was polite and Dr. Thompson ensured I was comfortable throughout the process. Very happy with the service.",
                                    },
                                ].map((review, idx) => (
                                    <div key={idx} className="p-6 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-700">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-3">
                                                {review.initials ? (
                                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                        {review.initials}
                                                    </div>
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 font-bold">
                                                        <span className="material-symbols-outlined">person</span>
                                                    </div>
                                                )}
                                                <div>
                                                    <h4 className="font-bold text-slate-900 dark:text-white">{review.name}</h4>
                                                    <p className="text-xs text-slate-500">{review.time}</p>
                                                </div>
                                            </div>
                                            <div className="flex text-yellow-400">
                                                {Array.from({ length: Math.floor(review.rating) }).map((_, i) => (
                                                    <span key={i} className="material-symbols-outlined text-sm">star</span>
                                                ))}
                                                {review.rating % 1 !== 0 && <span className="material-symbols-outlined text-sm">star_half</span>}
                                            </div>
                                        </div>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{review.comment}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <button className="flex items-center gap-2 text-primary font-bold hover:underline">
                                    <span className="material-symbols-outlined">edit_note</span>
                                    Post a Review
                                </button>
                                <button className="w-full sm:w-auto text-center px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20">
                                    View All Reviews
                                </button>
                            </div>
                        </section>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-bold px-2 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">event_available</span>
                            Select Booking Option
                        </h2>
                        <div className="space-y-4">
                            <div
                                className={`group cursor-pointer bg-white dark:bg-slate-800 p-6 rounded-3xl border-2 transition-all relative border-primary shadow-md`}
                            >
                                <div className="absolute top-4 right-4 text-primary">
                                    <span className="material-symbols-outlined">check_circle</span>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div
                                        className={`p-3 w-fit rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-primary`}
                                    >
                                        <span className="material-symbols-outlined">videocam</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white text-lg">Online Consultation</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Connect via secure video call</p>
                                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                            Available Today
                                        </div>
                                    </div>
                                    <div className="flex items-baseline gap-1 border-t border-slate-100 dark:border-slate-700 pt-4">
                                        <span className="text-sm font-medium text-slate-400 dark:text-slate-500">Fee:</span>
                                        <span className="text-xl font-bold text-slate-900 dark:text-white">Rs. 1,500</span>
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`group cursor-pointer bg-white dark:bg-slate-800 p-6 rounded-3xl border-2 transition-all relative border-slate-100 dark:border-slate-700 hover:border-primary/20 shadow-sm`}
                            >
                                <div className="flex flex-col gap-4">
                                    <div
                                        className={`p-3 w-fit rounded-2xl bg-slate-50 dark:bg-slate-700/50 text-slate-500`}
                                    >
                                        <span className="material-symbols-outlined">apartment</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white text-lg">In-Clinic Visit</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Choose your preferred clinic location:</p>
                                        <div className="relative mb-3">
                                            <select
                                                className="w-full bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:ring-primary focus:border-primary appearance-none cursor-pointer"
                                                defaultValue="1"
                                            >
                                                <option value="1">Central Medical Complex</option>
                                                <option value="2">City Health Plaza</option>
                                                <option value="3">Downtown Specialist Center</option>
                                            </select>
                                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                                expand_more
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-sm font-medium">
                                            <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                                            Available Tomorrow
                                        </div>
                                    </div>
                                    <div className="flex items-baseline gap-1 border-t border-slate-100 dark:border-slate-700 pt-4">
                                        <span className="text-sm font-medium text-slate-400 dark:text-slate-500">Avg Fee:</span>
                                        <span className="text-xl font-bold text-slate-900 dark:text-white">Rs. 2,000+</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary/5 dark:bg-primary/10 p-6 rounded-3xl border border-primary/10">
                            <p className="text-xs text-primary font-bold uppercase tracking-widest mb-4">Total Payable</p>
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-2xl font-black text-slate-900 dark:text-white">
                                    Rs. 1,500
                                </span>
                                <span className="text-sm text-slate-500">VAT Included</span>
                            </div>
                            <button className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-opacity-90 transition-all shadow-xl shadow-primary/30">
                                Proceed to Booking
                            </button>
                            <p className="text-center mt-4 text-xs text-slate-400 flex items-center justify-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">lock</span>
                                Secure Payment Powered by HealthConnect
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 py-12 bg-white dark:bg-slate-900">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-sm">medical_services</span>
                        </div>
                        <span className="text-lg font-bold tracking-tight text-slate-400">HealthConnect</span>
                    </div>
                    <p className="text-slate-500 text-sm mb-6">Providing accessible healthcare solutions across the globe since 2018.</p>
                    <div className="flex justify-center gap-8 text-sm font-medium text-slate-400">
                        <button className="hover:text-primary transition-colors">Privacy Policy</button>
                        <button className="hover:text-primary transition-colors">Terms of Service</button>
                        <button className="hover:text-primary transition-colors">Help Center</button>
                    </div>
                    <p className="mt-8 text-xs text-slate-400/60">© 2024 HealthConnect Platform. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
