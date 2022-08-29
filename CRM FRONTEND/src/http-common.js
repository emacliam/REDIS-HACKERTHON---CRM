import axios from 'axios'
import { url } from '../config.js'

export default axios.create({
    baseURL: 'http://' + url /*  'https://redis-crm-api.herokuapp.com/' */,
    /*  baseURL: 'http://localhost:5000', */
})
