import { ref } from "vue";
import type { Ref } from "vue";

export function useFetch<T>(url: string) {
  const data: Ref<T | null> = ref(null);
  const error: Ref<string | null> = ref(null);

  fetch(url)
    .then((res) => res.json())
    .then((json: T) => (data.value = json))
    .catch((err: Error) => (error.value = err.message));

  return { data, error };
}
