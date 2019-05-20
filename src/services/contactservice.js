import {APIService} from './apiservice';
const ENDPOINT = 'contacts';
export class ContactService extends APIService {

    constructor() {
        super(ENDPOINT);
    }

    getContacts() {
        return super.getData();
    }

    getContactDataByID(id) {
        return super.getDataBy(id);
    }

    addContact(contact) {
        return super.insertData(contact);
    }

    editContact(contact) {
        return super.updateDataByID(contact);
    }

    deleteContact(contact) {
        return super.deleteDataByID(contact);
    }

}