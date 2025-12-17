// validation/doctorRegistrationSchema.js
import * as yup from "yup";

export const doctorRegistrationSchema = yup.object().shape({
    firstName: yup.string().required("First name is required").min(2, "First name must be at least 2 characters"),
    lastName: yup.string().required("Last name is required").min(2, "Last name must be at least 2 characters"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup
        .string()
        .required("Phone number is required")
        .matches(/^\+?[0-9]{10,15}$/, "Invalid phone number"),
    password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
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
    email: yup
        .string()
        .required("Email or Username is required")
        .email("Invalid email format"),
    password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
});
