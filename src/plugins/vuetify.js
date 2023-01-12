// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";

const myCustomLightTheme = {
    dark: false,
    colors: {
      background: '#FFFFFF',
      surface: '#FFFFFF',
      primary: '#8DC73F',
      'primary-darken-1': '#3700B3',
      secondary: '#03DAC6',
      'secondary-darken-1': '#018786',
      error: '#B00020',
      info: '#2196F3',
      success: '#8DC73F',
      warning: '#FB8C00',
      'on-success': '#FFFFFF',
    }
  }

export default createVuetify({
    theme: {
        defaultTheme: 'myCustomLightTheme',
        themes: {
          myCustomLightTheme,
        }
      }
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
