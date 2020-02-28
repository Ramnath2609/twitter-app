import Axios from 'axios'

const axios = Axios.create({
    baseURL : "http://localhost:3791"
})

export default axios