export default {
    state: {
        sample: null,
        status: {
            success: false,
        },
    },
    getters: {
        sample(state) {
            return state.sample
        },
    },
    mutations: {
        SET_NAME(state, payload) {
            state.name = payload
        },
        loginSuccess(state, user) {
            state.status.success = true
            state.user = user
        },
        loginFailure(state) {
            state.status.success = false
            state.user = null
        },
        logout(state) {
            state.status.success = false
            state.user = null
        },
        registerSuccess(state) {
            state.status.success = false
        },
        registerFailure(state) {
            state.status.success = false
        },
    },
    actions: {
        Sample({ commit }, payload) {
            commit('loginSuccess', payload)
        },
    },
}
