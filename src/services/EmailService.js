import AgentService from './AgentService';
// import { request } from 'https';

const PATH = '/m';

class EmailService extends AgentService {
  static async emailOnce(data) {
    const response = await super.post(`${PATH}once`, data);
    return (response);
  }
}

export default EmailService;
