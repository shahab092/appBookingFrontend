import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiCheckCircle, 
  FiAlertCircle, 
  FiInfo, 
  FiX 
} from 'react-icons/fi';

const toastStyles = {
  success: {
    icon: <FiCheckCircle className="text-emerald-500" />,
    bg: 'bg-emerald-50/90',
    border: 'border-emerald-200',
    text: 'text-emerald-900',
    glow: 'shadow-[0_0_15px_rgba(16,185,129,0.1)]'
  },
  error: {
    icon: <FiAlertCircle className="text-rose-500" />,
    bg: 'bg-rose-50/90',
    border: 'border-rose-200',
    text: 'text-rose-900',
    glow: 'shadow-[0_0_15px_rgba(244,63,94,0.1)]'
  },
  warning: {
    icon: <FiAlertCircle className="text-amber-500" />,
    bg: 'bg-amber-50/90',
    border: 'border-amber-200',
    text: 'text-amber-900',
    glow: 'shadow-[0_0_15px_rgba(245,158,11,0.1)]'
  },
  info: {
    icon: <FiInfo className="text-sky-500" />,
    bg: 'bg-sky-50/90',
    border: 'border-sky-200',
    text: 'text-sky-900',
    glow: 'shadow-[0_0_15px_rgba(14,165,233,0.1)]'
  }
};

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  const style = toastStyles[type] || toastStyles.success;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={`
        pointer-events-auto
        flex items-center gap-3 px-4 py-3 rounded-2xl border
        backdrop-blur-md shadow-lg
        min-w-[300px] max-w-[450px]
        ${style.bg} ${style.border} ${style.text} ${style.glow}
      `}
    >
      <div className="flex-shrink-0 text-xl">
        {style.icon}
      </div>
      <div className="flex-1 text-sm font-bold leading-tight">
        {message}
      </div>
      <button 
        onClick={onClose}
        className="flex-shrink-0 p-1 hover:bg-black/5 rounded-full transition-colors"
      >
        <FiX size={16} className="opacity-50" />
      </button>
    </motion.div>
  );
};

export default Toast;
