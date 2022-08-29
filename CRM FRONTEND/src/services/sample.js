import http from '../http-common'
import { getToken } from '../utils'

class SampleService {
    async getAll(params) {
        const token = await getToken()
        if (token == null) {
            return null
        }
        return http.get(``, {
            headers: {
                'Content-type': 'application/json',
                token,
            },
        })
    }

    async update(id, data) {
        const token = await getToken()
        if (token == null) {
            return null
        }
        return http.put(`/{id}`, data, {
            headers: {
                'Content-type': 'application/json',
                token,
            },
        })
    }

    get(id) {
        return http.get(`/data/${id}`)
    }

    create(data) {
        return http.post('/', data)
    }

    delete(id) {
        return http.delete(`//${id}`)
    }

    deleteAll() {
        return http.delete(`/`)
    }

    findBy(x) {
        return http.get(`/?x=${x}`)
    }
}

export default new SampleService()
