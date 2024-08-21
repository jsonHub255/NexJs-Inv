import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchReparations = () => api.get('/reparations');
export const createReparation = (data: any) => api.post('/reparations', data);

export const fetchProducts = () => api.get('/products');
export const createProduct = (data: any) => api.post('/products', data);
