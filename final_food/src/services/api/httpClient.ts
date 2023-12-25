import type { AxiosRequestConfig } from 'axios';
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_URL

const baseParams = {
    apiKey: import.meta.env.VITE_API_KEY
}

const baseHeaders = {
    'Content-Type': 'application/json'
}

const makeRequest = async (requestConfig: AxiosRequestConfig) => {
    const {
        method = 'GET',
        url,
        params,
        data: body,
        headers,
        responseType
    } = requestConfig

    const response = await axios({
        method,
        url,
        params: { ...baseParams, ...params },
        data: body,
        headers: { ...baseHeaders, ...headers },
        responseType
    })
    
    return response.data
}

export default makeRequest