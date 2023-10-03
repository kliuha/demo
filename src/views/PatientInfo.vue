<script lang="ts" setup>
import { ref } from "vue";
import { useAppStore } from "../stores/app";
import Card from "primevue/Card";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import CheckBox from "primevue/checkbox";
import router from "@/router";
import { useForm } from "vee-validate";
import { object, string } from "yup";

const { errors, handleSubmit, defineInputBinds } = useForm({
  validationSchema: object({
    firstName: string().required(),
    lastName: string().required(),
    phone: string().required()
  })
});

const firstName = defineInputBinds("firstName");
const lastName = defineInputBinds("lastName");
const ssn = ref("");
const medicareB = ref(false);
const medicareAdv = ref(false);
const email = ref("");
const phone = defineInputBinds("phone");
const street = ref("");
const city = ref("");
const state = ref("");
const postalCode = ref("");
const appStore = useAppStore();

const onSubmit = handleSubmit(() => {
  router.push("/assessment");
});
</script>

<template>
  <div class="card patient-info-wrapper">
    <Card style="width: 25em">
      <template #header>
        <img
          class="patient-image"
          alt="user header"
          src="https://louisville.edu/enrollmentmanagement/images/person-icon/image"
        />
      </template>
      <template #title> {{ appStore.selectedPatient?.name }} </template>
      <template #content>
        <form @submit.prevent="onSubmit">
          <div class="patient-info-fields">
            <InputText
              id="firstName"
              type="text"
              class="info-input"
              :class="{ 'p-invalid': errors.firstName }"
              placeholder="First name"
              v-bind="firstName"
            />
            <small v-if="errors.firstName" class="p-error">{{ errors.firstName || "&nbsp;" }}</small>
            <InputText
              id="lastName"
              type="text"
              class="info-input"
              :class="{ 'p-invalid': errors.lastName }"
              placeholder="Last name"
              v-bind="lastName"
            />
            <small v-if="errors.lastName" class="p-error">{{ errors.lastName || "&nbsp;" }}</small>
            <InputText id="ssn" type="text" class="info-input" placeholder="SSN" v-bind="ssn" />
            <div class="label-checkbox">
              <CheckBox v-model="medicareB" inputId="medicareB" name="medicareB" :binary="true" />
              <label for="medicareB">Is a patient on Medicare part B?</label>
            </div>
            <div class="label-checkbox" v-if="medicareB">
              <CheckBox v-model="medicareAdv" inputId="medicareAdv" name="medicareAdv" :binary="true" />
              <label for="medicareAdv">Is a patient on Medicare Advantage?</label>
              <small v-if="errors.medicareAdv" class="p-error">{{ errors.medicareAdv || "&nbsp;" }}</small>
            </div>
            <InputText id="email" type="email" class="info-input" placeholder="Email" v-bind="email" />
            <InputText id="phone" type="tel" class="info-input" placeholder="Phone number" v-bind="phone" />
            <small v-if="errors.phone" class="p-error">{{ errors.phone || "&nbsp;" }}</small>
            <InputText id="street" type="text" class="info-input" placeholder="Street" v-bind="street" />
            <InputText id="city" type="text" class="info-input" placeholder="City" v-bind="city" />
            <InputText id="state" type="text" class="info-input" placeholder="State" v-bind="state" />
            <InputText id="postalCode" type="text" class="info-input" placeholder="Postal code" v-bind="postalCode" />
          </div>
          <Button icon="pi pi-check" label="Go to assessment" @click="onSubmit" />
          <Button icon="pi pi-times" label="Back" severity="secondary" style="margin-left: 0.5em" />
        </form>
      </template>
    </Card>
  </div>
</template>

<style lang="scss" scoped>
.patient-info-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.info-input {
  height: 20px;
}

.patient-info-fields {
  display: flex;
  gap: 0.5rem;
  width: 100%;
  flex-direction: column;
  margin-bottom: 10px;
}

.patient-image {
  width: 100%;
  height: auto;
}

.label-checkbox {
  display: flex;
  align-items: center;
  gap: 1em;
}
</style>
