/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { InputForm, InputFormPassword } from "../components/ui/input";
import { Form } from "../components/ui/form";
import { ButtonComp } from "../components/ui/button";
import { api } from "@/services/axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from 'react-toastify';
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const response = await api.post('/login', values);
      if (response.data) {
        const userData = response.data;

        // Garante que o token esteja presente
        if (!userData.token && response.data.token) {
          userData.token = response.data.token;
        }

        // Salva todos os dados
        localStorage.setItem('@data', JSON.stringify(userData));

        // Salva somente o hotel separadamente
        if (userData.hotel) {
          localStorage.setItem("hotel", userData.hotel);
        } else {
          console.error("Nenhum hotel retornado pelo backend");
          toast.error("Erro: Nenhum hotel associado ao usuário.");
          return;
        }

        // Redirecionamento baseado no hotel
        const hotel = userData.hotel;

        if (hotel === "TODOS") {
          navigation.replace('/optionuser');
        } else if (hotel === "MABU_THERMAS") {
          navigation.replace('/dashboard/home');
        } else if (hotel === "HOT_BEACH_RESORT") {
          navigation.replace('/dashboardhotbeach/home?hotel=HOT_BEACH_RESORT');
        } else if (hotel === "HOT_BEACH_SUITE") {
          navigation.replace('/dashboardhotbeach/home?hotel=HOT_BEACH_SUITE');
        } else if (hotel === "JAPARATINGA") {
          navigation.replace('/dashboardhotbeach/home?hotel=JAPARATINGA');
        } else {
          toast.error("Hotel não reconhecido. Contate o administrador.");
        }
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Erro ao fazer login.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-zinc-800 px-2 flex items-center justify-center">
      <div className="w-full max-w-xl bg-zinc-600 p-6 flex flex-col rounded-xl">
        <ToastContainer theme="dark" />
        <h2 className="text-2xl text-slate-50 text-center">Faça login</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <InputForm
              control={form.control}
              type="email"
              name="email"
              label="Email"
              placeholder="Digite seu email"
            />
            <InputFormPassword
              control={form.control}
              type="password"
              name="password"
              label="Senha"
              placeholder="Digite sua senha"
            />
            <div className="flex-1 mt-2">
              <ButtonComp
                type="submit"
                text="Entrar"
                isLoading={isLoading}
              />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
