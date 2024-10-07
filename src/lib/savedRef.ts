import {ref, watch} from "vue";


export function savedRef<T>(key: string, defaultValue: T) {
  let initValue: T = JSON.parse(localStorage.getItem(key) ?? "null") ?? defaultValue as T

  const r = ref<T>(initValue)

  watch(r, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
  })

  return r
}