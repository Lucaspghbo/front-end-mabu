/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios";

// Configuração básica do axios
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiAdmin = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptador de requests para adicionar o token no cabeçalho de autorização
api.interceptors.request.use(
  async (config: any) => {
    const dataUser = JSON.parse(localStorage.getItem("@data") ?? "{}");
    const token: string = dataUser?.token ?? "";

    if (token) {
      config.headers.Authorization = `${token}`;
    } else {
      console.error("Token não encontrado. Redirecionando...");
      if (config.url !== "/login") {
        window.location.href = "/";
      }
    }

    return config;
  },
  (error: AxiosError) => {
    console.error("Erro no interceptor de requests:", error);
    return Promise.reject(error);
  }
);

// Interceptador de requests para apiAdmin
apiAdmin.interceptors.request.use(
  async (config: any) => {
    const dataUser = JSON.parse(localStorage.getItem("@data") ?? "{}");
    const token: string = dataUser?.token ?? "";

    if (token) {
      config.headers.Authorization = `${token}`;
    } else {
      if (config.url !== "/login") {
        window.location.href = "/";
      }
    }

    return config;
  },
  (error: AxiosError) => {
    console.error("Erro no interceptor de requests para admin:", error);
    return Promise.reject(error);
  }
);
