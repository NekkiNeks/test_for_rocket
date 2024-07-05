import { leadResponse } from '../types/leadResponse';
import { status } from 'src/types/status';
import Lead from './Lead';
import AmocrmRequestsService from 'src/utils/amocrmRequests.service';

export default class {
  private statusesHashmap: Map<number, status> = new Map();
  private responsibleUsersHashMap: Map<number, string> = new Map();

  constructor(private amocrmRequestsService: AmocrmRequestsService) {}

  async prepareLead(leadData: leadResponse): Promise<Lead> {
    const contactsUrl = leadData._embedded.contacts[0]._links.self.href;
    const contacts = await this.getContacts(contactsUrl);
    const responsibleUser = await this.getResponsibleUser(
      leadData.responsible_user_id,
    );

    const status = await this.getStatus(
      leadData.pipeline_id,
      leadData.status_id,
    );

    const createdAt = new Date(leadData.created_at * 1000);

    return new Lead(
      leadData,
      status,
      responsibleUser,
      contacts,
      createdAt.toLocaleString(),
    );
  }

  async getStatus(pipelineId: number, statusId: number) {
    // Оптимизация запросов статусов
    const savedStatus = this.statusesHashmap.get(statusId);
    if (savedStatus) return savedStatus;

    const url = `/leads/pipelines/${pipelineId}/statuses/${statusId}`;
    const statusData = await this.amocrmRequestsService.makeRequest(url, 'GET');
    const text = statusData.name;
    const color = statusData.color;
    const status = { text, color };

    this.statusesHashmap.set(statusId, status);
    return status;
  }

  async getResponsibleUser(userId: number) {
    // Оптимизация запросов пользователей
    const savedUser = this.responsibleUsersHashMap.get(userId);
    if (savedUser) return savedUser;

    const url = `/users/${userId}`;
    const userData = await this.amocrmRequestsService.makeRequest(url, 'GET');
    const responsibleUserName = userData.name;
    this.responsibleUsersHashMap.set(userId, responsibleUserName);
    return responsibleUserName;
  }

  async getContacts(url: string) {
    const contactsData = await this.amocrmRequestsService.makeRequestFullUrl(
      url,
      'GET',
    );
    const phone =
      contactsData?.custom_fields_values[0]?.values[0]?.value || null;
    const email =
      contactsData?.custom_fields_values[1]?.values[0]?.value || null;

    return { phone, email };
  }
}
