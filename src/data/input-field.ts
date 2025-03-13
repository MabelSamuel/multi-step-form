import { ref } from "vue";

export const inputFields = ref([
  { id: "firstName", label: "First Name", type: "text" },
  { id: "lastName", label: "Last Name", type: "text" },
  { id: "email", label: "Email Address", type: "email" },
  { id: "password", label: "Password", type: "password" },
  {
    id: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    error: false,
  },
]);

export const stepOneFields = ref([
  { id: "firstName", label: "First Name", type: "text" },
  { id: "lastName", label: "Last Name", type: "text" },
  { id: "email", label: "Email Address", type: "email" },
]);

export const stepTwoFields = ref([
  { id: "password", label: "Password", type: "password" },
  {
    id: "confirmPassword",
    label: "Confirm Password",
    type: "password",
  },
]);
