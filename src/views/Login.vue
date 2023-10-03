<script lang="ts" setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import router from "@/router";
import { useForm } from "vee-validate";
import { object, string } from "yup";

const { errors, handleSubmit, defineInputBinds } = useForm({
  validationSchema: object({
    name: string().required(),
    password: string().required()
  })
});

const loading = ref(false);
const name = defineInputBinds("name");
const password = defineInputBinds("password");

const onSubmit = handleSubmit((values) => {
  loading.value = true;
  console.log(values);
  setTimeout(() => {
    loading.value = false;
    router.push("/search");
  }, 1000);
});
</script>

<template>
  <form @submit.prevent="onSubmit" class="login-wrapper">
    <div class="login-field">
      <i class="pi pi-user" />
      <InputText
        id="username"
        type="text"
        class="login-input"
        :class="{ 'p-invalid': errors.name }"
        placeholder="ID"
        v-bind="name"
      />
    </div>
    <small class="p-error" id="name-error">{{ errors.name || "&nbsp;" }}</small>
    <div class="login-field">
      <i class="pi pi-key" />
      <InputText
        id="password"
        type="password"
        class="login-input"
        :class="{ 'p-invalid': errors.password }"
        placeholder="Password"
        v-bind="password"
      />
    </div>
    <small class="p-error" id="pass-error">{{ errors.password || "&nbsp;" }}</small>
    <Button label="Login" icon="pi pi-user" class="login-button" :loading="loading" type="submit" />
  </form>
</template>

<style lang="scss" scoped>
.login-wrapper {
  display: flex;
  flex-direction: column;
  width: 20rem;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  gap: 0.5rem;
}

.login-field {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
}

.login-input {
  width: 100%;
  height: 20px;
}

.login-button {
  width: 100%;
}
</style>
