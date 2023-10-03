import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import AssessmentView from "../views/AssessmentView.vue";
import PatientSearch from "../views/PatientSearch.vue";
import PatientInfo from "../views/PatientInfo.vue";
import AppointmentView from "../views/AppointmentView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      alias: "/login",
      component: Login
    },
    {
      path: "/assessment",
      name: "assessment",
      component: AssessmentView
    },
    {
      path: "/search",
      name: "search",
      component: PatientSearch
    },
    {
      path: "/patient-info",
      name: "patientInfo",
      component: PatientInfo
    },
    {
      path: "/appointment",
      name: "appointment",
      component: AppointmentView
    }
  ]
});

export default router;
