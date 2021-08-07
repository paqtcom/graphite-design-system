import { createApp } from "vue";
import App from "./App.vue";
import { GraphiteVue } from "@graphiteds/vue";

/* Core CSS required for Graphite components to work properly */
import "@graphiteds/core/css/core.css";

/* Theme variables */
import "./theme/variables.css";

createApp(App).use(GraphiteVue).mount("#app");
