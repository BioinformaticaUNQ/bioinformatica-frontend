import axios from 'axios';
import EnvKeys from 'config/EnvKeys';
import TokenService from 'services/TokenService';

const BASE_URL = EnvKeys.BACKEND_URL;

function _toBase64 (file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split("base64,")[1]);
        reader.onerror = error => reject(error);
    });
}


export default class FileService {

    constructor() {
        this.tokenService = new TokenService();
    }
    

    upload(uploadId, confirm) {
        const token = this.tokenService.retrieveFromStorage();
        const headers = { Authorization: 'Bearer ' + token };

        return axios.post(`${BASE_URL}/api/contacts/confirm`, { uploadId, confirm }, { headers });
    }


    async process(file, onUploadProgress) {
        const fileConverted = await _toBase64(file);
        const token = this.tokenService.retrieveFromStorage();
        const headers = { Authorization: 'Bearer ' + token };
        const data = {
            inputFile: fileConverted,
            fileName: file.name,
            date: new Date().toISOString()
        };
 
        return axios.post(`${BASE_URL}/api/contacts/upload`, data , { headers, onUploadProgress });
    }


    download(initDate, endDate) {
        const token = this.tokenService.retrieveFromStorage();
        const headers = { Authorization: 'Bearer ' + token };

        return axios.post(`${BASE_URL}/api/contacts/download`, { initDate, endDate } , { headers, responseType: 'blob' });
    }

}