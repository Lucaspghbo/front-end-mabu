"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { ButtonComp } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { InputForm, InputFormMask, InputSingle } from "@/components/ui/input";
import { api } from "@/services/axios";
import { CotacoesProps } from "@/types/cotacoesProps";
import { CotacaoProps, ReservasProps } from "@/types/reservasProps";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { z } from "zod";
import { ReservasPDF, ReservasPDFProps } from "./pagesPDF/reservas";
import { ButtonComp } from "@/components/ui/button";
import Script from "next/script";

interface CreateReservasProps {
    handleShowModalReservas: (cotacao: CotacoesProps | null) => void
    cotacao?: CotacoesProps | null
    cotacaoAlter?: CotacaoProps | null
    reserva?: ReservasProps | null
    fecthUsers?: () => void
}

const formSchema = z.object({
    name: z.string(),
    email: z.string().optional().nullish().nullable(),
    cpf: z.string(),
    telefone: z.string(),
    pensao: z.string(),
    status: z.string(),
    quantityAcompanhantes: z.string(),
    nameAcompanhantes: z.array(z.string()),
    aditional: z.string(),
    priceAditional: z.string().optional().nullish().nullable(),
    checkoutUrl: z.string().optional().nullish().nullable(),
})

export function CreateReservas({
    handleShowModalReservas,
    cotacao,
    cotacaoAlter,
    reserva,
    fecthUsers,
}: CreateReservasProps) {
    const [reservaData, setReservaData] = useState<ReservasPDFProps | null>(null);
    const navigation = useRouter();
    const lightInput = "bg-gray-50 text-zinc-800 border-zinc-300 placeholder:text-zinc-400";

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            cpf: "",
            telefone: "",
            status: "PENDENTE",
            pensao: "Café da Manha",
            quantityAcompanhantes: "",
            nameAcompanhantes: [],
            aditional: "",
            priceAditional: "",
            checkoutUrl: "",
        }
    })

    useEffect(() => {
        if (cotacaoAlter) {
            form.setValue('cpf', String(reserva?.rgCPF));
            form.setValue('name', String(reserva?.cotacao?.nomeUsuario));
            form.setValue('email', String(reserva?.cotacao?.emailUsuario));
            form.setValue('telefone', String(reserva?.telefone));
            form.setValue('status', String(reserva?.status));
            switch (reserva?.opcao) {
                case 'precoCafeDaManha':
                    form.setValue('pensao', 'Café da Manha');
                    break;
                case 'precoCafeEJantar':
                    form.setValue('pensao', 'Café e Jantar');
                    break;
                default:
                    form.setValue('pensao', 'Pensão Completa');
                    break;
            }
            form.setValue('quantityAcompanhantes', String(reserva?.quantidadeDeAcompanhantes));
            form.setValue('nameAcompanhantes', reserva?.reservaAcompanhante || []);
            form.setValue('aditional', String(reserva?.adicional));
            form.setValue('priceAditional', String(reserva?.valorAdicional));
            form.setValue('checkoutUrl', reserva?.checkoutUrl || '');
        }
    }, [cotacaoAlter, form, reserva?.adicional, reserva?.cotacao?.emailUsuario, reserva?.cotacao?.nomeUsuario, reserva?.opcao, reserva?.valorAdicional, reserva?.quantidadeDeAcompanhantes, reserva?.reservaAcompanhante, reserva?.rgCPF, reserva?.status, reserva?.telefone, reserva?.checkoutUrl]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            let opcao = ''
            let status = ''
            let value: any = ''
            switch (values.pensao) {
                case 'Café da Manha':
                    opcao = 'precoCafeDaManha'
                    value = cotacao?.precoCafeDaManha
                    break;
                case 'Café e Jantar':
                    opcao = 'precoCafeEJantar'
                    value = cotacao?.precoCafeEJantar
                    break;
                default:
                    opcao = 'precoPensaoCompleta'
                    value = cotacao?.precoPensaoCompleta
                    break;
            }
            switch (values.status) {
                case 'CONFIRMADO':
                    status = 'CONFIRMADA'
                    break;
                case 'CANCELADA':
                    status = 'CANCELADA'
                    break;
                default:
                    status = 'PENDENTE'
                    break;
            }
            const cpfFormatted = values.cpf.replace(/[^0-9]/g, '');
            const telephoneFormatted = values.telefone.replace(/[^0-9]/g, '');
            let priceAditionalFormatted = 0
            if (values.priceAditional) {
                priceAditionalFormatted = Number(values.priceAditional.replace(/\D/g, "")) / 100;
            }
            let response: any
            if (cotacaoAlter) {
                response = await api.put(`/reserva/${reserva?.id}`, {
                    nomeUsuario: values.name,
                    emailUsuario: '',
                    rgCPF: values.cpf,
                    telefone: values.telefone,
                    quantidadeDeAcompanhantes: Number(values.quantityAcompanhantes),
                    adicional: values.aditional,
                    valorAdicional: Number(priceAditionalFormatted),
                    cotacaoId: cotacao?.id,
                    status,
                    opcao: opcao,
                    reservaAcompanhante: values.nameAcompanhantes,
                    checkoutUrl: values.checkoutUrl || null,
                });
            } else {
                response = await api.post('/reserva', {
                    rgCPF: cpfFormatted,
                    telefone: telephoneFormatted,
                    quantidadeDeAcompanhantes: Number(values.quantityAcompanhantes),
                    adicional: values.aditional,
                    valorAdicional: Number(priceAditionalFormatted),
                    cotacaoId: cotacao?.id,
                    status: status,
                    opcao: opcao,
                    reservaAcompanhante: values.nameAcompanhantes,
                    checkoutUrl: values.checkoutUrl || null,
                });
            }
            if (response.data.status) {
                if (cotacaoAlter && fecthUsers) {
                    toast.success("Reserva alterada com sucesso!");
                    fecthUsers();
                    handleShowModalReservas(null);
                } else {
                    setReservaData({
                        name: values.name,
                        bedrooms: String(cotacao?.quantidadeDeQuartos),
                        guests: String(`${values?.quantityAcompanhantes} adultos ${cotacao?.criancas !== undefined && cotacao?.criancas > 0 ? `+ ${cotacao?.criancas}` : ''}`),
                        pensao: values.pensao,
                        aditional: values.aditional,
                        datas: String(cotacao?.checkIn?.slice(0, 5) + " Á " + cotacao?.checkOut?.slice(0, 5)),
                        value: String(`${value?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} (SEM TAXAS A SEREM COBRADAS)`),
                    })
                    // handleDownloadPDF();
                    toast.success("Reserva criada com sucesso!");
                    navigation.push("/dashboard/reservas");
                }
            }
        } catch (error: any) {
            toast.error(error.response.data.message || error.response.data.error);
            console.log(error);
        }
    }

    return (
        <div className="w-full h-screen absolute top-0 left-0 px-2 flex items-center justify-center bg-black/50 z-[9999]">
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.js"
                strategy="afterInteractive"
            />
            <ToastContainer theme="dark" />
            <div className="hidden">
                <ReservasPDF
                    name={reservaData?.name || ""}
                    bedrooms={reservaData?.bedrooms || ""}
                    guests={reservaData?.guests || ""}
                    pensao={reservaData?.pensao || ""}
                    aditional={reservaData?.aditional || ""}
                    datas={reservaData?.datas || ""}
                    value={reservaData?.value || ""}
                />
            </div>
            <div className="w-full max-w-3xl max-sm:max-h-[90vh] max-h-[93vh] p-6 bg-white rounded-lg shadow-lg overflow-y-auto no-scrollbar z-10">
                <div className="flex items-center justify-between">
                    <h2 className="text-zinc-700 text-2xl font-semibold">{cotacaoAlter ? "Alterar Reserva" : "Criar Reserva"}</h2>
                    <X
                        className="text-zinc-700 cursor-pointer"
                        onClick={() => handleShowModalReservas(null)}
                        size={26}
                    />
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InputForm
                                labelColor="text-zinc-500"
                                className={lightInput}
                                control={form.control}
                                name="name"
                                label="Nome"
                                placeholder="Nome"
                            />
                            {cotacaoAlter &&
                                <InputForm
                                    labelColor="text-zinc-500"
                                    className={lightInput}
                                    control={form.control}
                                    name="email"
                                    label="E-mail"
                                    placeholder="E-mail"
                                />}
                            <InputFormMask
                                mask="999.999.999-99"
                                labelColor="text-zinc-500"
                                className={lightInput}
                                control={form.control}
                                name="cpf"
                                label="CPF"
                                placeholder="CPF"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InputFormMask
                                mask="(99) 99999-9999"
                                labelColor="text-zinc-500"
                                className={lightInput}
                                control={form.control}
                                name="telefone"
                                label="Telefone"
                                placeholder="Telefone"
                            />
                            <FormField
                                control={form.control}
                                name="pensao"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-zinc-500 text-lg">Pensão</FormLabel>
                                        <FormControl>
                                            <select
                                                className="flex h-10 w-full rounded-md border border-zinc-300 bg-gray-50 text-zinc-800 px-3 py-1 text-lg shadow-sm transition-colors"
                                                onChange={(e) => field.onChange(e.target.value)}
                                                value={field.value}
                                            >
                                                <option value="Café da Manha">
                                                    Café da manhã {cotacao ? cotacao?.precoCafeDaManha?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : Number(cotacaoAlter?.precoCafeDaManha)?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                </option>
                                                <option value="Café e Jantar">
                                                    Café e Jantar {cotacao ? cotacao?.precoCafeEJantar?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : Number(cotacaoAlter?.precoCafeEJantar)?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                </option>
                                                <option value="Pensão Completa">
                                                    Pensão Completa {cotacao ? cotacao?.precoPensaoCompleta?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : Number(cotacaoAlter?.precoPensaoCompleta)?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                </option>
                                            </select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <InputForm
                            control={form.control}
                            type="number"
                            labelColor="text-zinc-500"
                            className={lightInput}
                            name="quantityAcompanhantes"
                            label="Quantidade de Acompanhantes"
                            placeholder="Quantidade de Acompanhantes"
                        />

                        <div className="flex flex-wrap gap-4 max-h-[170px] overflow-y-auto">
                            {Array.from({ length: Number(form.watch("quantityAcompanhantes")) }).map((_, index) => (
                                <InputForm
                                    key={index}
                                    labelColor="text-zinc-500"
                                    className={lightInput}
                                    control={form.control}
                                    name={`nameAcompanhantes.${index}`}
                                    label={`Acompanhante ${index + 1}`}
                                    placeholder={`Acompanhante ${index + 1}`}
                                />
                            ))}
                        </div>

                        {form.watch("aditional") !== '' && (
                            <Controller
                                control={form.control}
                                name="priceAditional"
                                render={({ field: { onChange, value } }) => {
                                    const formatCurrency = (val: string) => {
                                        const numericValue = val.replace(/\D/g, "");
                                        const formattedValue = (Number(numericValue) / 100).toLocaleString("pt-BR", {
                                            style: "currency",
                                            currency: "BRL",
                                        });
                                        return formattedValue;
                                    };

                                    return (
                                        <InputSingle
                                            name="priceAditional"
                                            type="text"
                                            label="Valor Adicional"
                                            labelColor="text-zinc-500"
                                            className={lightInput}
                                            placeholder="R$ 0,00"
                                            value={value || ""}
                                            onChange={(e) => {
                                                onChange(formatCurrency(e.target.value));
                                            }}
                                        />
                                    );
                                }}
                            />
                        )}

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-zinc-500 text-lg">Status</FormLabel>
                                    <FormControl>
                                        <select
                                            className="flex h-10 w-full rounded-md border border-zinc-300 bg-gray-50 text-zinc-800 px-3 py-1 text-lg shadow-sm transition-colors"
                                            onChange={(e) => field.onChange(e.target.value)}
                                            value={field.value}
                                        >
                                            <option value="PENDENTE">PENDENTE</option>
                                            <option value="CONFIRMADO">CONFIRMADO</option>
                                            <option value="CANCELADA">CANCELADA</option>
                                        </select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <textarea
                            cols={30}
                            rows={6}
                            placeholder="Adicional"
                            className="placeholder:text-zinc-400 text-zinc-800 bg-gray-50 border border-zinc-300 rounded-md p-2 resize-none"
                            {...form.register("aditional")}
                        ></textarea>

                        <ButtonComp
                            text={`${cotacaoAlter ? 'Alterar Reserva' : 'Criar Reserva'}`}
                            type="submit"
                            isLoading={form.formState.isSubmitting}
                        />
                    </form>
                </Form>
            </div>
        </div>
    );
}
