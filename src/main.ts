import { createApp } from 'vue';
import type { Directive } from 'vue';
import './style.css';
import App from './App.vue';

const app = createApp(App);

const vUppercase: Directive = {
    beforeMount(el) {
      el.addEventListener('input', (event: Event) => {
        const target = event.target as HTMLInputElement;
        target.value = target.value.toUpperCase();
      });
    }
};

const vHighlight: Directive = {
    beforeMount(el, binding) {
      el.style.color = binding.value || 'yellow';
    }
  };

const vFont: Directive = {
    mounted(el, binding) {
      el.style.fontWeight = binding.value.fontWeight || '500';
    }
}

app.directive('highlight', vHighlight);
app.directive('uppercase', vUppercase);
app.directive('font', vFont);

app.mount('#app');
