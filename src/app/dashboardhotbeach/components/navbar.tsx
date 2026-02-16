/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { ButtonNav } from "./buttonNav";
import {
  Calendar,
  CalendarCheck,
  Home,
  Menu,
  StickyNote,
  User,
  X,
  CreditCard
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { UserProps } from "@/types/userProps";
import { api } from "@/services/axios"; // axios configurado
import { SelectHotel } from "./select_hotel";

interface NavbarProps {
  home: boolean;
  cotacao: boolean;
  sendCotacao: boolean;
  reservas: boolean;
  sendReservas: boolean;
  users: boolean;
}

export function Navbar({
  home,
  cotacao,
  reservas,
  sendReservas,
  users
}: NavbarProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [widthScreen, setWidthScreen] = useState<number | null>(null);
  const [showMenu, setShowMenu] = useState<boolean>(true);
  const [showModalPagamento, setShowModalPagamento] = useState(false);
  const [selectedHotel, setSelectedHotel] =
    useState<string>("HOT_BEACH_RESORT");

  const searchParams = useSearchParams();

  const hotel = searchParams.get("hotel") || "HOT_BEACH_RESORT";

  const navigate = useRouter();

  const logout = () => {
    localStorage.removeItem("@data");
    navigate.replace("/");
  };

  useEffect(() => {
    const userData = localStorage.getItem("@data");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const handleResize = () => setWidthScreen(window.innerWidth);
    setWidthScreen(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (widthScreen !== null) {
      setShowMenu(widthScreen > 768);
    }
  }, [widthScreen]);

  useEffect(() => {
    setSelectedHotel(hotel);
  }, [hotel]);

  const toggleMenu = () => setShowMenu((prev) => !prev);

  return (
    <>
      <aside
        className={`md:relative absolute top-0 md:w-[434px] ${
          showMenu
            ? "w-[300px] h-full bg-zinc-800 z-[9999]"
            : "w-full h-12 overflow-y-hidden"
        } box-border p-8 border-r border-zinc-700/50 z-10`}
      >
        <div className="block md:hidden absolute top-5 right-4">
          {!showMenu ? (
            <Menu className="text-white" size={32} onClick={toggleMenu} />
          ) : (
            <X className="text-white" size={32} onClick={toggleMenu} />
          )}
        </div>

        <div className={`${showMenu ? "block" : "hidden"}`}>
          <SelectHotel />
        </div>

        <nav
          className={`${
            showMenu ? "flex" : "hidden"
          } md:flex flex-col justify-between mt-6`}
          style={{ height: "calc(100% - 100px)" }}
        >
          <div className="flex flex-col gap-6">
            <ButtonNav
              text="Dashboard"
              to={`/dashboardhotbeach/home?hotel=${selectedHotel}`}
              icon={<Home />}
              param={home}
            />
            <ButtonNav
              text="Cotação"
              to={`/dashboardhotbeach/cotacao?hotel=${selectedHotel}`}
              icon={<StickyNote />}
              param={cotacao}
            />
            <ButtonNav
              text="Reservas"
              to={`/dashboardhotbeach/reservas?hotel=${selectedHotel}`}
              icon={<Calendar />}
              param={reservas}
            />
            <ButtonNav
              text="Enviar Reservas"
              to={`/dashboardhotbeach/enviar-reserva?hotel=${selectedHotel}`}
              icon={<CalendarCheck />}
              param={sendReservas}
            />
            {user?.isAdmin && hotel !== "JAPARATINGA" && (
              <ButtonNav
                text="Pagamento"
                to="#"
                icon={<CreditCard />}
                param={false}
                onClick={() => setShowModalPagamento(true)}
              />
            )}
            {user?.isAdmin && (
              <ButtonNav
                text="Usuários"
                to={`/dashboardhotbeach/users?hotel=${selectedHotel}`}
                icon={<User />}
                param={users}
              />
            )}
          </div>
          <div className="flex flex-col gap-4">
            {user?.hotel === "TODOS" && (
              <Button onClick={() => navigate.push(`/optionuser`)}>
                Menu Inicial
              </Button>
            )}
            <Button onClick={logout}>Sair</Button>
          </div>
        </nav>
      </aside>

      {/* Modal de Pagamento */}
      {showModalPagamento && (
        <div className="fixed inset-0 bg-black/60 z-[99999] flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md relative">
            <h2 className="text-xl font-bold mb-4">Dados de Pagamento</h2>
            <PagamentoModalContent
              onClose={() => setShowModalPagamento(false)}
              showModalPagamento={showModalPagamento}
              hotel={hotel}
            />
            <button
              className="absolute top-3 right-4 text-zinc-600"
              onClick={() => setShowModalPagamento(false)}
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// Modal de Pagamento
function PagamentoModalContent({
  onClose,
  showModalPagamento,
  hotel
}: {
  onClose: () => void;
  showModalPagamento: boolean;
  hotel: string;
}) {
  const [form, setForm] = useState({
    nome: "",
    pix: "",
    nome_setor_financeiro: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!showModalPagamento) return;

    setIsLoading(true);
    setForm({ nome: "", pix: "", nome_setor_financeiro: "" });

    const currentHotel = hotel;

    api
      .get("/dados-pagamento")
      .then((res) => {
        const pagamentoDoHotel = res.data.find(
          (item: any) => item.hotel === currentHotel
        );

        if (pagamentoDoHotel) {
          setForm({
            nome: pagamentoDoHotel.nome,
            pix: pagamentoDoHotel.pix,
            nome_setor_financeiro: pagamentoDoHotel.nome_setor_financeiro
          });
        } else {
          setForm({ nome: "", pix: "", nome_setor_financeiro: "" });
        }
      })
      .catch((error) => {
        console.error("❌ Erro ao carregar dados de pagamento:", error);
        setForm({ nome: "", pix: "", nome_setor_financeiro: "" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [showModalPagamento, hotel]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const payload = { ...form, hotel };

    try {
      await api.post("/dados-pagamento", payload);
      alert("✅ Dados salvos com sucesso!");
      onClose();
    } catch (error) {
      console.error("❌ Erro ao salvar:", error);
      alert("Erro ao salvar os dados.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        type="text"
        name="nome"
        placeholder="Nome"
        value={form.nome}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="pix"
        placeholder="Chave PIX"
        value={form.pix}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="nome_setor_financeiro"
        placeholder="Setor Financeiro"
        value={form.nome_setor_financeiro}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        {isLoading ? "Salvando..." : "Salvar"}
      </button>
    </div>
  );
}
