import axios from "@/http-common";

class PostDataService {
  getAll() {
    return axios.get(`/posts`);
  }

  get(id) {
    return axios.get(`/posts/getpostbyid/${id}`);
  }

  getNewPosts() {
    return axios.get(`/posts/newposts/`);
  }

  getMaxViews() {
    return axios.get(`/posts/maxviews/`);
  }

  create(data) {
    return axios.post("/posts", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  update(id, data) {
    return axios.put(`/posts/update/${id}`, data);
  }

  addView(id, data) {
    return axios.put(`/posts/update/addview/${id}`, data);
  }

  delete(id) {
    return axios.delete(`/posts/delete/${id}`);
  }

  deleteAll() {
    return axios.delete(`/posts/delete`);
  }

  findByTitle(title) {
    return axios.get(`/posts?title=${title}`);
  }

  findByTag(tags) {
    return axios.post(`/posts/getpostsbytags`, {
      tags,
    });
  }
}

export default new PostDataService();
