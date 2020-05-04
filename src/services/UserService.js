import AgentService from "./AgentService";
// import { request } from 'https';

const PATH = "/ausers";

class UserService extends AgentService {
  static async aLoginUser(data) {
    const response = await super.post(`${PATH}/infol`, data);
    return (response);
  }
}

export default UserService;
