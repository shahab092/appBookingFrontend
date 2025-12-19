import {
  LayoutDashboard,
  Users,
  FileText,
  Pill,
  MessageSquare,
  CreditCard,
  Settings,
} from "lucide-react";

// export const SIDEBAR_MENU = {
//   admin: [
//     {
//       label: "Dashboard",
//       icon: LayoutDashboard,
//       //   path: "/admin",
//     },
//     {
//       label: "Users",
//       icon: Users,
//       //   path: "/admin/users",
//     },
//     {
//       label: "Reports",
//       icon: FileText,
//       //   path: "/admin/reports",
//     },
//     {
//       label: "Settings",
//       icon: Settings,
//       //   path: "/admin/settings",
//     },
//   ],

//   doctor: [
//     {
//       label: "Dashboard",
//       icon: LayoutDashboard,
//         path: "/doctor",
//     },
//     {
//       label: "Patients",
//       icon: Users,
//         path: "/doctor/patients",
//     },
//     {
//       label: "Prescriptions",
//       icon: Pill,
//         path: "/doctor/prescriptions",
//     },
//     {
//       label: "Messages",
//       icon: MessageSquare,
//       //   path: "/doctor/messages",
//     },
//   ],

//   patient: [
//     {
//       label: "Dashboard",
//       icon: LayoutDashboard,
//       //   path: "/patient",
//     },
//     {
//       label: "My Records",
//       icon: FileText,
//       //   path: "/patient/records",
//     },
//     {
//       label: "Billing",
//       icon: CreditCard,
//       //   path: "/patient/billing",
//     },
//     {
//       label: "Prescriptions",
//       icon: Pill,
//       //   path: "/patient/prescriptions",
//     },
//     {
//       label: "Messages",
//       icon: MessageSquare,
//       //   path: "/patient/messages",
//     },
//     {
//       label: "Settings",
//       icon: Settings,
//       //   path: "/patient/settings",
//     },
//   ],
// };

export const SIDEBAR_MENU = {
  admin: [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
    },
    {
      label: "Users",
      icon: Users,
      path: "/admin/users",
    },
    {
      label: "Reports",
      icon: FileText,
      path: "/admin/appiontment",
    },
    {
      label: "Settings",
      icon: Settings,
      path: "/admin/settings",
    },
  ],

  doctor: [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/doctor/dashboard",
    },
    {
      label: "Patients",
      icon: Users,
      path: "/doctor/patients",
    },
    {
      label: "Prescriptions",
      icon: Pill,
      path: "/doctor/prescriptions",
    },
    {
      label: "Messages",
      icon: MessageSquare,
      path: "/doctor/messages",
    },
  ],

  patient: [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/patient/dashboard",
    },
    {
      label: "My Records",
      icon: FileText,
      path: "/patient/records",
    },
    {
      label: "Billing",
      icon: CreditCard,
      path: "/patient/billing",
    },
    {
      label: "Prescriptions",
      icon: Pill,
      path: "/patient/prescriptions",
    },
    {
      label: "Messages",
      icon: MessageSquare,
      path: "/patient/messages",
    },
    {
      label: "Settings",
      icon: Settings,
      path: "/patient/settings",
    },
  ],
};
// export const user = {
//   id: 1,
//   name: "Ali Khan",
//   email: "ali.khan@hospital.com",
//   role: "doctor", // admin | doctor | patient
//   avatar: null, // optional
// };

export const appointments = [
  {
    id: 1,
    title: "Annual Physical Exam",
    time: "Mon, Oct 28, 2024 - 10:30 AM",
    doctor: "Dr. Evelyn Reed (Cardiology)",
    status: "Confirmed",
    statusColor: "green",
    type: "In-Clinic",
    showActions: true,
  },
  {
    id: 2,
    title: "Follow-up Consultation",
    time: "Wed, Nov 06, 2024 - 2:00 PM",
    doctor: "Dr. Ben Carter (Dermatology)",
    status: "Pending Confirmation",
    statusColor: "yellow",
    type: "Online",
    online: true,
    showActions: true,
  },
  {
    id: 3,
    title: "Dermatology Check-up",
    time: "Fri, Nov 15, 2024 - 9:00 AM",
    doctor: "Dr. Chloe Davis (Dermatology)",
    status: "Cancelled by Clinic",
    statusColor: "red",
    cancelled: true,
  },
];

export const specializationOptions = [
  { label: "Cardiology", value: "cardiology" },
  { label: "Dermatology", value: "dermatology" },
  { label: "Neurology", value: "neurology" },
  { label: "Pediatrics", value: "pediatrics" },
  { label: "Radiology", value: "radiology" },
];

export const departmentOptions = [
  { label: "Heart Center", value: "heart-center" },
  { label: "Skin Clinic", value: "skin-clinic" },
  { label: "Neuro Department", value: "neuro-dept" },
  { label: "Children Care", value: "children-care" },
  { label: "Imaging Center", value: "imaging-center" },
];
