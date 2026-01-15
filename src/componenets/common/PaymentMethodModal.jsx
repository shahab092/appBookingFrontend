import { useState } from "react";
import { Modal } from "antd";
import { CreditCard } from "lucide-react";

export default function PaymentMethodModal({ visible, onClose, onProceed }) {
  const [selected, setSelected] = useState("easypaisa");

  return (
    <Modal
      open={visible}
      footer={null}
      onCancel={onClose}
      centered
      width={450}
      className="p-0 payment-modal"
    >
      <div className="bg-white rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h2 className="text-lg font-bold text-gray-900">
            Choose payment method
          </h2>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Add new */}
          <button className="text-primary font-semibold text-sm flex items-center gap-2">
            <span className="text-lg">+</span> Add new payment method
          </button>

          {/* Easypaisa */}
          <WalletOption
            title="Easypaisa"
            desc="Pay using your mobile wallet"
            active={selected === "easypaisa"}
            onClick={() => setSelected("easypaisa")}
            logo="easy"
          />

          {/* JazzCash */}
          <WalletOption
            title="JazzCash"
            desc="Instant mobile payments"
            active={selected === "jazzcash"}
            onClick={() => setSelected("jazzcash")}
            logo="J"
          />

          {/* Card */}
          <CardOption
            active={selected === "card"}
            onClick={() => setSelected("card")}
          />
        </div>

        {/* Footer */}
        <div className="p-6 flex gap-4 border-t">
          <button
            onClick={onClose}
            className="flex-1 border rounded-xl py-3 font-semibold hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onProceed(selected)}
            className="flex-1 bg-primary text-white rounded-xl py-3 font-semibold hover:opacity-90 transition shadow-lg shadow-primary/30"
          >
            Proceed
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* ================= WALLET (Easypaisa + JazzCash) ================= */
function WalletOption({ title, desc, logo, active, onClick }) {
  return (
    <div
      className={`rounded-2xl border-2 p-4 transition ${
        active ? "border-primary bg-primary/5" : "border-gray-200"
      }`}
    >
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={onClick}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-bold">
            {logo}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{title}</p>
            <p className="text-sm text-gray-500">{desc}</p>
          </div>
        </div>

        <Radio active={active} />
      </div>

      {/* Expanded Form */}
      {active && (
        <div className="mt-4 space-y-3 border-t pt-4">
          <div>
            <label className="text-sm text-gray-600">Mobile Number</label>
            <input
              placeholder="03XX XXXXXXX"
              className="mt-1 w-full border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              CNIC (Last 4 digits)
            </label>
            <input
              placeholder="1234"
              className="mt-1 w-full border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= CARD ================= */
function CardOption({ active, onClick }) {
  return (
    <div
      className={`rounded-2xl border-2 p-4 transition ${
        active ? "border-primary bg-primary/5" : "border-gray-200"
      }`}
    >
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={onClick}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">Visa / Mastercard</p>
            <p className="text-sm text-gray-500">Pay via card</p>
          </div>
        </div>

        <Radio active={active} />
      </div>

      {/* Expanded Card Form */}
      {active && (
        <div className="mt-4 space-y-3 border-t pt-4">
          <div>
            <label className="text-sm text-gray-600">Card Number</label>
            <input
              placeholder="1234 5678 9012 3456"
              className="mt-1 w-full border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-sm text-gray-600">Expiry (MM/YY)</label>
              <input
                placeholder="MM/YY"
                className="mt-1 w-full border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex-1">
              <label className="text-sm text-gray-600">CVV</label>
              <input
                placeholder="123"
                className="mt-1 w-full border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= RADIO ================= */
function Radio({ active }) {
  return (
    <div
      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
        active ? "border-primary" : "border-gray-300"
      }`}
    >
      {active && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
    </div>
  );
}
