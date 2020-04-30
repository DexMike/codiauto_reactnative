import AgentService from "./AgentService";
// import { request } from 'https';

const PATH = "/c";

class CodiService extends AgentService {
  static async simpleCodi(data) {
    const response = await super.post("/centerprise", data);
    console.log(9, response);
    return (response);
  }
}

export default CodiService;
