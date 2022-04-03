import axios from 'axios';

const ApiService = new (class ApiService {
  constructor() {
    this.requester = axios.create({
      baseURL: 'http://localhost:6969/api', // Tavo skynetas
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  async uploadImage(photo) {
    // console.log('pppppppp: ', photo);
    const { uri } = photo;
    const parts = uri.split('/');
    const name = parts[parts.length - 1];
    var data = new FormData();
    data.append('image', { uri, name, type: 'image/jpg' });
    try {
      const { data } = await this.requester.get('/doSomething', data);
      return data;
    } catch (error) {
      return error;
    }
  }
})();

export default ApiService;
