<script lang="ts" setup>
import { useFormStore } from '../stores/formStore.ts';
import InputLabelComponent from './InputLabelComponent.vue';
import { stepOneFields } from '../data/input-field';
import ButtonComponent from './ButtonComponent.vue';

const formStore = useFormStore();
</script>

<template>
    <div>
        <h2>Step 1: Personal Details</h2>
        <input-label-component 
            v-for="field in stepOneFields" 
            :key="field.id" 
            :id="field.id" 
            :label="field.label" 
            :type="field.type"
            :error="formStore.formErrors[field.id]" 
            :modelValue="formStore.formValues[field.id]" 
            @validate="() => formStore.validateField(field.id)"
            @update:modelValue="(value) => formStore.formValues[field.id] = value" 
        />
        <button-component @next="formStore.nextStep" label="Next"/>
    </div>
</template>

<style scoped></style>
