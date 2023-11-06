import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //* User name + role
    temporary: {
      user_id: 0,
      username: "",
      role: "",
    },
  },

  mutations: {
    setStore(state, temporary) {
      state.temporary = temporary;
    },
  },
  actions: {},
  modules: {},
});
