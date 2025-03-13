<script setup lang="ts">
import { reactive, provide, ref } from 'vue';
import { useFetch } from '../composables/fetch.ts';
import type { Product } from '../types/product.ts';
import StepOne from './StepOne.vue';
import StepTwo from './StepTwo.vue';
import StepThree from './StepThree.vue';

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

const { data, error } = useFetch<Product>('https://fakestoreapi.com/products/1')

const currentStep = ref(1);

const nextStep = () => {
  if (currentStep.value < 3){
    currentStep.value++;
  } 
};

const prevStep = () => {
  if (currentStep.value > 1){
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
};

provide("formValues", formValues);
provide("formErrors", formErrors);
provide("validation", validation);
provide("nextStep", nextStep);
provide("prevStep", prevStep);
</script>

<template>
  <div class="form-wrapper">
    <h1>Registration Form</h1>
    <img v-if="data" class="img-style" :src="data.image" :alt="data.title">
    <div v-if="error">
      <p>An error occured: {{ error }}</p>
    </div>
      <form @submit.prevent="handleSubmit">
        <!-- <input-label-component 
            v-for="field in inputFields" 
            :key="field.id" 
            :id="field.id" 
            :label="field.label" 
            :type="field.type" 
            :error="formErrors[field.id]" 
            :modelValue="formValues[field.id]" 
            @validate="validation(field.id)" 
            @update:modelValue="(value) => formValues[field.id] = value" 
        />
        <button-component label="Submit" /> -->
        <StepOne v-if="currentStep === 1" />
        <StepTwo v-if="currentStep === 2" />
        <StepThree v-if="currentStep === 3" />
      </form>
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
</style>
