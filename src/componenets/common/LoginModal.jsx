import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { Lock, LogIn } from "lucide-react";

export default function LoginModal({ visible, onCancel }) {
  const navigate = useNavigate();

  return (
    <Modal
      open={visible}
      footer={null}
      onCancel={onCancel}
      centered
      width={400}
      className="p-0"
    >
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
          <Lock className="w-8 h-8 text-[var(--color-primary)]" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">Login Required</h3>
        <p className="text-gray-500 mb-6 font-medium">
          Please login to access this feature and manage your appointments.
        </p>

        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={() => navigate("/login")}
            className="w-full py-3 px-4 bg-[var(--color-primary)] hover:opacity-90 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
          >
            <LogIn className="w-5 h-5" />
            Login Now
          </button>

          <button
            onClick={onCancel}
            className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
