import api from "./api";

export default class EventApi {
  getEventInfo() {
    return api.get("/event");
  }

  getEventsByDay(dayId, userId) {
    return api.get(`/event/${dayId}/${userId}`);
  }

  postUserEvent({ userId, eventId }) {
    const body = {
      userId,
      eventId,
    };

    return api.post("/event/schedule", body);
  }

  updateUserEvent({ userId, eventId }) {
    const body = {
      userId,
      eventId,
    };

    return api.post("/event/schedule/update", body);
  }
}
