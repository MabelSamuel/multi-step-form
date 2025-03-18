<script lang="ts" setup>
import { useFormStore } from '../stores/formStore.ts';
import ButtonComponent from './ButtonComponent.vue';

const formStore = useFormStore();
</script>

<template>
    <div>
        <h2>Step 3: Confirm Details</h2>
        <p><strong v-highlight="'red'">First Name:</strong> {{ formStore.formValues.firstName }}</p>
        <p><strong>Last Name:</strong> {{ formStore.formValues.lastName }}</p>
        <p><strong v-font="{ fontWeight: '800' }">Email:</strong> {{ formStore.formValues.email }}</p>
        <div class="button-style">
            <button-component @next="formStore.prevStep" label="Previous" />
            <button-component @next="formStore.handleSubmit" label="Submit" />
        </div>
    </div>
</template>

<style lang="scss">
.button-style {
    display: flex;
    gap: 3rem;
}
</style>
