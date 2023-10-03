import { ref } from "vue";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
  const selectedPatient = ref({} as any);

  return { selectedPatient };
});
