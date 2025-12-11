// ConsultationModal.jsx
import React, { useState, useEffect } from 'react';

const ConsultationModal = ({ isOpen=true, onClose }) => {
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(35);
  const [isAcknowledged, setIsAcknowledged] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds === 0) {
          if (minutes === 0) {
            clearInterval(timer);
            return 0;
          }
          setMinutes(prevMinutes => prevMinutes - 1);
          return 59;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, minutes]);

  const handleAcknowledge = () => {
    setIsAcknowledged(true);
    console.log('User acknowledged the consultation guidelines');
  };

  const handleClose = () => {
    if (window.confirm('Are you sure you want to close? Your consultation will be canceled.')) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-gray-500 bg-opacity-40 flex items-center justify-center z-50 p-4">
      {/* Modal Container - Responsive width */}
      <div className="bg-white rounded-xl shadow-2xl flex flex-col w-full max-w-2xl mx-auto max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-white rounded-t-xl">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#2F74AA] flex items-center justify-center text-white mr-3 sm:mr-4 shadow-lg border-2 border-white">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-800">Online Consultation</h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">Your consultation will begin shortly</p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full hover:bg-red-50 flex items-center justify-center text-[#2F74AA] hover:text-red-600 transition-colors border border-[#2F74AA]"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Body - Scrollable on mobile */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
            {/* Left Column - Doctor Info & Wait Time */}
            <div className="lg:w-2/5 space-y-4">
              {/* Doctor Info */}
              <div className="text-center bg-blue-50 rounded-xl p-4 border border-blue-200">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#2F74AA] flex items-center justify-center text-white text-xl sm:text-2xl mx-auto mb-3 shadow-lg border-2 border-white">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg sm:text-xl text-[#2F74AA] mb-1">Dr. Elara Vance</h3>
                <p className="text-gray-600 text-sm mb-2">Psychiatrist</p>
                <div className="flex items-center justify-center text-green-600 bg-green-100 rounded-full py-1 px-3 text-xs sm:text-sm w-fit mx-auto border border-green-300">
                  <svg className="w-2 h-2 sm:w-3 sm:h-3 mr-1" fill="currentColor" viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="4" />
                  </svg>
                  <span>Online • Ready</span>
                </div>
              </div>

              {/* Wait Time */}
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 text-center">
                <div className="flex items-center justify-center text-[#2F74AA] text-sm mb-2 font-semibold">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Estimated Wait Time
                </div>
                <div className={`text-3xl sm:text-4xl font-bold font-mono mb-2 ${
                  minutes === 0 && seconds === 0 ? 'text-red-500' : 'text-[#2F74AA]'
                } ${minutes > 0 || seconds > 0 ? 'animate-pulse' : ''}`}>
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </div>
                <p className="text-gray-700 text-sm">
                  Waiting for <strong className="text-[#2F74AA]">Dr. Elara Vance</strong>
                </p>
              </div>
            </div>

            {/* Right Column - Preparation Steps */}
            <div className="lg:w-3/5">
              <h2 className="text-base sm:text-lg font-semibold text-[#2F74AA] mb-4 flex items-center border-b border-blue-100 pb-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#2F74AA] flex items-center justify-center text-white mr-2 sm:mr-3 shadow-md">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                Preparing for Your Consultation
              </h2>
              
              <div className="space-y-3">
                {/* Check Setup */}
                <div className="flex items-start p-3 sm:p-4 rounded-xl border border-blue-100 hover:border-[#2F74AA] transition-all duration-300 group bg-white">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#2F74AA] flex items-center justify-center text-white mr-3 sm:mr-4 flex-shrink-0 shadow-md group-hover:bg-blue-600 transition-colors">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#2F74AA] text-sm sm:text-base mb-1">Check Your Setup</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">Ensure your camera and microphone are working correctly.</p>
                  </div>
                </div>
                
                {/* Good Lighting */}
                <div className="flex items-start p-3 sm:p-4 rounded-xl border border-blue-100 hover:border-[#2F74AA] transition-all duration-300 group bg-white">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#2F74AA] flex items-center justify-center text-white mr-3 sm:mr-4 flex-shrink-0 shadow-md group-hover:bg-blue-600 transition-colors">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#2F74AA] text-sm sm:text-base mb-1">Good Lighting</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">Make sure your face is well-lit so your doctor can see you clearly.</p>
                  </div>
                </div>
                
                {/* Stable Connection */}
                <div className="flex items-start p-3 sm:p-4 rounded-xl border border-blue-100 hover:border-[#2F74AA] transition-all duration-300 group bg-white">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#2F74AA] flex items-center justify-center text-white mr-3 sm:mr-4 flex-shrink-0 shadow-md group-hover:bg-blue-600 transition-colors">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#2F74AA] text-sm sm:text-base mb-1">Stable Connection</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">A stable internet connection ensures the best video quality.</p>
                  </div>
                </div>
                
                {/* Quiet Environment */}
                <div className="flex items-start p-3 sm:p-4 rounded-xl border border-blue-100 hover:border-[#2F74AA] transition-all duration-300 group bg-white">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#2F74AA] flex items-center justify-center text-white mr-3 sm:mr-4 flex-shrink-0 shadow-md group-hover:bg-blue-600 transition-colors">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#2F74AA] text-sm sm:text-base mb-1">Quiet Environment</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">Find a quiet, private space to avoid interruptions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl flex flex-col sm:flex-row justify-end gap-3">
          <button 
            onClick={handleClose}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-white text-[#2F74AA] font-semibold rounded-lg border border-[#2F74AA] hover:bg-blue-50 transition-colors flex items-center justify-center shadow-sm order-2 sm:order-1"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancel
          </button>
          <button 
            onClick={handleAcknowledge}
            disabled={isAcknowledged}
            className={`px-4 sm:px-6 py-2 sm:py-3 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center shadow-md order-1 sm:order-2 ${
              isAcknowledged 
                ? 'bg-green-500 text-white cursor-default' 
                : 'bg-[#2F74AA] text-white hover:bg-blue-600'
            }`}
          >
            <svg className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 ${isAcknowledged ? 'text-white' : 'text-white'}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {isAcknowledged ? 'Acknowledged' : 'Acknowledge'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultationModal;