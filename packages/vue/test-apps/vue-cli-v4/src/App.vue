<template>
  <section>
    <way-button @click="doSomething()" :variant="variant">Vue 3</way-button>
  </section>

  <section>
    <way-select
      placeholder="Select one"
      v-model="selectedValue"
      @way-change="onSelectChange()"
    >
      <way-menu-item value="option-1">Option 1</way-menu-item>
      <way-menu-item value="option-2">Option 2</way-menu-item>
      <way-menu-item value="option-3">Option 3</way-menu-item>
    </way-select>

    <p>{{ selectedValue }}</p>
  </section>

  <section>
    <way-select
      placeholder="Select multiple"
      v-model="selectedValues"
      :multiple="true"
      :pill="true"
      :clearable="true"
    >
      <way-menu-label>Group 1</way-menu-label>
      <way-menu-item value="option-1">Option 1</way-menu-item>
      <way-menu-item value="option-2">Option 2</way-menu-item>
      <way-menu-item value="option-3">Option 3</way-menu-item>
      <way-menu-divider></way-menu-divider>
      <way-menu-label>Group 2</way-menu-label>
      <way-menu-item value="option-4">Option 4</way-menu-item>
      <way-menu-item value="option-5">Option 5</way-menu-item>
      <way-menu-item value="option-6">Option 6</way-menu-item>
    </way-select>

    <p>{{ selectedValues }}</p>
  </section>

  <section>
    <way-radio-group
      label="Select an option"
      v-model="selectedValue"
      @way-change="onRadioChange()"
    >
      <way-radio value="option-1">Option 1</way-radio>
      <way-radio value="option-2">Option 2</way-radio>
      <way-radio value="option-3">Option 3</way-radio>
    </way-radio-group>
  </section>
</template>

<script lang="ts">
import {
  WayButton,
  WaySelect,
  WayMenuItem,
  WayMenuLabel,
  WayMenuDivider,
  WayRadioGroup,
  WayRadio,
} from "@w2wds/vue";

import { ref, defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {
    WayButton,
    WaySelect,
    WayMenuItem,
    WayMenuLabel,
    WayMenuDivider,
    WayRadioGroup,
    WayRadio,
  },
  setup() {
    const variant = ref<"primary" | "default">("primary");
    const selectedValue = ref("option-3");
    const selectedValues = ref(["option-1", "option-2", "option-6"]);

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
