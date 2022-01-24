import api from "./api";

export default class HotelsApi {
  getHotels() {
    return api.get("/hotels");
  }

  findHotel(userId) {
    return api.get(`/hotels/${userId}`);
  }
}
