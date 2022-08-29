export default {
    namespaced: true,
    state: {
        user:
            localStorage.getItem('user') !== null
                ? JSON.parse(localStorage.getItem('user'))
                : null || null,
    },
    getters: {
        user(state) {
            return state.user
        },
    },
    mutations: {
        save(state, user) {
            state.user = user
        },
        logout(state) {
            state.user = null
        },
    },
    actions: {
        Save_User({ commit }, payload) {
            console.log(payload)
            localStorage.setItem('user', JSON.stringify(payload))
            commit('save', payload)
        },
        Logout({ commit }, payload) {
            localStorage.setItem('user', JSON.stringify({}))
            commit('logout')
            return true
        },
    },
}
