<script lang="ts" setup>
import { ref } from "vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import Tag from "primevue/tag";

defineProps(["customers"]);
const emits = defineEmits(["patientSelect"]);

const selectedCustomers = ref();
const filters = ref();

const statuses = ref(["unassessment", "assessment"]);

const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    verified: { value: null, matchMode: FilterMatchMode.EQUALS }
  };
};

initFilters();

const getSeverity = (status) => {
  switch (status) {
    case "unassessment":
      return "danger";

    case "assessment":
      return "success";
  }
};

const clearFilter = () => {
  initFilters();
};

const patientSelect = (patient) => {
  emits("patientSelect", patient);
};
</script>

<template>
  <div class="card">
    <DataTable
      v-model:filters="filters"
      v-model:selection="selectedCustomers"
      :value="customers"
      paginator
      :rows="10"
      dataKey="id"
      filterDisplay="menu"
      :globalFilterFields="['name', 'country.name', 'representative.name', 'balance', 'status']"
    >
      <template #header>
        <div class="table-header">
          <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
          </span>
        </div>
      </template>
      <template #empty> No patients found. </template>
      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <Column field="name" header="Name" sortable style="min-width: 14rem">
        <template #body="{ data }">
          {{ data.name }}
        </template>
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by name" />
        </template>
      </Column>
      <Column header="Status" field="status" sortable :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">
        <template #body="{ data }">
          <Tag :value="data.status" :severity="getSeverity(data.status)" />
        </template>
        <template #filter="{ filterModel }">
          <Dropdown
            v-model="filterModel.value"
            :options="statuses"
            placeholder="Select One"
            class="p-column-filter"
            showClear
          >
            <template #option="slotProps">
              <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
            </template>
          </Dropdown>
        </template>
      </Column>
      <Column headerStyle="width: 5rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
        <template #body="slotProps">
          <Button type="button" icon="pi pi-pencil" rounded @click="patientSelect(slotProps.data)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style lang="scss" scoped>
.table-header {
  display: flex;
  justify-content: space-between;
}
</style>
