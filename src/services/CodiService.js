import AgentService from "./AgentService";
// import { request } from 'https';

const PATH = "/c";

class CodiService extends AgentService {
  static async simpleCodi(data) {
    const response = await super.post(`${PATH}enterprise`, data);
    return (response);
  }
}

export default CodiService;
