import http from '../http-common'
/* import { getToken } from '../utils' */

class AuthService {
    async Login(data) {
        return http.get(
            `/login?first_name=${data.first_name}&last_name=${data.last_name}`,
            {
                headers: {
                    'Content-type': 'application/json',
                },
            }
        )
    }
    async Register(user) {
        return http.post(`/register-user`, user, {
            headers: {
                'Content-type': 'application/json',
            },
        })
    }

    async update(id, data) {
        return http.put(`/{id}`, data, {
            headers: {
                'Content-type': 'application/json',
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
}

export default new AuthService()
