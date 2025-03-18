import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import { useFetch } from "../composables/fetch.ts";
import type { Product } from "../types/product.ts";

export const useFormStore = defineStore("form", () => {
  const formValues = reactive<{ [key: string]: string }>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const formErrors = reactive<{ [key: string]: string }>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const currentStep = ref(1);
  const open = ref(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { data, error, promise } = useFetch<Product>(
    "https://fakestoreapi.com/products/1"
  );

  const isFormValid = computed(() => {
    return Object.values(formErrors).every((error) => error === "");
  });

  function nextStep() {
    if (currentStep.value < 3) {
      currentStep.value++;
    }
  }

  function prevStep() {
    if (currentStep.value > 1) {
      currentStep.value--;
    }
  }

  function formatString(str: string): string {
    return str
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (char) => char.toUpperCase());
  }

  function validateField(field: string) {
    const value = formValues[field];

    if (!value) {
      formErrors[field] = `${formatString(field)} is required`;
      return;
    }

    formErrors[field] = "";

    if (field === "email" && !emailRegex.test(value)) {
      formErrors.email = "Invalid email format";
    }

    if (field === "password" && value.length < 6) {
      formErrors.password = "Password must be at least 6 characters";
    }

    if (field === "confirmPassword" && value !== formValues.password) {
      formErrors.confirmPassword = "Passwords do not match";
    }
  }

  function handleSubmit() {
    Object.keys(formValues).forEach(validateField);
    if (isFormValid.value) {
      open.value = true;
    }
  }

  function confirmSubmit() {
    open.value = false;
    alert("Form submitted successfully!");
  }

  return {
    formValues,
    formErrors,
    currentStep,
    open,
    data,
    error,
    promise,
    isFormValid,
    nextStep,
    prevStep,
    validateField,
    handleSubmit,
    confirmSubmit,
  };
});
