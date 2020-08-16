import Axios, { Method } from 'axios';


const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhost:3030/api/';

const axios = Axios.create({
    withCredentials: true
});

export class HttpService {

    get(endpoint: any, data: any) {
        return this.ajax(endpoint, 'GET', data)
    }

    post(endpoint: any, data: any) {     
        return this.ajax(endpoint, 'POST', data)
    }

    put(endpoint: any, data: any) {
        return this.ajax(endpoint, 'PUT', data)
    }

    delete(endpoint: any, data: any) {
        return this.ajax(endpoint, 'DELETE', data)
    }

    async ajax(endpoint: string, method: Method, data: any) {

        try {


            const res = await axios({
                url: `${BASE_URL}${endpoint}`,
                method,
                data
            })           
            return res.data;
        } catch (err) {

            console.dir(err);
            // if (err.response && err.response.status === 401) {

            throw err;
        }
    }
}


