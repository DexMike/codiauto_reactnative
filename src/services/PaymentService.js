import AgentService from './AgentService';

// const PATH = '/payments';

class PaymentService extends AgentService {
  static async getPaymentsByClient(data) {
    const response = await super.post('/platest', data);
    return (response);
  }

  static async getPaymentsByClientTotal(data) {
    const response = await super.post('/platesttotal', data);
    return (response);
  }

  static async getAllPaymentsByClient(data) {
    const response = await super.post('/pall', data);
    return (response);
  }

  static async getAllPaymentsByClientTotal(data) {
    const response = await super.post('/palltotal', data);
    return (response);
  }

  static async updatePayment(data) {
    const response = await super.put('/p', data);
    return (response);
  }

  static async deletePayment(data) {
    const response = await super.delete('/p', data);
    return (response);
  }

  static async createPayment(data) {
    const response = await super.post('/p', data);
    return (response);
  }
}

export default PaymentService;
