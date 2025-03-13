<script lang="ts" setup>
import { inject } from 'vue';
import ButtonComponent from './ButtonComponent.vue';

const formValues = inject<Record<string, string>>("formValues", {});
const validation = inject<(id: string) => void>("validation", () => {});
const prevStep = inject<() => void>("prevStep", () => {});

</script>

<template>
    <div>
        <h2>Step 3: Confirm Details</h2>
        <p><strong v-highlight="'red'">First Name:</strong> {{ formValues.firstName }}</p>
        <p><strong>Last Name:</strong> {{ formValues.lastName }}</p>
        <p><strong v-font="{fontWeight: '800'}">Email:</strong> {{ formValues.email }}</p>
        <div class="button-style">
            <button-component @next="prevStep" label="Previous" />
            <button-component @next="validation" label="Submit" />
        </div>
    </div>
</template>

<style lang="scss">
.button-style{
    display: flex;
    gap: 3rem;
}
</style>