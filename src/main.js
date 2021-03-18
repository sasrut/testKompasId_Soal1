import { createApp } from "vue";
import App from "./App.vue";
import Makan from "./Makan.vue";

import VueAxios from "vue-axios";

createApp(App).mount("#app");
createApp(Makan).mount("#makan");
Vue.use(VueAxios, axios);
