import { Injectable } from '@nestjs/common';
import axios from 'axios';

type method = 'GET' | 'POST' | 'DELETE';

@Injectable()
export default class AmocrmRequestsService {
  private username: string;
  private token: string;

  constructor() {
    // Проверка на наличие переменных окружения
    this.username = process.env.AMOCRM_USERNAME;
    if (!this.username)
      throw new Error('Отсутствует имя пользователя в переменной окружения.');
    this.token = process.env.AMOCRM_TOKEN;
    if (!this.token)
      throw new Error('Отсутствует токен в переменной окружения.');
  }

  async makeRequest(url: string, method: method) {
    const headers = { authorization: 'Bearer ' + this.token };
    const fullUrl = `https://${this.username}.amocrm.ru/api/v4${url}`;
    const result = await axios<any>({ url: fullUrl, headers, method });
    return result.data;
  }

  async makeRequestFullUrl(url: string, method: string) {
    const headers = { authorization: 'Bearer ' + this.token };
    const result = await axios<any>({ url, headers, method });
    return result.data;
  }
}
