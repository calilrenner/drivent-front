import EventApi from "../services/EventApi";
import UserApi from "../services/UserApi";
import AuthApi from "../services/auth";
import CepApi from "../services/CepApi";
import EnrollmentApi from "../services/EnrollmentApi";
import HotelsApi from "../services/HotelsApi";
import PaymentApi from "../services/paymentApi";
import RoomsApi from "../services/RoomsApi";

export default function useApi() {
  return {
    event: new EventApi(),
    user: new UserApi(),
    auth: new AuthApi(),
    cep: new CepApi(),
    enrollment: new EnrollmentApi(),
    hotels: new HotelsApi(),
    payment: new PaymentApi(),
    rooms: new RoomsApi(),
  };
}
