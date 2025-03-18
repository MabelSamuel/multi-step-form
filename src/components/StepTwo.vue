<script lang="ts" setup>
import { useFormStore } from '../stores/formStore.ts';
import InputLabelComponent from './InputLabelComponent.vue';
import { stepTwoFields } from '../data/input-field';
import ButtonComponent from './ButtonComponent.vue';

const formStore = useFormStore();
</script>

<template>
  <div>
    <h2>Step 2: Security Details</h2>
    <input-label-component 
        v-for="field in stepTwoFields"
        :key="field.id" 
        :id="field.id" 
        :label="field.label" 
        :type="field.type"
        :error="formStore.formErrors[field.id]" 
        :modelValue="formStore.formValues[field.id]" 
        @validate="formStore.validateField(field.id)"
        @update:modelValue="(value) => formStore.formValues[field.id] = value"
    />
    <div class="button-style">
        <button-component @next="formStore.prevStep" label="Previous" />
        <button-component @next="formStore.nextStep" label="Next" />
    </div>
  </div>
</template>

<style lang="scss">
.button-style {
    display: flex;
}
</style>
