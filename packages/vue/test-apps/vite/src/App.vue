<template>
  <section>
    <gr-button @click="doSomething()" :variant="variant">Vue 3</gr-button>
  </section>

  <section>
    <gr-select
      placeholder="Select one"
      v-model="selectedValue"
      @gr-change="onSelectChange()"
    >
      <gr-menu-item value="option-1">Option 1</gr-menu-item>
      <gr-menu-item value="option-2">Option 2</gr-menu-item>
      <gr-menu-item value="option-3">Option 3</gr-menu-item>
    </gr-select>

    <p>{{ selectedValue }}</p>
  </section>

  <section>
    <gr-select
      placeholder="Select multiple"
      v-model="selectedValues"
      :multiple="true"
      :pill="true"
      :clearable="true"
    >
      <gr-menu-label>Group 1</gr-menu-label>
      <gr-menu-item value="option-1">Option 1</gr-menu-item>
      <gr-menu-item value="option-2">Option 2</gr-menu-item>
      <gr-menu-item value="option-3">Option 3</gr-menu-item>
      <gr-menu-divider></gr-menu-divider>
      <gr-menu-label>Group 2</gr-menu-label>
      <gr-menu-item value="option-4">Option 4</gr-menu-item>
      <gr-menu-item value="option-5">Option 5</gr-menu-item>
      <gr-menu-item value="option-6">Option 6</gr-menu-item>
    </gr-select>

    <p>{{ selectedValues }}</p>
  </section>

  <section>
    <gr-radio-group
      label="Select an option"
      v-model="selectedValue"
      @gr-change="onRadioChange()"
    >
      <gr-radio value="option-1">Option 1</gr-radio>
      <gr-radio value="option-2">Option 2</gr-radio>
      <gr-radio value="option-3">Option 3</gr-radio>
    </gr-radio-group>
  </section>

  <section>
    <gr-input v-model="inputValue"></gr-input>

    <p>{{ inputValue }}</p>
  </section>

  <section>
    <gr-date-picker></gr-date-picker>
  </section>
</template>

<script lang="ts">
import {
  GrButton,
  GrSelect,
  GrMenuItem,
  GrMenuLabel,
  GrMenuDivider,
  GrRadioGroup,
  GrRadio,
  GrInput,
  GrDatePicker,
} from "@graphiteds/vue";

import { ref, defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {
    GrButton,
    GrSelect,
    GrMenuItem,
    GrMenuLabel,
    GrMenuDivider,
    GrRadioGroup,
    GrRadio,
    GrInput,
    GrDatePicker,
  },
  setup() {
    const variant = ref<"primary" | "default">("primary");
    const selectedValue = ref("option-3");
    const selectedValues = ref(["option-1", "option-2", "option-6"]);
    const inputValue = ref("input value");

    const doSomething = () => {
      variant.value = variant.value === "primary" ? "default" : "primary";
    };

    const onSelectChange = () => {
      console.log("select changed");
    };

    const onRadioChange = () => {
      console.log("radio changed");
    };

    return {
      variant,
      selectedValue,
      selectedValues,
      inputValue,
      doSomething,
      onSelectChange,
      onRadioChange,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}

section {
  margin-bottom: 1rem;
}
</style>
