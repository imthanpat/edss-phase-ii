// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";

export default createVuetify({
    theme: {
        themes: {
            dark: {
                primary: '#1976D2',
                secondary: '#424242',
                accent: '#82B1FF',
                error: 'rgb(255,99,132)',
                info: '#2196F3',
                success: '#009688',
                warning: 'rgb(255,159,64)',
            }
        }
    }
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
