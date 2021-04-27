import axios from 'axios';

const baseURL = 'https://randomuser.me/api/';
const api = axios.create({
  baseURL,
  withCredentials: false
});

export interface Paged<T> {
  results: T[];
  info: {
    page: number;
    results: number;
    seed: string;
    version: string;
  };
}

export default api;
