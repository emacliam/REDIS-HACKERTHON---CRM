export default {
    namespaced: true,
    state: {
        Issue:
            localStorage.getItem('issue_current') !== null
                ? JSON.parse(localStorage.getItem('issue_current'))
                : null || null,
    },
    getters: {
        Issue(state) {
            return state.Issue
        },
    },
    mutations: {
        save(state, issue) {
            state.Issue = issue
        },
    },
    actions: {
        Save_Issue({ commit }, payload) {
            localStorage.setItem('issue_current', JSON.stringify(payload))
            commit('save', payload)
        },
    },
}
