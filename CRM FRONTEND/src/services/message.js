import http from '../http-common'

class MessageService {
    async getAll(id) {
        return http.get(`/get-messages?issue_id=${id}`, {
            headers: {
                'Content-type': 'application/json',
            },
        })
    }
}

export default new MessageService()
