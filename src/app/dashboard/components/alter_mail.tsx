import { Button, ButtonComp } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputForm, InputFormPassword } from "@/components/ui/input";
import { apiAdmin } from "@/services/axios";
import { MailConfigProps } from "@/types/MailConfigProps";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const formSchema = z.object({
  nome: z.string(),
  email: z.string().email(),
  senha: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  host: z.string(),
  port: z.string()
});

export function AlterMail({
  handleShowAlterMail,
  mailConfig
}: {
  handleShowAlterMail: () => void;
  mailConfig: MailConfigProps | null;
}) {
  const [checkPassword, setCheckPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {}
  });

  useEffect(() => {
    if (mailConfig) {
      form.setValue("nome", mailConfig?.nome);
      form.setValue("email", mailConfig?.email);
      form.setValue("senha", mailConfig?.senha);
      form.setValue("host", mailConfig?.host);
      form.setValue("port", String(mailConfig?.port));
    }
  }, [form, mailConfig]);

  // Busca sempre a configuração mais atual ao abrir o modal
  useEffect(() => {
    const fetchLatestConfig = async () => {
      try {
        const response = await apiAdmin.get("/emailConfig", {
          params: { hotel: "MABU_THERMAS" }
        });
        if (response.status === 200) {
          const data = response.data as MailConfigProps;
          form.setValue("nome", data?.nome);
          form.setValue("email", data?.email);
          form.setValue("senha", data?.senha);
          form.setValue("host", data?.host);
          form.setValue("port", String(data?.port));
        }
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchLatestConfig();
  }, [form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const port = Number(values.port);
      const formValues = {
        ...values,
        port,
        hotel: "MABU_THERMAS"
      };
      const response = await apiAdmin.post(`/emailConfig`, formValues);
      if (response.status === 200) {
        toast.success("Configurações atualizado com sucesso!");
        // Recarrega os dados para refletir nos inputs sem fechar o modal
        try {
          const refreshed = await apiAdmin.get("/emailConfig", {
            params: { hotel: "MABU_THERMAS" }
          });
          if (refreshed.status === 200) {
            const data = refreshed.data as MailConfigProps;
            form.setValue("nome", data?.nome);
            form.setValue("email", data?.email);
            form.setValue("senha", data?.senha);
            form.setValue("host", data?.host);
            form.setValue("port", String(data?.port));
          }
        } catch (e) {
          console.log(e);
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-screen p-2 overflow-hidden bg-black/50 flex items-center justify-center z-50">
      <div className="bg-zinc-700 w-full max-w-lg p-6 rounded-xl">
        <h2 className="text-slate-50 text-2xl max-sm:text-xl text-center">
          Alterar configurações de e-mail
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 mt-2">
              <InputForm label="Nome" placeholder="Digite o nome" name="nome" />
              <InputForm
                label="Email"
                placeholder="Digite o email"
                name="email"
              />
              <InputForm label="Host" placeholder="Digite o host" name="host" />
              <InputForm label="Port" placeholder="Digite o port" name="port" />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="check-password"
                  className="w-4 h-4"
                  checked={checkPassword}
                  onChange={() => setCheckPassword(!checkPassword)}
                />
                <label
                  htmlFor="check-password"
                  className="text-slate-200 cursor-pointer"
                >
                  Alterar senha?
                </label>
              </div>
              {checkPassword && (
                <InputFormPassword
                  label="Senha"
                  type="password"
                  placeholder="Digite a senha"
                  name="senha"
                />
              )}
              <div className="flex justify-end mt-2">
                <div className="w-32">
                  <Button
                    className="bg-slate-200 text-zinc-500"
                    onClick={handleShowAlterMail}
                  >
                    Cancelar
                  </Button>
                </div>
                <div className="w-32">
                  <ButtonComp
                    text="Salvar"
                    type="submit"
                    isLoading={form.formState.isSubmitting}
                  />
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
