<script lang="ts" setup>
defineProps<{
  label: string;
}>();

defineEmits(['next']);
</script>

<template>
  <button @click="$emit('next')" type="submit" class="button-style">
    {{ label }}
  </button>
</template>

<style lang="scss" scoped>
.button-style{
    border: 1px solid black;
    height: 3.7rem; 
    border-radius: 0.375rem;
    background-color: #8a4bbb;
    color: white;
    width: 100%;
    transition: background-color 0.3s, color 0.3s;
    cursor: pointer;
    font-size: large;
    display: flex;
    justify-content: center;
    align-items: center;

   &:hover{
    background-color: #9d5cd0;
   }
}
</style>