import "./assets/main.css";

import {createApp} from "vue";
import App from "./App.vue";
import {createPinia} from "pinia";
import {router} from "@/routes/routes";

const app = createApp(App);
const pinia = createPinia();


app.use(pinia);
app.use(router);
app.mount("#app");
// createApp(App).mount("#app");
