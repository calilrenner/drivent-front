import api from "./api";

export default class HotelsApi {
  createOrUpdateReservation(body) {
    return api.post("/rooms", body);
  }
}
