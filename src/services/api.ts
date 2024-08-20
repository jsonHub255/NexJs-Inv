import axios from 'axios';

const API_BASE_URL = 'https://calm-refuge-29022-6081e5df5b91.herokuapp.com/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchReparations = () => api.get('/reparations');
export const createReparation = (data: any) => api.post('/reparations', data);

export const fetchProducts = () => api.get('/products');
export const createProduct = (data: any) => api.post('/products', data);