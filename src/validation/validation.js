// validation/doctorRegistrationSchema.js
import * as yup from "yup";

export const doctorRegistrationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^\+?[0-9]{10,15}$/, "Invalid phone number"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  licenseNumber: yup.string().required("PMDC number is required"),
  experience: yup
    .number()
    .typeError("Experience must be a number")
    .required("Experience is required")
    .min(0, "Experience cannot be negative"),
  specialization: yup.string().required("Specialization is required"),
  department: yup.string().required("Department is required"),
  street: yup.string().required("Street address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zip: yup
    .string()
    .required("Zip code is required")
    .matches(/^[0-9]+$/, "Zip must be numeric"),
  country: yup.string().required("Country is required"),
  about: yup.string().nullable(), // not required
});

export const loginSchema = yup.object().shape({
  whatsappnumber: yup.string().required("Whatsapp Number is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup.string().when("password", {
    is: (password) => password && password.length > 0,
    then: (schema) =>
      schema
        .required("Please confirm your password")
        .oneOf([yup.ref("password")], "Passwords must match"),
    otherwise: (schema) => schema.notRequired(),
  }),
  role: yup.string().nullable(), // Optional for login, enforced manually or via separate schema for register if needed
});

export const paymentSchema = yup.object().shape({
  method: yup
    .string()
    .oneOf(["easypaisa", "jazzcash", "card"])
    .required("Payment method is required"),

  // Easypaisa
  easypaisa_mobile: yup.string().when("method", {
    is: "easypaisa",
    then: () =>
      yup
        .string()
        .required("Easypaisa mobile number is required")
        .matches(/^03[0-9]{9}$/, "Enter valid Pakistani number"),
    otherwise: () => yup.string().nullable(),
  }),

  easypaisa_cnic: yup.string().when("method", {
    is: "easypaisa",
    then: () =>
      yup
        .string()
        .required("CNIC is required")
        .matches(/^[0-9]{4}$/, "Must be 4 digits"),
    otherwise: () => yup.string().nullable(),
  }),

  // JazzCash
  jazzcash_mobile: yup.string().when("method", {
    is: "jazzcash",
    then: () =>
      yup
        .string()
        .required("Jazzcash mobile number is required")
        .matches(/^03[0-9]{9}$/, "Enter valid Pakistani number"),
    otherwise: () => yup.string().nullable(),
  }),

  jazzcash_cnic: yup.string().when("method", {
    is: "jazzcash",
    then: () =>
      yup
        .string()
        .required("CNIC is required")
        .matches(/^[0-9]{4}$/, "Must be 4 digits"),
    otherwise: () => yup.string().nullable(),
  }),

  // Card
  cardNumber: yup.string().when("method", {
    is: "card",
    then: () =>
      yup
        .string()
        .required("Card number is required")
        .matches(/^[0-9]{16}$/, "Must be 16 digits"),
    otherwise: () => yup.string().nullable(),
  }),

  expiry: yup.string().when("method", {
    is: "card",
    then: () =>
      yup
        .string()
        .required("Expiry date is required")
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Format MM/YY"),
    otherwise: () => yup.string().nullable(),
  }),

  cvv: yup.string().when("method", {
    is: "card",
    then: () =>
      yup
        .string()
        .required("CVV is required")
        .matches(/^[0-9]{3,4}$/, "3 or 4 digits"),
    otherwise: () => yup.string().nullable(),
  }),
});
