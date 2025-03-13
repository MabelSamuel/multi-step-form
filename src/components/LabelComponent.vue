<script setup lang="ts">
import type { LabelProps } from '../types/LabelProps';

defineProps<LabelProps>();
</script>

<template>
  <label :for="id" class="label" :class="{ 'error': error }">
    <slot></slot>
  </label>
</template>
  
<style lang="scss" scoped>
  .label {
    font-weight: 500;
    font-size: 1.125rem;
    display: block;
    
    &.error {
      color: #f00; 
    }
  }
</style>
  