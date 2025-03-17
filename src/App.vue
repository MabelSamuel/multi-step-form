<script setup lang="ts">
import FormComponent from './components/FormComponent.vue';
</script>

<template>
  <main class="main-style">
    <Suspense>
      <template #default>
        <FormComponent />
      </template>
      <template #fallback>
        <div class="loading">
          <p>Loading form, please wait...</p>
        </div>
      </template>
    </Suspense>
  </main>
</template>

<style lang="scss" >
.main-style{
  display: flex;
  justify-content: center;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>