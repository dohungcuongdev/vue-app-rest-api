import axios from 'axios';
//const SERVICE_URL = 'http://localhost:3000/api';
const SERVICE_URL = 'http://localhost:3000';
export class APIService {

    apiUrl = '';

    constructor(endpoint) {
        if(endpoint == null || endpoint === '') {
            this.apiUrl = `${SERVICE_URL}`;
        } else {
            this.apiUrl = `${SERVICE_URL}/${endpoint}`;
        }
    }

    // if URL is not provided from const SERVICE_URL
    changeApiUrlTo(apiUrl) {
        this.apiUrl = apiUrl;
    }

    getDataFromUrl(url) {
        // eslint-disable-next-line
        console.log(url)
        return axios.get(url).then(response => response.data);
    }

    getData() {
        const url = `${this.apiUrl}`;
        // eslint-disable-next-line
        console.log(url)
        return axios.get(url).then(response => response.data);
    }

    getDataBy(param) {
        const url = `${this.apiUrl}/${param}`;
        // eslint-disable-next-line
        console.log(url)
        return axios.get(url).then(response => response.data);
    }

    insertData(contact) {
        const url = `${this.apiUrl}`;
        // eslint-disable-next-line
        console.log(url)
        return axios.post(url,contact);
    }

    updateDataBy(data, param) {
        const url = `${this.apiUrl}/${param}`;
        // eslint-disable-next-line
        console.log(url)
        return axios.put(url,data);
    }

    updateDataByID(data) {
        const url = `${this.apiUrl}/${data.id}`;
        // eslint-disable-next-line
        console.log(url)
        return axios.put(url,data);
    }

    deleteDataBy(data, param){
        const url = `${this.apiUrl}/${param}`;
        // eslint-disable-next-line
        console.log(url)
        return axios.delete(url,data);
    }

    deleteDataByID(data) {
        const url = `${this.apiUrl}/${data.id}`;
        // eslint-disable-next-line
        console.log(url)
        return axios.delete(url,data);
    }

}