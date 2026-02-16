"use client";
import { CardValuesDash } from "../components/cardValuesDash";
import { Navbar } from "../components/navbar";
import { useCallback, useEffect, useState } from "react";
import { UserDashboardProps } from "@/types/userDashboardProps";
import { api, apiAdmin } from "@/services/axios";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import { InputSingle } from "@/components/ui/input";
import { ButtonComp } from "@/components/ui/button";
import { UsersProps } from "@/types/usersProps";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

export default function HomeDash() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [dataAdmin, setDataAdmin] = useState<UsersProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [userDashboard, setUserDashboard] = useState<UserDashboardProps | null>(
    null
  );
  const [users, setUsers] = useState<UsersProps[]>([]);
  const [userSelected, setUserSelected] = useState<UsersProps | null>(null);
  const [currentUsers, setcurrentUsers] = useState<UsersProps[]>([]);
  const [search, setSearch] = useState("");
  const [statusSelected, setStatusSelected] = useState("TODOS");
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [loggedIn, setLoggedIn] = useState(false);
  const navigation = useRouter();

  const searchParams = useSearchParams();

  const hotel = searchParams.get("hotel");

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
    if (search !== "") {
      const filteredUsers = currentUsers?.filter(
        (user) =>
          user?.nome?.toLocaleLowerCase().includes(search.toLowerCase()) ||
          user?.email?.toLocaleLowerCase().includes(search.toLowerCase())
      );
      setUsers(filteredUsers);
    } else {
      setUsers(currentUsers);
    }
  }, [currentUsers, search, users]);

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

  const fecthUsers = useCallback(async () => {
    try {
      const response = await apiAdmin.get(`/users?hotel=${hotel}`);
      console.log(response.data);
      if (response.status === 200) {
        setUsers(response.data);
        setcurrentUsers(response.data);
        setTotalPage(1);
        setPage(1);
      }
    } catch (error: any) {
      console.log(error);
    }
  }, [hotel]);

  const fecthDataDashboard = useCallback(async () => {
    try {
      const response = await api.get(
        `/userDashboard?dataInicial=${dataInicial}&dataFinal=${dataFinal}&status=${statusSelected}&hotel=${hotel}`
      );
      if (response.data) {
        setUserDashboard(response.data);
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsLoadingSearch(false);
    }
  }, [dataInicial, dataFinal, statusSelected, hotel]);

  const fecthDataDashboardAdminUsers = useCallback(
    async (userId: string) => {
      setIsLoading(true);
      try {
        const response = await api.get(
          `/dashboard/admin/getUser/${userId}?dataInicial=${dataInicial}&dataFinal=${dataFinal}&status=${statusSelected}&hotel=${hotel}`
        );
        if (response.data) {
          setUserDashboard(response.data);
        }
      } catch (error: any) {
        console.log(error);
      } finally {
        setIsLoading(false);
        setIsLoadingSearch(false);
      }
    },
    [dataInicial, dataFinal, statusSelected, hotel]
  );

  useEffect(() => {
    const data: UsersProps = JSON.parse(localStorage.getItem("@data") ?? "{}");
    if (data?.isAdmin === true) {
      fecthUsers();
      setIsAdmin(true);
      setDataAdmin(data);
      fecthDataDashboardAdminUsers(data.id);
    } else {
      fecthDataDashboard();
    }
    handleConfirmOnline();
  }, [fecthDataDashboard, fecthDataDashboardAdminUsers, fecthUsers, hotel]);

  // const firstPage = () => {
  //     setPage(1);
  // }

  // const nextPage = () => {
  //     if (page < totalPage) {
  //         setPage(page + 1);
  //     }
  // }

  // const prevPage = () => {
  //     if (page > 1) {
  //         setPage(page - 1);
  //     }
  // }

  // const lastPage = () => {
  //     setPage(totalPage);
  // }

  return (
    <div className="relative w-full h-screen flex overflow-hidden bg-zinc-800">
      {loggedIn && (
        <>
          <Navbar
            home={true}
            cotacao={false}
            sendCotacao={false}
            reservas={false}
            sendReservas={false}
            users={false}
          />
          <div className="w-full h-full p-6 overflow-y-auto no-scrollbar">
            <h2 className="text-slate-200 text-2xl md:mt-0">
              Dashboard -{" "}
              {hotel === "HOT_BEACH_RESORT"
                ? "Hot Beach Resort"
                : hotel === "HOT_BEACH_SUITE"
                ? "Hot Beach Suíte"
                : hotel === "JAPARATINGA"
                ? "Japaratinga"
                : "Hot Beach Resort"}
            </h2>

            <div className="flex items-end flex-wrap gap-3 mt-6">
              <div className="w-full max-w-44 max-sm:max-w-full">
                <InputSingle
                  name="dataInicial"
                  label="Data de inicio"
                  type="date"
                  placeholder="Data de inicio"
                  value={dataInicial}
                  onChange={(e) => setDataInicial(e.target.value)}
                />
              </div>
              <div className="w-full max-w-44 max-sm:max-w-full">
                <InputSingle
                  name="dataFinal"
                  label="Data final"
                  type="date"
                  placeholder="Data final"
                  value={dataFinal}
                  onChange={(e) => setDataFinal(e.target.value)}
                />
              </div>
              <div className="w-full max-w-44 max-sm:max-w-full">
                <Select onValueChange={(e) => setStatusSelected(e)}>
                  <SelectTrigger className="bg-zinc-500 text-slate-50 h-10">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TODOS">Todos</SelectItem>
                    <SelectItem value="PENDENTE">Pendentes</SelectItem>
                    <SelectItem value="CONFIRMADA">Confirmadas</SelectItem>
                    <SelectItem value="CANCELADA">Canceladas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:max-w-40">
                <ButtonComp
                  text="Buscar"
                  isLoading={isLoadingSearch}
                  className="h-10"
                  onClick={() => {
                    setIsLoadingSearch(true);
                    if (dataAdmin?.isAdmin === true) {
                      if (userSelected !== null) {
                        fecthDataDashboardAdminUsers(userSelected?.id);
                      } else {
                        fecthDataDashboardAdminUsers(dataAdmin.id);
                      }
                    } else {
                      fecthDataDashboard();
                    }
                  }}
                />
              </div>
            </div>

            {userSelected !== null && (
              <div className="flex gap-3 items-center mt-4">
                <span className="text-zinc-200 text-lg">
                  Usuário filtrado: {userSelected?.nome}
                </span>
                <button
                  className="text-zinc-200 bg-zinc-200/50 p-1 rounded-full"
                  onClick={() => {
                    setUserSelected(null);
                    fecthDataDashboardAdminUsers(dataAdmin?.id || "");
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 mt-6">
              <CardValuesDash
                text="Cotações"
                value={userDashboard?.qtdCotacoes || 0}
              />
              <CardValuesDash
                text="Reservas"
                value={userDashboard?.qtdReservas || 0}
              />
              <CardValuesDash
                text="Pendentes"
                value={userDashboard?.reservasPendentes || 0}
              />
              <CardValuesDash
                text="Confirmadas"
                value={userDashboard?.reservasConfirmadas || 0}
              />
              <CardValuesDash
                text="Cancelados"
                value={userDashboard?.reservasCanceladas || 0}
              />
            </div>

            {/* Gráfico de Evolução */}
            <div className="w-full mt-8 overflow-x-auto">
              <h3 className="text-slate-200 text-xl mb-4">
                Gráfico de Evolução
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={userDashboard?.dadosGrafico || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="data" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="cotacoes"
                    stroke="#f97316"
                    name="Cotações"
                  />
                  <Line
                    type="monotone"
                    dataKey="reservas"
                    stroke="#2563eb"
                    name="Reservas"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {isAdmin && (
              <div className="w-full h-full border-t pt-2">
                <div className="w-full flex items-center justify-between gap-6 mt-8">
                  <InputSingle
                    name="search"
                    type="text"
                    label="Pesquisar"
                    placeholder="Pesquise por Nome ou E-mail"
                    className="w-full md:w-80"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="w-full max-h-[80%] mt-6 overflow-x-auto overflow-y-auto no-scrollbar border-zinc-400">
                  <table className="w-full text-center">
                    <thead>
                      <tr className="text-zinc-300 border-b border-zinc-600">
                        <th className="pb-3 text-center px-6 border-r border-zinc-600">
                          <div className="flex justify-center items-center gap-2">
                            Nome
                          </div>
                        </th>
                        <th className="pb-3 text-center px-6 border-r border-zinc-600">
                          <div className="flex justify-center items-center gap-2">
                            E-mail
                          </div>
                        </th>
                        <th className="pb-3 text-center px-6">
                          <div className="flex justify-center items-center gap-2">
                            Ver dashboard
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users?.length > 0 ? (
                        users.map((user) => (
                          <tr
                            key={user.id}
                            className="bg-gray-500 text-zinc-300 h-16 cursor-pointer border-b border-zinc-600"
                          >
                            <td className="border-r border-zinc-600 px-3">
                              {user?.nome}
                            </td>
                            <td className="border-r border-zinc-600 px-3">
                              {user?.email}
                            </td>
                            <td className="px-3">
                              <div className="flex items-center justify-center">
                                <div className="max-w-36">
                                  <ButtonComp
                                    text="Ver dashboard"
                                    isLoading={
                                      user?.id === userSelected?.id && isLoading
                                    }
                                    onClick={() => {
                                      setUserSelected(user);
                                      fecthDataDashboardAdminUsers(user?.id);
                                    }}
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={3}
                            className="text-center text-slate-50 text-xl py-6"
                          >
                            Nenhum usuário cadastrado
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {users?.length > 0 && (
                  <div className="w-full overflow-x-auto flex max-sm:flex-col md:items-center justify-between pb-6 px-4 mt-4 max-sm:mt-1 text-zinc-200">
                    <p className="max-sm:mb-2">
                      Página {page} de {totalPage} - {users?.length} registros
                    </p>
                    {/* <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <p>Linhas <span className="max-sm:hidden">por pagina:</span></p>
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
                                            <ChevronsLeft className="h-8 w-8"
                                            />
                                        </button>
                                        <button
                                            disabled={page === 1}
                                            className="disabled:opacity-50"
                                            onClick={prevPage}
                                        >
                                            <ChevronLeft className="h-8 w-8"
                                            />
                                        </button>
                                        <button
                                            disabled={page <= totalPage}
                                            className="disabled:opacity-50"
                                            onClick={nextPage}
                                        >
                                            <ChevronRight className="h-8 w-8"
                                            />
                                        </button>
                                        <button
                                            disabled={page === totalPage}
                                            className="disabled:opacity-50"
                                            onClick={lastPage}
                                        >
                                            <ChevronsRight className="h-8 w-8"
                                            />
                                        </button>
                                    </div>
                                </div> */}
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
