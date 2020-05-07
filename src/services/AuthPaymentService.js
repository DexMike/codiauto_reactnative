import AgentService from "./AgentService";

const PATH = "/au";

class AuthPaymentService extends AgentService {

  static async setPayment(data) {
    const response = await super.put(`${PATH}p`, data);
    return (response);
  }
}

export default AuthPaymentService;
