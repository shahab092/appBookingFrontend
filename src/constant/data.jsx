import {
  LayoutDashboard,
  Users,
  FileText,
  Pill,
  MessageSquare,
  CreditCard,
  Settings,
} from "lucide-react";

export const SIDEBAR_MENU = {
  admin: [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      //   path: "/admin",
    },
    {
      label: "Users",
      icon: Users,
      //   path: "/admin/users",
    },
    {
      label: "Reports",
      icon: FileText,
      //   path: "/admin/reports",
    },
    {
      label: "Settings",
      icon: Settings,
      //   path: "/admin/settings",
    },
  ],

  doctor: [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      //   path: "/doctor",
    },
    {
      label: "Patients",
      icon: Users,
      //   path: "/doctor/patients",
    },
    {
      label: "Prescriptions",
      icon: Pill,
      //   path: "/doctor/prescriptions",
    },
    {
      label: "Messages",
      icon: MessageSquare,
      //   path: "/doctor/messages",
    },
  ],

  patient: [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      //   path: "/patient",
    },
    {
      label: "My Records",
      icon: FileText,
      //   path: "/patient/records",
    },
    {
      label: "Billing",
      icon: CreditCard,
      //   path: "/patient/billing",
    },
    {
      label: "Prescriptions",
      icon: Pill,
      //   path: "/patient/prescriptions",
    },
    {
      label: "Messages",
      icon: MessageSquare,
      //   path: "/patient/messages",
    },
    {
      label: "Settings",
      icon: Settings,
      //   path: "/patient/settings",
    },
  ],
};

export const user = {
  id: 1,
  name: "Ali Khan",
  email: "ali.khan@hospital.com",
  role: "patient", // admin | doctor | patient
  avatar: null, // optional
};
