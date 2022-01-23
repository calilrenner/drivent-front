import api from "./api";

export default class HotelsApi {
  getHotels() {
    return api.get("/hotels");
  }
}
