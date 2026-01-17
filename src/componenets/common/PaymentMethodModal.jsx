import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { CreditCard } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomTextField from "../common/CustomTextField";
import { paymentSchema } from "../../validation/validation";

export default function PaymentMethodModal({
  visible,
  onClose,
  onProceed,
  price,
}) {
  // separate states for each payment method
  const [easypaisaActive, setEasypaisaActive] = useState(true);
  const [jazzcashActive, setJazzcashActive] = useState(false);
  const [cardActive, setCardActive] = useState(false);

  const methods = useForm({
    resolver: yupResolver(paymentSchema),
    mode: "onSubmit",
    shouldUnregister: true,
    defaultValues: {
      method: "easypaisa",
    },
  });

  const { handleSubmit, setValue, reset } = methods;

  // update form value whenever selection changes
  useEffect(() => {
    if (easypaisaActive) setValue("method", "easypaisa");
    else if (jazzcashActive) setValue("method", "jazzcash");
    else if (cardActive) setValue("method", "card");
  }, [easypaisaActive, jazzcashActive, cardActive, setValue]);

  const submitPayment = (data) => {
    console.log("Payment Data:", data);
    onProceed?.(data);
    reset();
  };

  // helper to select a method
  const selectMethod = (method) => {
    setEasypaisaActive(method === "easypaisa");
    setJazzcashActive(method === "jazzcash");
    setCardActive(method === "card");
  };

  return (
    <Modal open={visible} footer={null} onCancel={onClose} centered width={600}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submitPayment)}>
          <div className="bg-white rounded-3xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b">
              <h3>Choose payment method</h3>
              {price && <span className="font-bold">PKR {price}</span>}
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              <WalletOption
                title="Easypaisa"
                desc="Pay using your mobile wallet"
                imgSrc="/assets/img/easypaisa.svg"
                active={easypaisaActive}
                methodPrefix="easypaisa"
                onClick={() => selectMethod("easypaisa")}
              />

              <WalletOption
                title="JazzCash"
                desc="Instant mobile payments"
                imgSrc="/assets/img/jazzcash.jpg"
                active={jazzcashActive}
                methodPrefix="jazzcash"
                onClick={() => selectMethod("jazzcash")}
              />

              <CardOption
                active={cardActive}
                onClick={() => selectMethod("card")}
              />
            </div>

            {/* Footer */}
            <div className="p-6 flex gap-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border rounded-xl py-3 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-primary text-white rounded-xl py-3 font-semibold"
              >
                Proceed {price && `PKR ${price}`}
              </button>
            </div>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
}

/* ---------------- SUB COMPONENTS ---------------- */

function WalletOption({ title, desc, imgSrc, active, methodPrefix, onClick }) {
  return (
    <div
      className={`rounded-2xl border-2 p-4 ${
        active ? "border-primary bg-primary/5" : "border-gray-200"
      }`}
    >
      <div className="flex justify-between cursor-pointer" onClick={onClick}>
        <div className="flex gap-3 items-center">
          <img
            src={imgSrc}
            alt={title}
            className="w-12 h-12 rounded-2xl object-cover object-center"
          />
          <div>
            <p className="font-semibold">{title}</p>
            <p className="text-sm text-gray-500">{desc}</p>
          </div>
        </div>
        <Radio active={active} />
      </div>

      {active && (
        <div className="mt-4 space-y-3 border-t pt-4">
          <CustomTextField
            name={`${methodPrefix}_mobile`}
            label="Mobile Number"
            placeholder="03XX XXXXXXX"
            allowOnly="numeric"
            maxLength={11}
          />
          <CustomTextField
            name={`${methodPrefix}_cnic`}
            label="CNIC Last 4 Digits"
            placeholder="1234"
            allowOnly="numeric"
            maxLength={4}
          />
        </div>
      )}
    </div>
  );
}

function CardOption({ active, onClick }) {
  return (
    <div
      className={`rounded-2xl border-2 p-4 ${
        active ? "border-primary bg-primary/5" : "border-gray-200"
      }`}
    >
      <div className="flex justify-between cursor-pointer" onClick={onClick}>
        <div className="flex gap-2 items-center">
          <CreditCard className="w-5 h-5" />
          <p className="font-semibold">Visa / Mastercard</p>
        </div>
        <Radio active={active} />
      </div>

      {active && (
        <div className="mt-4 space-y-3 border-t pt-4">
          <CustomTextField
            name="cardNumber"
            label="Card Number"
            placeholder="1234567812345678"
            allowOnly="numeric"
            maxLength={16}
          />
          <div className="flex gap-3">
            <CustomTextField
              name="expiry"
              label="Expiry (MM/YY)"
              placeholder="08/27"
            />
            <CustomTextField
              name="cvv"
              label="CVV"
              placeholder="123"
              allowOnly="numeric"
              maxLength={4}
            />
          </div>
        </div>
      )}
    </div>
  );
}

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
