import AgentService from "./AgentService";
// import { request } from 'https';

const PATH = "/ausers";

class UserService extends AgentService {
  static async aLoginUser(data) {
    const response = await super.post("/users/authenticate", data);
    return (response);
  }
}

export default UserService;
