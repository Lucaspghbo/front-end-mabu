/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { Navbar } from "../components/navbar";
import { InputSingle } from "@/components/ui/input";
import { api, apiAdmin } from "@/services/axios";
import { CotacaoProps, ReservasProps } from "@/types/reservasProps";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  DownloadCloud,
  Send
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
// import { SendPDF } from "../components/send_pdf";
import { InfoCotacao } from "../components/info_cotacao";
import { SendPDF } from "../components/send_pdf";
import Script from "next/script";
import { ConfirmReserva } from "../components/pagesPDF/confirm_reserva";
import { useRouter } from "next/navigation";

export default function EnviarReserva() {
  const [reservas, setReservas] = useState<ReservasProps[]>([]);
  const [reservaSelected, setReservaSelected] = useState<CotacaoProps | null>(
    null
  );
  const [reservaSelectedPdf, setReservaSelectedPdf] =
    useState<ReservasProps | null>(null);
  const [search, setSearch] = useState("");
  const [showSeeCotacao, setShowSeeCotacao] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [showConfirmSendPDF, setShowConfirmSendPDF] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any[]>([]);
  const [reservaId, setReservaId] = useState("");

  const navigation = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      // confirming online
      handleConfirmOnline();
    }, 2 * 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

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
    fecthReservas();
    handleConfirmOnline();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, search]);

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

  const fecthReservas = async () => {
    try {
      const queryParams = new URLSearchParams({
        page: String(page),
        pageSize: String(rowsPerPage),
        hotel: "MABU_THERMAS"
      });

      if (search.trim()) {
        queryParams.append("valor", search);
      }

      const response = await apiAdmin.get(
        `/reservas?${queryParams.toString()}`
      );
      if (response.status === 200) {
        setReservas(response.data.reservas);
        setTotalPage(response.data.pagination.totalPages);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleSeeCotacao = () => {
    setShowSeeCotacao(!showSeeCotacao);
  };

  const handleShowConfirmSendPDF = () => {
    setShowConfirmSendPDF(!showConfirmSendPDF);
  };

  const handleDownloadPDF = (name: number) => {
    const html2pdf = window.html2pdf;
    if (html2pdf) {
      const element = document.getElementById("confirm-reserva");
      if (!element) {
        console.error("Elemento não encontrado!");
        return;
      }

      const options = {
        margin: 2.5,
        filename: `confirm_reserva_${name}.pdf`,
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

  return (
    <div className="relative w-full h-screen flex overflow-hidden bg-zinc-800">
      {loggedIn && (
        <>
          <ToastContainer theme="dark" />
          <Script
            src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.js"
            strategy="afterInteractive"
          />
          <Navbar
            home={false}
            cotacao={false}
            sendCotacao={false}
            reservas={false}
            sendReservas={true}
            users={false}
          />
          {showSeeCotacao && (
            <InfoCotacao
              cotacao={reservaSelected}
              handleSeeCotacao={handleSeeCotacao}
            />
          )}

          {showConfirmSendPDF && (
            <SendPDF
              cotacaoSelected={null}
              handleShowConfirmSendPDF={handleShowConfirmSendPDF}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              reservasSelected={reservaSelectedPdf}
              reservaId={reservaId}
            />
          )}

          <div className="hidden">
            <ConfirmReserva reserva={reservaSelectedPdf} />
          </div>
          <div className="w-full h-full overflow-y-auto no-scrollbar p-6">
            <h2 className="text-slate-200 text-2xl md:mt-0">
              Lista de Reservas - Mabu Thermas
            </h2>

            <div className="w-full h-full">
              <div className="w-full flex items-center justify-between gap-6 mt-8">
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

              <div className="w-full max-h-[70%] mt-6 overflow-x-auto overflow-y-auto no-scrollbar">
                <table className="w-full text-center">
                  <thead>
                    <tr className="text-zinc-300 border-b border-zinc-600">
                      <th className="pb-3 text-center px-6 border-r border-zinc-600">
                        <div className="flex justify-center items-center gap-2">
                          Reserva
                        </div>
                      </th>
                      <th className="pb-3 text-center px-6 border-r border-zinc-600">
                        <div className="flex justify-center items-center gap-2">
                          RG/CPF
                        </div>
                      </th>
                      <th className="pb-3 text-center px-6 border-r border-zinc-600">
                        <div className="flex justify-center items-center gap-2">
                          Telefone
                        </div>
                      </th>
                      <th className="pb-3 text-center px-6 border-r border-zinc-600">
                        <div className="flex justify-center items-center gap-2">
                          Status
                        </div>
                      </th>
                      <th className="pb-3 text-center px-6 border-r border-zinc-600">
                        <div className="flex justify-center items-center">
                          Adicional
                        </div>
                      </th>
                      <th className="pb-3 text-center px-6 border-r border-zinc-600">
                        <div className="flex justify-center items-center">
                          Valor adicional
                        </div>
                      </th>
                      <th className="pb-3 text-center px-6 border-r border-zinc-600">
                        <div className="flex justify-center items-center">
                          Data de registro
                        </div>
                      </th>
                      <th className="pb-3 text-center px-6 border-r border-zinc-600">
                        <div className="flex justify-center items-center">
                          Reserva
                        </div>
                      </th>
                      <th className="pb-3 text-center px-6">
                        <div className="flex justify-center items-center">
                          Confimar
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservas?.length > 0 ? (
                      reservas.map((reserva, index) => (
                        <tr
                          key={reserva.id || index}
                          className={`bg-gray-500 text-zinc-300 h-16 border-b border-zinc-600`}
                        >
                          <td className="border-r border-zinc-600 px-3">
                            {reserva?.numeroReserva}
                          </td>
                          <td className="border-r border-zinc-600 px-3">
                            {reserva?.rgCPF}
                          </td>
                          <td className="border-r border-zinc-600 px-3">
                            {reserva?.telefone}
                          </td>
                          <td className="border-r border-zinc-600 px-3">
                            {reserva?.status}
                          </td>
                          <td className="border-r border-zinc-600 px-3">
                            {reserva?.adicional}
                          </td>
                          <td className="border-r border-zinc-600 px-3">
                            {reserva?.valorAdicional?.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL"
                            })}
                          </td>
                          <td className="border-r border-zinc-600 px-3">
                            {reserva?.createdAt}
                          </td>
                          <td className="border-r border-zinc-600 px-3">
                            <div className="flex items-center justify-center gap-2">
                              <Button
                                className="p-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setReservaSelectedPdf(reserva);
                                  handleDownloadPDF(reserva?.numeroReserva);
                                }}
                              >
                                <DownloadCloud color="white" />
                              </Button>
                              <Button
                                onClick={() => {
                                  setReservaSelected(reserva?.cotacao);
                                  handleSeeCotacao();
                                }}
                              >
                                Ver
                              </Button>
                            </div>
                          </td>
                          <td className="px-3">
                            <Button
                              className="p-3"
                              onClick={(e) => {
                                e.stopPropagation();
                                setReservaSelectedPdf(reserva);
                                setReservaId(reserva?.id);
                                handleShowConfirmSendPDF();
                              }}
                            >
                              <Send color="white" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="mt-4 text-center">
                        <td
                          colSpan={7}
                          className="text-center text-slate-50 text-xl"
                        >
                          Nenhuma reserva encontrada
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {reservas?.length > 0 && (
                <div className="w-full overflow-x-auto flex max-sm:flex-col md:items-center justify-between pb-6 px-4 mt-4 max-sm:mt-1 text-zinc-200">
                  <p className="max-sm:mb-2">
                    Página {page} de {totalPage} - {reservas?.length} registros
                  </p>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <p>
                        Linhas{" "}
                        <span className="max-sm:hidden">por pagina:</span>
                      </p>
                      <select
                        className=" bg-zinc-200 rounded-md text-zinc-500 p-2"
                        onChange={(e) => setRowsPerPage(Number(e.target.value))}
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
          </div>
        </>
      )}
    </div>
  );
}
