<script setup lang="ts">
import { ref } from "vue";
import VOtpInput from "vue3-otp-input";

const otpInput = ref<InstanceType<typeof VOtpInput> | null>(null);

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  numInputs: {
    type: Number,
    required: true,
  },
  
});
const emit = defineEmits(["update:modelValue"]);


</script>
<template>
  <div style="display: flex; flex-direction: row">
    <v-otp-input input-classes="otp-input" inputType="letter-numeric" :num-inputs="props.numInputs"
      v-model="props.modelValue" :should-auto-focus="true" :should-focus-order="true"
      @update:value="(event) => {
        emit('update:modelValue', event)
      }" />
  </div>
</template>

<style>
.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}
/* Background colour of an input field with value */
.otp-input.is-complete {
  background-color: #e4e4e4;
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input::placeholder {
  font-size: 15px;
  text-align: center;
  font-weight: 600;
}
</style>