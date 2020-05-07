import AgentService from "./AgentService";

const PATH = "/p";

class PaymentService extends AgentService {

  static async getDefaultPayment(data) {
    const response = await super.post(`${PATH}default`, data);
    return (response);
  }
}

export default PaymentService;
