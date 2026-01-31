import React, { useState, useEffect } from "react";
import { CreditCard } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomTextField from "../common/CustomTextField";
import { paymentSchema } from "../../validation/validation";
import CustomModal from "../common/CustomModal";

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
    if (easypaisaActive) setValue("paymentMethod", "easypaisa");
    else if (jazzcashActive) setValue("paymentMethod", "jazzcash");
    else if (cardActive) setValue("paymentMethod", "card");
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
    <CustomModal
      visible={visible}
      title="Choose payment method"
      subtitle={
        price
          ? `Amount to pay: PKR ${price}`
          : "Select your preferred way to pay"
      }
      onCancel={onClose}
      onSubmit={handleSubmit(submitPayment)}
      submitText={`Proceed`}
      width={600}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submitPayment)}>
          <div className="bg-white dark:bg-neutral-medium rounded-3xl overflow-hidden">
            {/* Body */}
            <div className="space-y-4">
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
          </div>
        </form>
      </FormProvider>
    </CustomModal>
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
