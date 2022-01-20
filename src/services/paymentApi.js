import api from "./api";

export default class PaymentApi {
  confirmPayment(ticket) {
    return api.post("/payment", ticket);
  }
}
