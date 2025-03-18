<script setup lang="ts">
import { useFormStore } from '../stores/formStore.ts';
import StepOne from './StepOne.vue';
import StepTwo from './StepTwo.vue';
import StepThree from './StepThree.vue';
import ConfirmModal from './ConfirmModal.vue';

const formStore = useFormStore();

await formStore.promise; 
</script>

<template>
  <div class="form-wrapper">
    <h1>Registration Form</h1>
    <img v-if="formStore.data" class="img-style" :src="formStore.data.image" :alt="formStore.data.title">
    <div v-if="formStore.error">
      <p>An error occurred: {{ formStore.error }}</p>
    </div>
    <div>
      <Transition>
        <StepOne v-if="formStore.currentStep === 1" />
      </Transition>
      <Transition>
        <StepTwo v-if="formStore.currentStep === 2" />
      </Transition>
      <Transition name="bounce">
        <StepThree v-if="formStore.currentStep === 3" />
      </Transition>
    </div>

    <ConfirmModal :open="formStore.open" @confirm="formStore.confirmSubmit" @close="formStore.open = false" />
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
