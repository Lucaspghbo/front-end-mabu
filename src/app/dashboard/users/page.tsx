/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { Navbar } from "../components/navbar";
import {
  InputForm,
  InputFormPassword,
  InputSingle
} from "@/components/ui/input";
import { UsersProps } from "@/types/usersProps";
import { api, apiAdmin } from "@/services/axios";
import dayjs from "dayjs";
import { Button, ButtonComp } from "@/components/ui/button";
import { MailPlus, PlusIcon, Trash2, XIcon } from "lucide-react";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckBoxForm } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { UpdateUser } from "../components/update_user";
import { MailConfigProps } from "@/types/MailConfigProps";
import { AlterMail } from "../components/alter_mail";
import { ModalAlert } from "../components/modalAlert";

export default function Users() {
  const [isLoadingDeleteUser, setIsLoadingDeleteUser] = useState(false);
  const [users, setUsers] = useState<UsersProps[]>([]);
  const [userSelected, setUserSelected] = useState<UsersProps | null>(null);
  const [currentUsers, setcurrentUsers] = useState<UsersProps[]>([]);
  const [mailConfig, setMailConfig] = useState<MailConfigProps | null>(null);
  const [search, setSearch] = useState("");
  const [showCreateNewUser, setShowCreateNewUser] = useState(false);
  // const [page, setPage] = useState(1);
  // const [totalPage, setTotalPage] = useState(1);
  // const [rowsPerPage, setRowsPerPage] = useState(20);
  const navigation = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [showAlterUser, setShowAlterUser] = useState(false);
  const [showAlterMail, setShowAlterMail] = useState(false);
  const [showConfirmDeleteUser, setShowConfirmDeleteUser] = useState(false);
  useEffect(() => {
    const isRemember = JSON.parse(localStorage.getItem("@data") ?? "{}");
    if (isRemember) {
      if (isRemember?.isAdmin) {
        setLoggedIn(true);
      } else {
        navigation.push("/dashboard/home");
      }
    } else {
      setLoggedIn(false);
      navigation.push("/signin");
    }
  }, [navigation]);

  useEffect(() => {
    const interval = setInterval(async () => {
      handleConfirmOnline();
    }, 1 * 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const fetchMailConfig = async () => {
      try {
        const response = await apiAdmin.get("/emailConfig", {
          params: { hotel: "MABU_THERMAS" }
        });
        if (response.status === 200) {
          setMailConfig(response.data);
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchMailConfig();
  }, []);

  useEffect(() => {
    fecthUsers();
    handleConfirmOnline();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (search !== "") {
      const filteredUsers = currentUsers?.filter(
        (user) =>
          (user?.nome?.toLocaleLowerCase().includes(search.toLowerCase()) ||
            user?.email?.toLocaleLowerCase().includes(search.toLowerCase())) &&
          (user?.hotel === "MABU_THERMAS" || user?.hotel === "TODOS")
      );
      setUsers(filteredUsers);
    } else {
      setUsers(currentUsers);
    }
  }, [currentUsers, search]);

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

  const handleDeleteUser = async (userId: string) => {
    setIsLoadingDeleteUser(true);
    try {
      const response = await apiAdmin.delete(`/user/${userId}`);

      // Verificar se a exclusão foi bem-sucedida (status 200 ou 204)
      if (response.status === 200 || response.status === 204) {
        setShowConfirmDeleteUser(false);

        // Aguardar um pouco mais para garantir que a modal seja fechada
        setTimeout(() => {
          toast.success("Usuário deletado com sucesso!");
        }, 300);

        await fecthUsers();
      } else {
        toast.error("Erro inesperado ao deletar usuário");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erro ao deletar usuário");
    } finally {
      setIsLoadingDeleteUser(false);
    }
  };

  const fecthUsers = async () => {
    try {
      const response = await apiAdmin.get("/users", {
        params: { hotel: "MABU_THERMAS" }
      });
      if (response.status === 200) {
        const filteredUsers = response.data;

        setUsers(filteredUsers);
        setcurrentUsers(filteredUsers);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleShowCreateUser = () => {
    setShowCreateNewUser(!showCreateNewUser);
  };

  const handleShowAlterUser = () => {
    setShowAlterUser(!showAlterUser);
  };

  const handleShowAlterMail = () => {
    setShowAlterMail(!showAlterMail);
  };

  const handleShowDeleteUser = () => {
    setShowConfirmDeleteUser(!showConfirmDeleteUser);
  };

  return (
    <div className="relative w-full h-screen flex overflow-hidden bg-zinc-800">
      {loggedIn && (
        <>
          <Navbar
            home={false}
            cotacao={false}
            sendCotacao={false}
            reservas={false}
            sendReservas={false}
            users={true}
          />
          {showCreateNewUser && (
            <CreateNewUser
              handleShowCreateUser={handleShowCreateUser}
              fecthUsers={fecthUsers}
            />
          )}
          {showAlterUser && (
            <UpdateUser
              handleShowAlterUser={handleShowAlterUser}
              users={userSelected}
              fecthUsers={fecthUsers}
            />
          )}
          {showAlterMail && (
            <AlterMail
              mailConfig={mailConfig}
              handleShowAlterMail={handleShowAlterMail}
            />
          )}
          {showConfirmDeleteUser && (
            <ModalAlert
              title="Excluir Usuário"
              description="Tem certeza que deseja excluir o usuário, ao confirmar o processo, o mesmo será excluido permanentemente?"
              titleBtnAccept="Excluir"
              onClickCancel={handleShowDeleteUser}
              onClickAceppt={() => handleDeleteUser(userSelected?.id ?? "")}
              isLoading={isLoadingDeleteUser}
            />
          )}
          <div className="w-full h-full p-6">
            <h2 className="text-slate-200 text-2xl md:mt-0">
              Lista de Usuários
            </h2>

            <div className="w-full h-full p-6 max-sm:p-0 max-sm:pb-6">
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
                <div className="flex items-center gap-3 mt-8">
                  <Button className="p-2" onClick={handleShowAlterMail}>
                    <MailPlus style={{ width: "24px", height: "24px" }} />
                  </Button>
                  <Button className="p-2" onClick={handleShowCreateUser}>
                    <PlusIcon style={{ width: "24px", height: "24px" }} />
                  </Button>
                </div>
              </div>

              <div className="w-full max-h-[80%] mt-6 overflow-x-auto overflow-y-auto no-scrollbar">
                <table className="w-full text-center">
                  <thead>
                    <tr className="text-zinc-300 border-b border-zinc-600">
                      <th className="pb-3 text-center px-6 border-r border-zinc-600">
                        <div className="flex justify-start items-center gap-2">
                          Nome
                        </div>
                      </th>
                      <th className="pb-3 text-center px-6 border-r border-zinc-600">
                        <div className="flex justify-center items-center gap-2">
                          E-mail
                        </div>
                      </th>
                      <th className="pb-3 text-center px-6 border-r border-zinc-600">
                        <div className="flex justify-center items-center gap-2">
                          Admin
                        </div>
                      </th>
                      <th className="pb-3 text-center px-6 border-r border-zinc-600">
                        <div className="flex justify-center items-center gap-2">
                          Data de registro
                        </div>
                      </th>
                      <th className="pb-3 text-center px-6">
                        <div className="flex justify-center items-center gap-2">
                          Ação
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.length > 0 ? (
                      users.map((user, index) => (
                        <tr
                          key={user.id || index}
                          className="bg-gray-500 text-zinc-300 h-16 cursor-pointer border-b border-zinc-600"
                          onClick={() => {
                            setUserSelected(user);
                            handleShowAlterUser();
                          }}
                        >
                          <td className="border-r border-zinc-600 px-3">
                            <div className="flex items-center gap-2 pl-6">
                              <div
                                className={`h-2 w-2 rounded-full ${
                                  user?.isOnline ? "bg-green-500" : "bg-red-500"
                                }`}
                              />{" "}
                              {user?.nome}
                            </div>
                          </td>
                          <td className="border-r border-zinc-600 px-3">
                            {user?.email}
                          </td>
                          <td className="border-r border-zinc-600 px-3">
                            {user?.isAdmin ? "SIM" : "NÃO"}
                          </td>
                          <td className="border-r border-zinc-600 px-3">
                            {dayjs(user?.createdAt).format("DD/MM/YYYY")}
                          </td>
                          <td className="px-3">
                            <div className="flex items-center justify-center">
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setUserSelected(user);
                                  handleShowDeleteUser();
                                }}
                              >
                                <Trash2 />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="mt-4">
                        <td
                          colSpan={4}
                          className="text-center text-slate-50 text-xl"
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
                    Página {1} de {1} - {users?.length} registros
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const schemaUser = z.object({
  nome: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  isAdmin: z.boolean(),
  linkWhatsApp: z
    .string()
    .min(11, { message: "WhatsApp must be at least 10 characters" }),
  hotel: z.enum(["MABU_THERMAS", "HOT_BEACH_RESORT", "HOT_BEACH_SUITE", "JAPARATINGA", "TODOS"])
});
function CreateNewUser({
  handleShowCreateUser,
  fecthUsers
}: {
  handleShowCreateUser: () => void;
  fecthUsers: () => void;
}) {
  const form = useForm<z.infer<typeof schemaUser>>({
    resolver: zodResolver(schemaUser),
    defaultValues: {
      nome: "",
      email: "",
      password: "",
      isAdmin: false,
      hotel: "MABU_THERMAS"
    }
  });

  const onSubmit = async (values: z.infer<typeof schemaUser>) => {
    try {
      const response = await apiAdmin.post("/user", values);
      if (response.status === 201) {
        await fecthUsers();
        handleShowCreateUser();
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="absolute w-full h-screen overflow-hidden p-2 flex items-center justify-center bg-black/50 z-[9999]">
      <div className="w-full max-w-xl p-6 flex flex-col bg-zinc-700 rounded-xl">
        <div className="flex items-center justify-between">
          <h2 className="w-full text-slate-50 text-2xl md:mt-0 text-center">
            Criar novo usuário
          </h2>
          <button onClick={handleShowCreateUser}>
            <XIcon
              style={{ width: "24px", height: "24px" }}
              className="text-slate-50"
            />
          </button>
        </div>
        <Form {...form}>
          <form
            className="flex flex-col gap-3"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <InputForm
              type="text"
              control={form.control}
              name="nome"
              label="Nome"
              placeholder="Digite seu nome"
            />
            <InputForm
              type="text"
              control={form.control}
              name="email"
              label="E-mail"
              placeholder="Digite seu email"
            />
            <InputFormPassword
              type="password"
              control={form.control}
              name="password"
              label="Senha"
              placeholder="Digite sua senha"
            />
            <InputForm
              type="text"
              control={form.control}
              name="linkWhatsApp"
              label="Link do WhatsApp"
              placeholder="Digite o link do WhatsApp"
            />
            <div className="flex flex-col gap-2">
              <label className="text-slate-200 text-sm">Hotel</label>
              <select
                {...form.register("hotel")}
                className="h-10 px-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="MABU_THERMAS">Mabu Thermas</option>
                <option value="HOT_BEACH_RESORT">Hot Beach Resort</option>
                <option value="HOT_BEACH_SUITE">Hot Beach Suíte</option>
                <option value="JAPARATINGA">Japaratinga</option>
                <option value="TODOS">Todos</option>
              </select>
            </div>
            <CheckBoxForm control={form.control} label="Admin?" />

            <ButtonComp
              type="submit"
              text="Criar"
              isLoading={form.formState.isSubmitting}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}
