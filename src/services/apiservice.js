import axios from 'axios';
//const SERVICE_URL = 'http://localhost:3000/api';
const SERVICE_URL = 'http://localhost:3000';
export class APIService {

    apiUrl = '';

    constructor(endpoint) {
        if(endpoint == null) {
            this.apiUrl = `${SERVICE_URL}`;
        } else {
            this.apiUrl = `${SERVICE_URL}/${endpoint}`;
        }
    }

    getData() {
        const url = `${this.apiUrl}`;
        return axios.get(url).then(response => response.data);
    }

    getDataBy(param) {
        const url = `${this.apiUrl}/${param}`;
        return axios.get(url).then(response => response.data);
    }

    insertData(contact) {
        const url = `${this.apiUrl}`;
        return axios.post(url,contact);
    }

    updateDataBy(data, param) {
        const url = `${this.apiUrl}/${param}`;
        return axios.put(url,data);
    }

    updateDataByID(data) {
        const url = `${this.apiUrl}/${data.id}`;
        return axios.put(url,data);
    }

    deleteDataBy(data, param){
        const url = `${this.apiUrl}/${param}`;
        return axios.delete(url,data);
    }

    deleteDataByID(data) {
        const url = `${this.apiUrl}/${data.id}`;
        return axios.delete(url,data);
    }

}