import { createStore } from 'vuex'

import sample from '../store/modules/sample'
import auth from '../store/modules/auth'
import issue from '../store/modules/issue'

const store = createStore({
    modules: {
        sample,
        auth,
        issue,
    },
})

export default store
