import { status } from './status';
import { contacts } from './contacts';

export type lead = {
    status: status;
    responsible: string;
    contacts: contacts;
    createdAt: string;
    name: string;
    price: number;
};
