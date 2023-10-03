<script lang="ts" setup>
import { ref } from "vue";
import SearchTable from "../components/SearchTable.vue";
import router from "@/router";
import { useAppStore } from "../stores/app";

const appStore = useAppStore();

const customers = ref([
  { name: "Amy Elsner", status: "unassessment" },
  { name: "Anna Fali", status: "unassessment" },
  { name: "Asiya Javayant", status: "unassessment" },
  { name: "Bernardo Dominic", status: "unassessment" },
  { name: "Elwin Sharvill", status: "unassessment" },
  { name: "Ioni Bowcher", status: "unassessment" },
  { name: "Ivan Magalhaes", status: "unassessment" },
  { name: "Onyama Limba", status: "assessment" },
  { name: "Stephen Shaw", status: "unassessment" },
  { name: "XuXue Feng", status: "unassessment" }
]);

const onSelect = (patient) => {
  appStore.selectedPatient = patient;
  router.push("patient-info");
};
</script>
<template>
  <SearchTable :customers="customers" @patient-select="onSelect" />
</template>
