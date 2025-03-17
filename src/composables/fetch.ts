import { ref } from "vue";
import type { Ref } from "vue";

export function useFetch<T>(url: string) {
  const data: Ref<T | null> = ref(null);
  const error: Ref<string | null> = ref(null);

  const fetchData = async() =>{
    try {
      const response = await fetch(url);
      data.value = await response.json();
    } catch (err) {
      error.value = (err as Error).message
    }
  }
  const promise = fetchData();

  return { data, error, promise };
}
