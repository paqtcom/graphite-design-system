import { createApp } from "vue";
import App from "./App.vue";
import { Way2WebDesignSystemVue } from "@w2wds/vue";

/* Core CSS required for Way2Web Design System components to work properly */
import "@w2wds/core/dist/core/core.css";

/* Theme variables */
import "./theme/variables.css";

createApp(App).use(Way2WebDesignSystemVue).mount("#app");
