import { Axios } from "axios";

export const http = new Axios({
    baseURL: process.env.API_URL!,
})

http.interceptors.request.use((config) => {
    config.params = {
        ...config.params,
        c: process.env.API_KEY
    }
    return config
})
