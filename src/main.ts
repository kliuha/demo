import "primevue/resources/themes/md-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueKeyboardTrapDirectivePlugin } from "@pdanpdan/vue-keyboard-trap";
import PrimeVue from "primevue/config";
import FocusTrap from "primevue/focustrap";
import InputNumber from "primevue/inputnumber";
import Divider from "primevue/divider";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.directive("focustrap", FocusTrap);

app.use(VueKeyboardTrapDirectivePlugin, {});
app.use(PrimeVue, { ripple: true });
app.use(createPinia());
app.use(router);

app.component("InputNumber", InputNumber);
app.component("VDivider", Divider);

app.mount("#app");
