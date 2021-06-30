<template>
  <section>
    <way-button @click="doSomething()" :variant="variant">Vue 3</way-button>
  </section>

  <section>
    <way-select placeholder="Select one" v-model="selectedValue">
      <way-menu-item value="option-1">Option 1</way-menu-item>
      <way-menu-item value="option-2">Option 2</way-menu-item>
      <way-menu-item value="option-3">Option 3</way-menu-item>
    </way-select>

    <p>{{ selectedValue }}</p>
  </section>

  <section>
    <way-select placeholder="Select multiple" v-model="selectedValues" multiple pill clearable>
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
</template>

<script lang="ts">
import {
  WayButton,
  WaySelect,
  WayMenuItem,
  WayMenuLabel,
  WayMenuDivider,
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
  },
  setup() {
    const variant = ref<'primary' | 'default'>('primary');
    const selectedValue = ref('option-3');
    const selectedValues = ref(["option-1", "option-2", "option-6"]);

    const doSomething = () => {
      variant.value = variant.value === "primary" ? "default" : "primary";
    }

    return { variant, selectedValue, selectedValues, doSomething }
  }
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
