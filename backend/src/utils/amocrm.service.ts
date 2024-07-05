import { Injectable } from '@nestjs/common';
import { leadResponse } from 'src/types/leadResponse';
import LeadFactory from '../classes/LeadFactory';
import AmocrmRequestsService from './amocrmRequests.service';

@Injectable()
export default class AmocrmService {
  private leadFactory: LeadFactory;

  constructor(private amocrmRequestsService: AmocrmRequestsService) {
    this.leadFactory = new LeadFactory(amocrmRequestsService);
  }

  async getLeads(query?: string) {
    const filtering = query ? `&query=${query}` : '';
    const leadUrl = `/leads?with=contacts${filtering}`;
    const result = await this.amocrmRequestsService.makeRequest(leadUrl, 'GET');
    if (!result) return [];

    const leadsData: leadResponse[] = result._embedded.leads;

    const leadsPromises = leadsData.map((lead) =>
      this.leadFactory.prepareLead(lead),
    );
    return Promise.all(leadsPromises);
  }
}
