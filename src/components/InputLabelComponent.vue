<script setup lang="ts">
  import LabelComponent from './LabelComponent.vue';
  // import { ExclamationIcon } from "@vue-hero-icons/outline";

  defineProps<{
    id: string;
    label: string;
    type?: string;
    error?: string;
    modelValue: string;
  }>();

  defineEmits(['update:modelValue','validate']);
  </script>

<template>
    <div class="input-field">
      <label-component :id="id" :error="!!error">{{ label }}*</label-component>
      <input
        v-uppercase
        :type="type"
        :id="id"
        class="input"
        :class="{ 'error': error }"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @blur="$emit('validate')"
      />
      <span v-if="error" class="error-message">
        <!-- <exclamation-icon class="icon" /> -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
        <span>{{ error }}</span>
      </span>
    </div>
  </template>
  
<style lang="scss" scoped>
  .input-field {
    margin-bottom: 2rem;
    display:flex;
    flex-direction: column;
    align-items: start;
  
    .input {
      width: 99%; 
      border: 1px solid #000;
      height: 3rem; 
      border-radius: 0.375rem;
      text-indent: 1rem; 
      box-shadow: inset 0 0 0 0.1rem rgba(10, 10, 10, 0.1);
  
      &:focus {
        outline: 2px solid #0070f3; 
        border-color: #0070f3; 
      }
  
      &.error {
        border-color: #f00;
      }
    }
  
    .error-message {
      margin-top: 0.75rem;
      color: #f00;
      display: flex;
      align-items: center;
  
      .icon {
        width: 1.25rem;
        margin-right: 0.5rem;
        height: 1.25rem;
        fill: #f00;
        stroke: #fff;
      }
    }
  }
</style>
  
  