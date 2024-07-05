import { leadResponse } from 'src/types/leadResponse';
import { status } from 'src/types/status';
import { contacts } from 'src/types/contacts';

export default class {
  name: string;
  price: number;

  constructor(
    data: leadResponse,
    public status: status,
    public responsible: string,
    public contacts: contacts,
    public createdAt: string,
  ) {
    this.name = data.name;
    this.price = data.price;
  }
}
