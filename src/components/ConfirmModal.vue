<script setup lang="ts">
defineProps<{ open: boolean }>();
const emit = defineEmits(["confirm", "close"]);


</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="modal-overlay">
        <div class="modal">
            <p>Are you sure you want to submit?</p>
            <div class="buttons-container">
                <button class="yes" @click="emit('confirm')">Yes</button>
                <button class="no" @click="emit('close')">No</button>
            </div>
        </div>
    </div>
  </Teleport>
</template>


<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    text-align: center;
}

button {
    padding: 0.75rem 1.5rem;
    border: none;
    font-size: 1rem;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    width: 100px;
    font-weight: bold;

    &.yes {
        background-color: #4caf50;
        color: white;

        &:hover {
            background-color: #388e3c;
        }
    }

    &.no {
        background-color: #f44336;
        color: white;

        &:hover {
            background-color: #d32f2f;
        }
    }
}

.buttons-container {
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;
}
</style>
