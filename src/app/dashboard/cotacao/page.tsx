/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Navbar } from "../components/navbar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { InputForm, InputSingle } from "@/components/ui/input";
import { Button, ButtonComp } from "@/components/ui/button";
import { api } from "@/services/axios";
import { useRouter } from "next/navigation";
import { CotacoesProps } from "@/types/cotacoesProps";
import { CreateReservas } from "../components/create_reservas";
import { toast, ToastContainer } from "react-toastify";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  DownloadCloud,
  Edit,
  Send,
  Trash2
} from "lucide-react";
import { ModalAlert } from "../components/modalAlert";
import { CotacaoPDF } from "../components/pagesPDF/cotacao_pdf";
import { SendPDF } from "../components/send_pdf";
import Script from "next/script";
import dayjs from "dayjs";

const formSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  checkin: z.string().min(1, "Check-in é obrigatório"),
  checkout: z.string().min(1, "Check-out é obrigatório"),
  adults: z.string().min(1, "Número de adultos é obrigatório"),
  children: z.string().min(1, "Número de crianças é obrigatório"),
  childrenAge: z.array(z.string()),
  quantityRooms: z.string().min(1, "Quantidade de quartos é obrigatória"),
  breakfastPrice: z.string().min(1, "Preço do café da manhã é obrigatório"),
  breakFastPriceAndLunch: z
    .string()
    .min(1, "Preço do café e jantar é obrigatório"),
  pricePensionComplete: z
    .string()
    .min(1, "Preço da pensão completa é obrigatório"),
  suite: z.string().min(1, "Suíte é obrigatória"),
  porcentagemDesconto: z.number()
});

export default function Cotacao() {
  const [isLoading, setIsLoading] = useState(false);
  const [cotacoes, setCotacoes] = useState<CotacoesProps[]>([]);
  const [cotacaoSelected, setCotacaoSelected] = useState<CotacoesProps | null>(
    null
  );
  const [showModalReserva, setShowModalReserva] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [alterCotacao, setAlterCotacao] = useState(false);
  const [showConfirmSendPDF, setShowConfirmSendPDF] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const navigation = useRouter();
  const descontos = useMemo(
    () => [
      5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
      100
    ],
    []
  );

  const [loggedIn, setLoggedIn] = useState(false);

  const getAllCotacoes = useCallback(async () => {
    try {
      let url = `/cotacoes?page=${page}&pageSize=${rowsPerPage}&hotel=MABU_THERMAS`;
      if (search) {
        url += `&valor=${search}`;
      }

      const response = await api.get(url);
      if (response.status === 200) {
        console.log("🔥 Resposta completa da API:", response.data);
        const reservas = response.data.cotacoes || [];

        setCotacoes(reservas);
        setTotalPage(response.data.pagination.totalPages);
      }
    } catch (error: any) {
      console.log(error);
    }
  }, [page, rowsPerPage, search]);

  useEffect(() => {
    const isRemember = localStorage.getItem("@data");
    if (isRemember) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
      navigation.push("/signin");
    }
  }, [navigation]);

  useEffect(() => {
    handleConfirmOnline();
  }, []);

  useEffect(() => {
    getAllCotacoes();
  }, [page, rowsPerPage, getAllCotacoes]);

  useEffect(() => {
    const interval = setInterval(async () => {
      handleConfirmOnline();
    }, 2 * 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleConfirmOnline = async () => {
    try {
      await api
        .post("/confirmarOnline")
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    } catch (error: any) {
      console.log(error);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      checkin: "",
      checkout: "",
      adults: "",
      children: "",
      quantityRooms: "",
      childrenAge: [],
      breakfastPrice: "",
      breakFastPriceAndLunch: "",
      pricePensionComplete: "",
      suite: "",
      porcentagemDesconto: 30
    }
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const formatDate = (dateString: string) => {
      const [day, month, year] = dateString.split("/"); // "27/01/2025"
      return `${year}-${month}-${day}`; // "2025-01-27"
    };
    if (alterCotacao) {
      form.setValue("name", String(cotacaoSelected?.nomeUsuario));
      form.setValue("email", String(cotacaoSelected?.emailUsuario));
      form.setValue(
        "checkin",
        cotacaoSelected?.checkIn
          ? formatDate(cotacaoSelected.checkIn.split(" ")[0])
          : ""
      );
      form.setValue(
        "checkout",
        cotacaoSelected?.checkOut
          ? formatDate(cotacaoSelected.checkOut.split(" ")[0])
          : ""
      );
      form.setValue("adults", String(cotacaoSelected?.adultos));
      form.setValue("children", String(cotacaoSelected?.criancas));
      form.setValue(
        "quantityRooms",
        String(cotacaoSelected?.quantidadeDeQuartos)
      );
      form.setValue(
        "childrenAge",
        cotacaoSelected?.cotacaoCriancasInfoIdade?.map(String) || []
      );
      form.setValue(
        "breakfastPrice",
        String(cotacaoSelected?.precoCafeDaManha)
      );
      form.setValue(
        "breakFastPriceAndLunch",
        String(cotacaoSelected?.precoCafeEJantar)
      );
      form.setValue(
        "pricePensionComplete",
        String(cotacaoSelected?.precoPensaoCompleta)
      );
      form.setValue("suite", String(cotacaoSelected?.suite || ""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alterCotacao]);

  const quantityChildren = form.watch("children");

  useEffect(() => {
    const isRemember = localStorage.getItem("@data");
    if (!isRemember) {
      navigation.push("/signin");
    }
  }, [navigation]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      let route: any;
      let method: any;
      if (alterCotacao) {
        route = `/cotacao/${cotacaoSelected?.id}`;
        method = api.put;
      } else {
        route = "/cotacao";
        method = api.post;
      }
      const checkin = dayjs(values.checkin).format("DD/MM/YYYY");
      const checkot = dayjs(values.checkout).format("DD/MM/YYYY");
      const breakFast = Number(values.breakfastPrice.replace(/\D/g, "")) / 100;
      const breakFastLunch =
        Number(values.breakFastPriceAndLunch.replace(/\D/g, "")) / 100;
      const pricePensionComplete =
        Number(values.pricePensionComplete.replace(/\D/g, "")) / 100;

      const payload: any = {
        nomeUsuario: values.name,
        emailUsuario: values.email,
        checkIn: checkin,
        checkOut: checkot,
        adultos: Number(values.adults),
        criancas: Number(values.children),
        quantidadeDeQuartos: Number(values.quantityRooms),
        precoCafeDaManha: breakFast,
        precoCafeEJantar: breakFastLunch,
        precoPensaoCompleta: pricePensionComplete,
        cotacaoCriancasInfoIdade: values.childrenAge.map(Number),
        hotel: "MABU_THERMAS",
        suite: values.suite
      };

      const response = await method(route, payload);

      if (response.data) {
        if (alterCotacao) {
          toast.success("Cotação alterada com sucesso!");
        } else {
          setCotacaoSelected(response.data);

          toast.success("Cotação criada com sucesso!");

          setTimeout(() => {
            handleDownloadPDF(response.data?.nomeUsuario || "");
          }, 1000);
        }
        getAllCotacoes();
        setAlterCotacao(false);
        form.reset();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erro desconhecido");
      console.log(error);
    }
  };

  const handleDeleteCotacao = async () => {
    setIsLoading(true);
    try {
      const response = await api.delete(`/cotacao/${cotacaoSelected?.id}`);
      if (response.status === 204) {
        toast.success("Cotação deletada com sucesso!");
        getAllCotacoes();
        handleModalDelete();
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = (name: string) => {
    const html2pdf = window.html2pdf;
    if (html2pdf) {
      const element = document.getElementById("cotacao-pdf");
      if (!element) {
        console.error("Elemento não encontrado!");
        return;
      }

      const options = {
        margin: 2.5,
        filename: `cotacao_mabu_${name}.pdf`,
        image: { type: "jpeg", quality: 1 },
        html2canvas: { dpi: 192, letterRendering: true },
        jsPDF: { unit: "mm", format: "A4", orientation: "portrait" }
      };

      try {
        html2pdf().from(element).set(options).save();
      } catch (error: any) {
        console.error("Erro ao gerar PDF:", error);
        toast.error(
          `Ocorreu um erro ao tentar baixar o PDF. Detalhes: ${error.message}`
        );
      }
    } else {
      console.error("html2pdf não carregado!");
      toast.error("html2pdf não foi carregado corretamente.");
    }
  };

  const handleShowModalReservas = (selectedCotacao: CotacoesProps | null) => {
    setShowModalReserva(!showModalReserva);
    setCotacaoSelected(selectedCotacao);
  };

  const handleModalDelete = () => {
    setShowModalDelete(!showModalDelete);
  };

  const handleShowConfirmSendPDF = () => {
    setShowConfirmSendPDF(!showConfirmSendPDF);
  };

  const firstPage = () => {
    setPage(1);
  };

  const nextPage = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const lastPage = () => {
    setPage(totalPage);
  };

  const suiteOptions = [
    "Master (Adaptado PcD)",
    "Master",
    "Master Thermas",
    "Premium Tropical",
    "Suite Clássica",
    "Suite Tropical",
    "Suite Coca-Cola"
  ];

  return (
    <div className="relative w-full h-screen flex overflow-hidden bg-zinc-800">
      <ToastContainer theme="dark" />
      {loggedIn && (
        <>
          <Script
            src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.js"
            strategy="afterInteractive"
          />
          <Navbar
            home={false}
            cotacao={true}
            sendCotacao={false}
            reservas={false}
            sendReservas={false}
            users={false}
          />

          {showModalReserva && (
            <CreateReservas
              handleShowModalReservas={handleShowModalReservas}
              cotacao={cotacaoSelected}
            />
          )}

          {showModalDelete && (
            <ModalAlert
              title="Tem certeza que deseja excluir essa cotação?"
              titleBtnAccept="Excluir"
              isLoading={isLoading}
              onClickCancel={handleModalDelete}
              onClickAceppt={handleDeleteCotacao}
            />
          )}

          {showConfirmSendPDF && (
            <SendPDF
              reservasSelected={null}
              cotacaoSelected={cotacaoSelected}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              handleShowConfirmSendPDF={handleShowConfirmSendPDF}
            />
          )}

          <div className="hidden">
            <CotacaoPDF cotacaoSelected={cotacaoSelected} />
          </div>

          <div className="w-full h-full p-6 overflow-y-auto no-scrollbar">
            <h2 className="text-slate-200 text-2xl md:mt-0">
              Criar Cotação - Mabu Thermas
            </h2>

            <section className="w-full mt-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-6"
                >
                  <div className="w-full mx-auto max-w-[1400px]">
                    <div className="flex flex-wrap lg:flex-nowrap md:gap-6 items-start mb-2 max-sm:mb-4">
                      {/* Card 1 */}
                      <div className="flex flex-col gap-4 w-full lg:w-1/2">
                        <InputForm
                          control={form.control}
                          type="text"
                          name="name"
                          label="Nome"
                          placeholder="Digite seu nome"
                        />
                        <InputForm
                          control={form.control}
                          type="email"
                          name="email"
                          label="Email"
                          placeholder="Digite seu email"
                        />
                        <div className="flex max-sm:flex-col gap-4">
                          <div className="w-full md:w-1/2">
                            <InputForm
                              control={form.control}
                              type="date"
                              name="checkin"
                              label="Check-in"
                              placeholder="Digite a data de check-in"
                            />
                          </div>
                          <div className="w-full md:w-1/2">
                            <InputForm
                              control={form.control}
                              type="date"
                              name="checkout"
                              label="Check-out"
                              placeholder="Digite a data de check-out"
                            />
                          </div>
                        </div>
                        <InputForm
                          control={form.control}
                          type="number"
                          name="children"
                          label="Crianças"
                          placeholder="Digite a quantidade de crianças"
                        />
                        <div className="flex overflow-x-auto gap-4">
                          {Array.from(
                            { length: Number(quantityChildren) },
                            (_, index) => (
                              <div key={index} className="w-20">
                                <InputForm
                                  control={form.control}
                                  type="number"
                                  name={`childrenAge.${index}`}
                                  label={`Idade ${index + 1}`}
                                  placeholder=""
                                  className="pr-1 text-center"
                                />
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      {/* Card 2 */}
                      <div className="flex flex-col gap-4 w-full lg:w-1/2">
                        <InputForm
                          control={form.control}
                          type="number"
                          name="adults"
                          label="Adultos"
                          placeholder="Digite a quantidade de adultos"
                        />
                        <div className="flex max-sm:flex-col gap-4">
                          <div className="w-full md:w-1/2">
                            <InputForm
                              control={form.control}
                              type="number"
                              name="quantityRooms"
                              label="Quantidade de Quartos"
                              placeholder="Digite a quantidade de Quartos"
                            />
                          </div>
                          <div className="w-full md:w-1/2">
                            {/* Substituir por Select de 5 em 5 até 100% */}
                            <Controller
                              control={form.control}
                              name="porcentagemDesconto"
                              render={({
                                field: { onChange, value },
                                fieldState: { error }
                              }) => (
                                <div className="flex flex-col">
                                  <label className="text-slate-200 text-sm mb-2">
                                    Porcentagem de Desconto
                                  </label>
                                  <select
                                    value={value}
                                    onChange={(e) =>
                                      onChange(Number(e.target.value))
                                    }
                                    className={`h-12 px-3 rounded-md border bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                      error
                                        ? "border-red-500"
                                        : "border-gray-600"
                                    }`}
                                  >
                                    <option
                                      value=""
                                      disabled
                                      className="text-gray-400 italic"
                                    >
                                      Selecione um desconto
                                    </option>
                                    {descontos.map((desconto, index) => (
                                      <option
                                        key={index}
                                        value={Number(desconto)}
                                      >
                                        {desconto}% de desconto
                                      </option>
                                    ))}
                                  </select>
                                  {error && (
                                    <span className="text-red-500 text-sm mt-1">
                                      {error.message}
                                    </span>
                                  )}
                                </div>
                              )}
                            />
                          </div>
                        </div>
                        <div className="flex max-sm:flex-col gap-4">
                          <div className="w-full md:w-1/2">
                            <Controller
                              control={form.control}
                              name="breakfastPrice"
                              render={({ field: { onChange, value } }) => {
                                const formatCurrency = (val: string) => {
                                  const numericValue = val.replace(/\D/g, "");
                                  const formattedValue = (
                                    Number(numericValue) / 100
                                  ).toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL"
                                  });
                                  return formattedValue;
                                };

                                return (
                                  <InputSingle
                                    name="breakfastPrice"
                                    type="text"
                                    label="Café da manhã"
                                    placeholder="R$ 0,00"
                                    value={value}
                                    onChange={(e) => {
                                      onChange(formatCurrency(e.target.value));
                                    }}
                                  />
                                );
                              }}
                            />
                          </div>
                          <div className="w-full md:w-1/2">
                            <Controller
                              control={form.control}
                              name="breakFastPriceAndLunch"
                              render={({ field: { onChange, value } }) => {
                                const formatCurrency = (val: string) => {
                                  const numericValue = val.replace(/\D/g, "");
                                  const formattedValue = (
                                    Number(numericValue) / 100
                                  ).toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL"
                                  });
                                  return formattedValue;
                                };
                                return (
                                  <InputSingle
                                    control={form.control}
                                    type="text"
                                    name="breakFastPriceAndLunch"
                                    label="Café da manhã e Jantar"
                                    placeholder="R$ 0,00"
                                    value={value}
                                    onChange={(e) => {
                                      onChange(formatCurrency(e.target.value));
                                    }}
                                  />
                                );
                              }}
                            />
                          </div>
                        </div>
                        <Controller
                          control={form.control}
                          name="pricePensionComplete"
                          render={({ field: { onChange, value } }) => {
                            const formatCurrency = (val: string) => {
                              const numericValue = val.replace(/\D/g, "");
                              const formattedValue = (
                                Number(numericValue) / 100
                              ).toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL"
                              });
                              return formattedValue;
                            };
                            return (
                              <div className="flex max-sm:flex-col gap-4">
                                <div className="w-full md:w-1/2">
                                  <InputSingle
                                    control={form.control}
                                    type="text"
                                    name="pricePensionComplete"
                                    label="Valor da pensão completa"
                                    placeholder="R$ 0,00"
                                    value={value}
                                    onChange={(e) => {
                                      onChange(formatCurrency(e.target.value));
                                    }}
                                  />
                                </div>
                                <div className="w-full md:w-1/2">
                                  <Controller
                                    control={form.control}
                                    name="suite"
                                    render={({
                                      field: { onChange, value },
                                      fieldState: { error }
                                    }) => {
                                      return (
                                        <div className="flex flex-col">
                                          <label className="text-slate-200 text-sm mb-2">
                                            Suíte
                                          </label>
                                          <select
                                            value={value}
                                            onChange={(e) =>
                                              onChange(e.target.value)
                                            }
                                            className={`h-12 px-3 rounded-md border bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                              error
                                                ? "border-red-500"
                                                : "border-gray-600"
                                            }`}
                                          >
                                            <option
                                              value=""
                                              disabled
                                              className="text-gray-400 italic"
                                            >
                                              Selecione uma suíte
                                            </option>
                                            {suiteOptions.map(
                                              (suite, index) => (
                                                <option
                                                  key={index}
                                                  value={suite}
                                                >
                                                  {suite}
                                                </option>
                                              )
                                            )}
                                          </select>
                                          {error && (
                                            <span className="text-red-500 text-sm mt-1">
                                              {error.message}
                                            </span>
                                          )}
                                        </div>
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                            );
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {alterCotacao && (
                        <Button
                          className="w-1/2 bg-red-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            setAlterCotacao(false);
                            form.reset();
                          }}
                        >
                          Limpar
                        </Button>
                      )}
                      <div className={`${alterCotacao ? "w-1/2" : "w-full"}`}>
                        <ButtonComp
                          type="submit"
                          text={`${
                            alterCotacao ? "Alterar cotação" : "Criar Cotação"
                          }`}
                          isLoading={form.formState.isSubmitting}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </Form>
              <div className="w-full mx-auto max-w-[1400px] mt-6">
                <div className="w-full">
                  <h2 className="text-slate-50 text-xl">Lista de cotações</h2>
                </div>
                <div className="w-full flex items-center justify-between gap-6 mt-4">
                  <InputSingle
                    name="search"
                    type="text"
                    label="Pesquisar"
                    placeholder="Nome ou E-mail"
                    className="w-full md:w-80"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <div className="w-full max-h-[80%] mt-6 overflow-y-auto ">
                  <table className="w-full text-center">
                    <thead className="px-4">
                      <tr className="text-zinc-300 border-b border-zinc-600">
                        <th className="pb-3 text-center px-6 whitespace-nowrap border-r border-zinc-600">
                          Nome
                        </th>
                        <th className="pb-3 text-center px-6 whitespace-nowrap border-r border-zinc-600">
                          E-mail
                        </th>
                        <th className="pb-3 text-center px-6 whitespace-nowrap border-r border-zinc-600">
                          Check-in
                        </th>
                        <th className="pb-3 text-center px-6 whitespace-nowrap border-r border-zinc-600">
                          Checkout
                        </th>
                        <th className="pb-3 text-center px-6 whitespace-nowrap border-r border-zinc-600">
                          Adultos
                        </th>
                        <th className="pb-3 text-center px-6 whitespace-nowrap border-r border-zinc-600">
                          Crianças
                        </th>
                        <th className="pb-3 text-center px-6 whitespace-nowrap border-r border-zinc-600">
                          Idade das crianças
                        </th>
                        <th className="pb-3 text-center px-6 whitespace-nowrap border-r border-zinc-600">
                          Quartos
                        </th>
                        <th className="pb-3 text-center px-6 whitespace-nowrap border-r border-zinc-600">
                          Café da manhã
                        </th>
                        <th className="pb-3 text-center px-6 whitespace-nowrap border-r border-zinc-600">
                          Café/jantar
                        </th>
                        <th className="pb-3 text-center px-6 whitespace-nowrap border-r border-zinc-600">
                          Pensão
                        </th>
                        <th className="pb-3 text-center px-6 whitespace-nowrap border-r border-zinc-600">
                          Suíte
                        </th>
                        <th className="pb-3 text-center px-6 whitespace-nowrap border-r border-zinc-600">
                          Criado em
                        </th>
                        <th className="pb-3 text-center px-6 whitespace-nowrap">
                          Ação
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cotacoes?.length > 0 ? (
                        cotacoes.map((cotacao, index) => (
                          <tr
                            key={cotacao.id || index}
                            className="bg-gray-500 text-zinc-300 h-16 cursor-pointer border-b border-zinc-600"
                            onClick={() => handleShowModalReservas(cotacao)}
                          >
                            <td className="border-r border-zinc-600 px-3">
                              {cotacao?.nomeUsuario}
                            </td>
                            <td className="border-r border-zinc-600 px-3">
                              {cotacao?.emailUsuario}
                            </td>
                            <td className="border-r border-zinc-600 px-3">
                              {cotacao?.checkIn}
                            </td>
                            <td className="border-r border-zinc-600 px-3">
                              {cotacao?.checkOut}
                            </td>
                            <td className="border-r border-zinc-600 px-3">
                              {cotacao?.adultos}
                            </td>
                            <td className="border-r border-zinc-600 px-3">
                              {cotacao?.criancas}
                            </td>
                            <td className="overflow-x-auto border-r border-zinc-600 px-3">
                              {cotacao?.cotacaoCriancasInfoIdade?.map(
                                (idade, index) => (
                                  <span key={index}>
                                    {idade}{" "}
                                    {index !==
                                    cotacao?.cotacaoCriancasInfoIdade?.length -
                                      1
                                      ? ","
                                      : ""}
                                  </span>
                                )
                              )}
                            </td>
                            <td className="border-r border-zinc-600 px-3">
                              {cotacao?.quantidadeDeQuartos}
                            </td>
                            <td className="border-r border-zinc-600 px-3">
                              {cotacao?.precoCafeDaManha?.toLocaleString(
                                "pt-BR",
                                { currency: "BRL", style: "currency" }
                              )}
                            </td>
                            <td className="border-r border-zinc-600 px-3">
                              {cotacao?.precoCafeEJantar?.toLocaleString(
                                "pt-BR",
                                { currency: "BRL", style: "currency" }
                              )}
                            </td>
                            <td className="border-r border-zinc-600 px-3">
                              {cotacao?.precoPensaoCompleta?.toLocaleString(
                                "pt-BR",
                                { currency: "BRL", style: "currency" }
                              )}
                            </td>
                            <td className="border-r border-zinc-600 px-3">
                              {cotacao?.suite || "-"}
                            </td>
                            <td className="border-r border-zinc-600 px-3">
                              {cotacao?.createdAt}
                            </td>
                            <td className="cursor-pointer px-3">
                              <div className="flex items-center gap-2 pr-2">
                                <Button
                                  className="p-2"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCotacaoSelected(cotacao);
                                    handleDownloadPDF(cotacao?.nomeUsuario);
                                  }}
                                >
                                  <DownloadCloud color="white" />
                                </Button>
                                <Button
                                  className="p-2"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCotacaoSelected(cotacao);
                                    handleShowConfirmSendPDF();
                                  }}
                                >
                                  <Send color="white" />
                                </Button>
                                <Button
                                  className="p-2"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCotacaoSelected(cotacao);
                                    setAlterCotacao(true);
                                  }}
                                >
                                  <Edit />
                                </Button>
                                <Button
                                  className="p-2"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleModalDelete();
                                    setCotacaoSelected(cotacao);
                                  }}
                                >
                                  <Trash2 />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr className="relative max-sm:hidden w-full text-center mt-4 h-10">
                          <td
                            colSpan={14}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-50 text-xl"
                          >
                            Nenhuma cotação cadastrado
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {cotacoes?.length > 0 && (
                  <div className="w-full overflow-x-auto flex max-sm:flex-col md:items-center justify-between pb-6 px-4 mt-4 max-sm:mt-1 text-zinc-200">
                    <p className="max-sm:mb-2">
                      Página {page} de {totalPage} - {cotacoes?.length}{" "}
                      registros
                    </p>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <p>
                          Linhas{" "}
                          <span className="max-sm:hidden">por pagina:</span>
                        </p>
                        <select
                          className=" bg-zinc-200 rounded-md text-zinc-500 p-2"
                          onChange={(e) =>
                            setRowsPerPage(Number(e.target.value))
                          }
                        >
                          <option value="20">20</option>
                          <option value="50">50</option>
                          <option value="100">100</option>
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <button
                          disabled={page === 1}
                          className="disabled:opacity-50"
                          onClick={firstPage}
                        >
                          <ChevronsLeft className="h-8 w-8" />
                        </button>
                        <button
                          disabled={page === 1}
                          className="disabled:opacity-50"
                          onClick={prevPage}
                        >
                          <ChevronLeft className="h-8 w-8" />
                        </button>
                        <button
                          disabled={page === totalPage}
                          className="disabled:opacity-50"
                          onClick={nextPage}
                        >
                          <ChevronRight className="h-8 w-8" />
                        </button>
                        <button
                          disabled={page === totalPage}
                          className="disabled:opacity-50"
                          onClick={lastPage}
                        >
                          <ChevronsRight className="h-8 w-8" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
}
