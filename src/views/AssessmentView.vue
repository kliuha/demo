<script lang="ts" setup>
import { ref } from "vue";
import type { Ref } from "vue";
import router from "@/router";

import assessment from "../utils/assessment.json";
import RadioButton from "primevue/radiobutton";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";

import { type Assessment } from "../types/Assessment";

const assessmentResult: Ref<Assessment> = ref({} as Assessment);

const saveAssessment = () => {
  router.push("/appointment");
};
</script>

<template>
  <div class="assessment-wrapper" v-kbd-trap>
    <div class="assessment-section-wrapper" v-for="section in assessment" :key="section.name" v-kbd-trap.roving>
      <VDivider />
      <h2 class="assessment-section-title">{{ section.name }}</h2>
      <div v-for="question in section.questions" :key="question.question">
        <h4 class="assessment-question">{{ question.question }}</h4>
        <InputNumber
          class="assessment-question-input"
          v-model="assessmentResult[question.variable]"
          v-if="question.type === 'number'"
          :inputId="question.question"
          :min="0"
          :max="999"
          tabindex="0"
        />
        <div class="assessment-fields-wrapper" v-for="answer in question?.answers" :key="answer">
          <RadioButton
            v-model="assessmentResult[question.variable]"
            :inputId="answer"
            :value="answer"
            tabindex="0"
            v-if="question.type === 'radio'"
          />
          <Checkbox
            v-model="assessmentResult[question.variable]"
            :inputId="answer"
            :value="answer"
            v-if="question.type === 'checkbox'"
          />
          <label
            class="assessment-question-answer"
            :for="answer"
            v-if="question.type === 'checkbox' || question.type === 'radio'"
          >
            {{ answer }}
          </label>
        </div>
      </div>
    </div>
    <VDivider />
    <Button label="Save" class="save-button" @click="saveAssessment" />
  </div>
</template>

<style lang="scss" scoped>
.assessment-wrapper {
  display: flex;
  position: absolute;
  width: 720px;
  margin-right: -50%;
  padding: 10px;
  border-radius: 20px;
  background: #faf8f2;
  box-shadow:
    -35px 35px 100px #cdcbc6,
    35px -35px 100px #ffffff;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  left: 50%;
  transform: translate(-50%);
}

.assessment-section-wrapper {
  width: 100%;
}

.assessment-section-title {
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
}

.assessment-question {
  width: 100%;
  font-weight: 500;
  font-style: italic;
  word-wrap: break-word;
}

.assessment-question-answer {
  margin-left: 10px;
}
.assessment-question-input {
  height: 20px;
  width: 10%;
}
</style>
