<script setup lang="ts">
import { reactive, provide, ref } from 'vue';
import { useFetch } from '../composables/fetch.ts';
import type { Product } from '../types/product.ts';
import StepOne from './StepOne.vue';
import StepTwo from './StepTwo.vue';
import StepThree from './StepThree.vue';
import ConfirmModal from './ConfirmModal.vue';

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

const { data, error, promise } = useFetch<Product>('https://fakestoreapi.com/products/1')

const currentStep = ref(1);

const open = ref(false);

const nextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const formatString = (str: string): string => {
  return str.replace(/([A-Z])/g, ' $1')
    .replace(/^./, (char) => char.toUpperCase());
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validation = (field: string) => {
  console.log(formValues)
  const value = formValues[field];

  if (!value) {
    formErrors[field] = `${formatString(field)} is required`;
    return
  }

  formErrors[field] = "";

  if (field === 'email' && !emailRegex.test(value)) {
    formErrors.email = "Invalid email format";
  }

  if (field === 'password' && value.length < 6) {
    formErrors.password = "Password must be at least 6 characters";
  }

  if (field === 'confirmPassword' && value !== formValues.password) {
    formErrors.confirmPassword = "Passwords do not match";
  }
};

const handleSubmit = () => {
  Object.keys(formValues).forEach(field => validation(field));
  if (Object.values(formErrors).every(error => error === "")) {
    open.value = true;
  }
};

const confirmSubmit = () => {
  open.value = false;
  alert("Form submitted successfully!");
};

provide("formValues", formValues);
provide("formErrors", formErrors);
provide("nextStep", nextStep);
provide("prevStep", prevStep);
provide("handleSubmit", handleSubmit);

await promise;
</script>

<template>
  <div class="form-wrapper">
    <h1>Registration Form</h1>
    <img v-if="data" class="img-style" :src="data.image" :alt="data.title">
    <div v-if="error">
      <p>An error occured: {{ error }}</p>
    </div>
    <div>
      <Transition>
        <StepOne v-if="currentStep === 1" />
      </Transition>
      <Transition>
        <StepTwo v-if="currentStep === 2" />
      </Transition>
      <Transition name="bounce">
        <StepThree v-if="currentStep === 3" />
      </Transition>
    </div>

    <ConfirmModal :open="open" @confirm="confirmSubmit" @close="open = false" />
  </div>
</template>


<style lang="scss" scoped>
.form-wrapper {
  width: 27.5rem;
  margin-block: 2rem;
}

.img-style {
  width: 3rem;
  height: 3rem;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}
</style>
