import http from "@/http-common";

class TagDataService {
  getAll() {
    return http.get("/tags");
  }

  get(id) {
    return http.get(`/tags/${id}`);
  }

  create(data) {
    return http.post("/tags", data);
  }

  update(id, data) {
    return http.put(`/tags/update/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tags/delete/${id}`);
  }

  deleteAll() {
    return http.delete(`/tags/delete`);
  }

  findByName(name) {
    return http.get(`/tags`, { params: { name: name } });
  }
}

export default new TagDataService();
