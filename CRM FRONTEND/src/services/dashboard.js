import http from '../http-common'

class DashboardService {
    async getAll(params) {
        return http.get(`/get-dashboard?customer_id=${params}`, {
            headers: {
                'Content-type': 'application/json',
            },
        })
    }

    async getAllAgent(params) {
        return http.get(`/get-dashboard`, {
            headers: {
                'Content-type': 'application/json',
            },
        })
    }
}

export default new DashboardService()
