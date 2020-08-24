import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      dark: {
        primary: '#CBC7C7',
        secondary: '#A71E36',
        accent: '#2898D7',
        error: '#b71c1c',

      },
      light: {
        primary: '#CBC7C7',
        secondary: '#A71E36',
        accent: '#3F51B5',
        background: '#E8F0F4',
      },
    },
    options: {
      customProperties: true
  },
  },
});
