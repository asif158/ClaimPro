// src/services/api.ts
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND || 'https://claimpro.onrender.com' || 'http://localhost:5000';

const setAuthToken = (token: string | null): void => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Authentication Routes
export const registerUser = async (userData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const loginUser = async (credentials: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Claim Routes
export const submitClaim = async (claimData: FormData, token: string) => {
  setAuthToken(token);
  try {
    const response = await axios.post(`${API_BASE_URL}/claims/submit`, claimData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Submit claim error:", error);
    throw error;
  }
};

export const getClaims = async (token: string) => {
  setAuthToken(token);
  try {
    const response = await axios.get(`${API_BASE_URL}/claims`);
    return response.data;
  } catch (error) {
    console.error("Get claims error:", error);
    throw error;
  }
};

export const getClaimById = async (id: string, token: string) => {
  setAuthToken(token);
  try {
    const response = await axios.get(`${API_BASE_URL}/claims/${id}`);
    return response.data;
  } catch (error) {
    console.error("Get claim by ID error:", error);
    throw error;
  }
};

export const updateClaim = async (id: string, claimData: any, token: string) => {
  setAuthToken(token);
  try {
    const response = await axios.put(`${API_BASE_URL}/claims/${id}`, claimData);
    return response.data;
  } catch (error) {
    console.error("Update claim error:", error);
    throw error;
  }
};

export const getAllClaims = async (token: string) => {
  setAuthToken(token);
  try {
    const response = await axios.get(`${API_BASE_URL}/claims/all`);
    return response.data;
  } catch (error) {
    console.error("Get all claims error:", error);
    throw error;
  }
};