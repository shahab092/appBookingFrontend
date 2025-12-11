// src/utils/toast.js
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Configure Toastify globally (optional)
toast.configure({
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

// Common functions
const showSuccess = (message) => toast.success(message);
const showError = (message) => toast.error(message);
const showInfo = (message) => toast.info(message);
const showWarning = (message) => toast.warn(message);

export { showSuccess, showError, showInfo, showWarning };
