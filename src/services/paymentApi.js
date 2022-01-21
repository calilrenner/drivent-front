import api from "./api";

export default class PaymentApi {
  confirmPayment(ticket) {
    return api.post("/payment", ticket);
  }

  findPayment(userId) {
    return api.get(`/payment/${userId}`);
  }
}
