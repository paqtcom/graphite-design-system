import { createApp } from "vue";
import App from "./App.vue";
import { initializeWay2WebDesignSystem } from "@w2wds/vue";

/* Core CSS required for Way2Web Design System components to work properly */
import "@w2wds/core/dist/core/core.css";

/* Theme variables */
import "./theme/variables.css";

const app = createApp(App);

initializeWay2WebDesignSystem().then(() => {
  app.mount("#app");
});
