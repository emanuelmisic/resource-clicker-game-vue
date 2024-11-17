import { createApp } from "vue";
import App from "./App.vue";
import helpers from "@/helpers/globalMethods";

const app = createApp(App);

app.use(helpers);

app.mount("#app");
