<script lang="ts" setup>
import { inject } from 'vue';
import InputLabelComponent from './InputLabelComponent.vue';
import { stepOneFields } from '../data/input-field';
import ButtonComponent from './ButtonComponent.vue';

const formValues = inject<Record<string, string>>("formValues", {});
const formErrors = inject<Record<string, string>>("formErrors", {});
const validation = inject<(id: string) => void>("validation", () => {});
const nextStep = inject<() => void>("nextStep", () => {});
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
            :error="formErrors?.[field.id]" 
            :modelValue="formValues?.[field.id]" 
            @validate="() => validation(field.id)"
            @update:modelValue="(value) => formValues[field.id] = value" 
        />
        <button-component @next="nextStep" label="Next"/>
    </div>
</template>

<style scoped></style>
