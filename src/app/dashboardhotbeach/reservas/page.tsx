/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { Navbar } from "../components/navbar";
import { InputSingle } from "@/components/ui/input";
import { api, apiAdmin } from "@/services/axios";
import { CotacaoProps, ReservasProps } from "@/types/reservasProps";
import { Button, ButtonComp } from "@/components/ui/button";
import { CreateReservas } from "../components/create_reservas";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Send
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { ModalAlert } from "../components/modalAlert";
// import { SendPDF } from "../components/send_pdf";
import { InfoCotacao } from "../components/info_cotacao";
import Script from "next/script";
import { useRouter, useSearchParams } from "next/navigation";

export default function Reservas() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingIndex, setIsLoadingIndex] = useState(false);
  const [reservas, setReservas] = useState<ReservasProps[]>([]);
  const [reservaSelected, setReservaSelected] = useState<CotacaoProps | null>(
    null
  );
  const [reservaAlterSelected, setReservaAlterSelected] =
    useState<ReservasProps | null>(null);
  const [search, setSearch] = useState("");
  const [showSeeCotacao, setShowSeeCotacao] = useState(false);
  const [showAlterReserva, setShowAlterReserva] = useState(false);
  const [showModalAlterStatus, setShowModalAlterStatus] = useState(false);
  const [statusSelected, setStatusSelected] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownIndex, setShowDropdownIndex] = useState<number | null>();
  const [showSendPDF, setShowSendPDF] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const navigation = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  const searchParams = useSearchParams();

  const hotel = searchParams.get("hotel") || "HOT_BEACH_RESORT";

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
    const interval = setInterval(async () => {
      // confirming online
      handleConfirmOnline();
    }, 2 * 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

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
      let url = `/reservas?page=${page}&pageSize=${rowsPerPage}&hotel=${hotel}`;
      if (search) {
        url += `&valor=${search}`;
      }

      const response = await apiAdmin.get(url);
      if (response.status === 200) {
        const reservas = response.data.reservas;

        setReservas(reservas);
        setTotalPage(response.data.pagination.totalPages);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const alterStatus = async () => {
    setIsLoading(true);
    try {
      const response = await api.put(
        `/reserva/${reservaAlterSelected?.id}/updateStatus`,
        {
          status: statusSelected
        }
      );
      if (response.data) {
        toast.success("Status alterado com sucesso!");
        await fecthReservas();
        setShowModalAlterStatus(false);
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendReserva = async () => {
    setIsLoadingIndex(true);
    try {
      const formData = new FormData();
      formData.append("idReserva", reservaAlterSelected?.id || "");
      formData.append(
        "email",
        reservaAlterSelected?.cotacao?.emailUsuario || ""
      );
      formData.append("hotel", hotel);
      formData.append("title", "RESERVA MABU THERMAS GRAND RESORT");
      const response = await api.post(
        `/enviarPDF/reserva/${reservaAlterSelected?.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      if (response.data) {
        toast.success("Reserva enviada com sucesso!");
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoadingIndex(false);
      setShowSendPDF(false);
    }
  };

  const handleSeeCotacao = () => {
    setShowSeeCotacao(!showSeeCotacao);
  };

  const handleShowAlterReserva = () => {
    setShowAlterReserva(!showAlterReserva);
  };

  const handleShowDropdown = () => {
    setShowDropdown(!showDropdown);
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
            reservas={true}
            sendReservas={false}
            users={false}
          />
          {showSeeCotacao && (
            <InfoCotacao
              cotacao={reservaSelected}
              reserva={reservaAlterSelected}
              handleSeeCotacao={handleSeeCotacao}
            />
          )}
          {showAlterReserva && (
            <CreateReservas
              handleShowModalReservas={handleShowAlterReserva}
              cotacaoAlter={reservaSelected}
              reserva={reservaAlterSelected}
              fecthUsers={fecthReservas}
            />
          )}

          {showModalAlterStatus && (
            <ModalAlert
              title="Você tem certeza que deseja alterar o status da reserva?"
              titleBtnAccept="Alterar"
              onClickCancel={() => {
                setShowModalAlterStatus(false);
                fecthReservas();
              }}
              onClickAceppt={alterStatus}
              isLoading={isLoading}
            />
          )}
          {showSendPDF && (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center px-2 bg-black/50 z-[9999]">
              <div className=" bg-white rounded-xl p-6">
                <h2 className="text-2xl text-center">
                  Deseja enviar a reserva?
                </h2>
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    className="bg-slate-200 text-zinc-600"
                    onClick={() => setShowSendPDF(false)}
                  >
                    Cancelar
                  </Button>
                  <div className="w-32">
                    <ButtonComp
                      text="Enviar"
                      type="button"
                      isLoading={isLoadingIndex}
                      onClick={sendReserva}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="w-full h-full overflow-y-auto no-scrollbar p-6">
            <h2 className="text-slate-200 text-2xl md:mt-0">
              Lista de Reservas -{" "}
              {hotel === "HOT_BEACH_RESORT"
                ? "Hot Beach Resort"
                : hotel === "HOT_BEACH_SUITE"
                ? "Hot Beach Suite"
                : hotel === "JAPARATINGA"
                ? "Japaratinga"
                : "Hot Beach Resort"}
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
                      {hotel === "JAPARATINGA" && (
                        <th className="pb-3 text-center px-6 border-r border-zinc-600">
                          <div className="flex justify-center items-center">
                            Link Checkout
                          </div>
                        </th>
                      )}
                      <th className="pb-3 text-center px-6 border-r border-zinc-600">
                        <div className="flex justify-center items-center">
                          Cotação/Reserva
                        </div>
                      </th>
                      <th className="pb-3 text-center px-6">
                        <div className="flex justify-center items-center">
                          Alterar
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
                            <div
                              className={`relative border p-1 rounded-xl cursor-pointer ${
                                reserva.status === "PENDENTE"
                                  ? "bg-yellow-100 text-zinc-600"
                                  : reserva.status === "CONFIRMADA"
                                  ? "bg-green-100 text-zinc-600"
                                  : reserva.status === "CANCELADA"
                                  ? "bg-red-100 text-zinc-600"
                                  : "border-zinc-400"
                              }`}
                              onClick={() => {
                                setShowDropdownIndex(index);
                                handleShowDropdown();
                                setReservaAlterSelected(reserva);
                              }}
                            >
                              {reserva?.status}

                              {showDropdown && index === showDropdownIndex && (
                                <div className="absolute top-10 left-0 w-full max-h-[200px] max-sm:w-36 no-scrollbar bg-white border border-zinc-200 rounded-xl z-[9999]">
                                  <button
                                    className="w-full text-left text-zinc-600 px-4 py-2 hover:bg-slate-50 bg-transparent rounded-lg"
                                    onClick={() => {
                                      setStatusSelected("PENDENTE");
                                      setShowModalAlterStatus(true);
                                    }}
                                  >
                                    PENDENTE
                                  </button>
                                  <button
                                    className="w-full text-left text-zinc-600 px-4 py-2 hover:bg-slate-50 bg-transparent rounded-lg"
                                    onClick={() => {
                                      setStatusSelected("CONFIRMADA");
                                      setShowModalAlterStatus(true);
                                    }}
                                  >
                                    CONFIRMADA
                                  </button>
                                  <button
                                    className="w-full text-left text-zinc-600 px-4 py-2 hover:bg-slate-50 bg-transparent rounded-lg"
                                    onClick={() => {
                                      setStatusSelected("CANCELADA");
                                      setShowModalAlterStatus(true);
                                    }}
                                  >
                                    CANCELADA
                                  </button>
                                </div>
                              )}
                            </div>
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
                          {hotel === "JAPARATINGA" && (
                            <td className="border-r border-zinc-600 px-3">
                              {reserva?.checkoutUrl ? (
                                <a
                                  href={reserva.checkoutUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:text-blue-300 underline truncate block max-w-[150px]"
                                  title={reserva.checkoutUrl}
                                >
                                  {(() => { try { return new URL(reserva.checkoutUrl).hostname.replace('www.', ''); } catch { return reserva.checkoutUrl; } })()}
                                </a>
                              ) : (
                                <span className="text-zinc-500">Sem Link</span>
                              )}
                            </td>
                          )}
                          <td className="border-r border-zinc-600 px-3">
                            <div className="flex items-center justify-center gap-2">
                              <Button
                                onClick={() => {
                                  setReservaSelected(reserva?.cotacao);
                                  setReservaAlterSelected(reserva);
                                  handleSeeCotacao();
                                }}
                              >
                                Ver
                              </Button>
                              <Button
                                className="p-3"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setReservaAlterSelected(reserva);
                                  setShowSendPDF(true);
                                }}
                              >
                                <Send color="white" />
                              </Button>
                            </div>
                          </td>

                          <td className="px-3">
                            <Button
                              onClick={() => {
                                setReservaSelected(reserva?.cotacao);
                                setReservaAlterSelected(reserva);
                                handleShowAlterReserva();
                              }}
                            >
                              Alterar
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="mt-4 text-center">
                        <td
                          colSpan={10}
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
