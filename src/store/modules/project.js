const state = {
    projectId: '',
    debug: ''
  }
  
  const getters = {
    projectId: (state, getters, rootState) => {
      return state.projectId
    }
  }
  
  const actions = {
    setProjectId: ({ commit, state }, payload) => {
      commit('SET_PROJECT_ID', payload)
    }
  }
  
  const mutations = {
    SET_PROJECT_ID (state, payload) {
      state.projectId = payload
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }