import AgentService from './AgentService';
// import { request } from 'https';

const PATH = '/users';

class UserService extends AgentService {
  static async loginUser(email) {
    const response = await super.post(`${PATH}/infol`, email);
    return (response);
  }

  static async checkUser(email) {
    const response = await super.post(`${PATH}/infoc`, email);
    return (response);
  }

  // TODO -> Maybe move this to its own service?
  static async getAusers(data) {
    const response = await super.post('/ausersandpayments', data);
    return (response);
  }

  static async getAusersTotal(data) {
    const response = await super.post('/auserstotal', data);
    return (response);
  }

  static async getOnlyAusers(data) {
    const response = await super.post('/aemployees', data);
    return (response);
  }

  static async getOnlyAusersTotal(data) {
    const response = await super.post('/aemployeestotal', data);
    return (response);
  }

  static async getAusersPayments(data) {
    const response = await super.post('/apayments', data);
    return (response);
  }

  static async updateAuser(data) {
    const response = await super.put('/ausers', data);
    return (response);
  }

  static async deleteAuser(data) {
    const response = await super.delete('/ausers', data);
    return (response);
  }

  static async createAuser(data) {
    const response = await super.post('/ausers', data);
    return (response);
  }
}

export default UserService;
