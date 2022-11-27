// import { createStore } from "vuex";

// export default createStore({
//   state: {},
//   getters: {},
//   mutations: {},
//   actions: {},
//   modules: {},
// });
import { createStore } from "vuex";
import project from './modules/project'

export default createStore({
  modules: {
    project
  }
})
