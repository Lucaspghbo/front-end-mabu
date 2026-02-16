import { ButtonComp } from "@/components/ui/button";
import { api } from "@/services/axios";
import { CotacoesProps } from "@/types/cotacoesProps";
import { ReservasProps } from "@/types/reservasProps";
import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export function SendPDF({
    selectedFile,
    setSelectedFile,
    cotacaoSelected,
    reservasSelected,
    handleShowConfirmSendPDF,
}: {
    selectedFile: any[];
    setSelectedFile: (file: any[]) => void;
    cotacaoSelected: CotacoesProps | null;
    reservasSelected: ReservasProps | null;
    handleShowConfirmSendPDF: () => void;
    reservaId?: string
}) {
    const searchParams = useSearchParams();
    const hotel = searchParams.get("hotel") || "HOT_BEACH_RESORT";
    const [isLoadingPDF, setIsLoadingPDF] = useState(false);

    const handleSendPDFCotacao = async () => {
        if (selectedFile.length === 0) {
            toast.error("Por favor, selecione pelo menos um arquivo PDF.");
            return;
        }
        let route = "";
        const formData = new FormData();
        if (cotacaoSelected) {
            route = '/enviarPDF/cotacao'
            formData.append("idReserva", cotacaoSelected?.id);
            formData.append("email", cotacaoSelected.emailUsuario);
            formData.append("title", "COTAÇÃO HOT BEACH");
            formData.append("hotel", hotel);
        } else {
            route = '/enviarPDF/confirmacaoReserva'
            formData.append("idReserva", reservasSelected?.id || "");
            formData.append("email", reservasSelected?.cotacao?.emailUsuario || "");
            formData.append("title", "CONFIRMAÇÃO DE RESERVA HOT BEACH");
            formData.append("hotel", hotel);
        }

        selectedFile.forEach((file) => {
            formData.append("file", file);
        });
        setIsLoadingPDF(true);
        try {
            const response = await api.post(route, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data) {
                toast.success("PDF enviado com sucesso!");
                handleShowConfirmSendPDF();
            }
            setSelectedFile([]);
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.message || error.response?.data?.error || "Erro ao enviar PDF");
        } finally {
            setIsLoadingPDF(false);
        }
    };

    const handleRemoveFile = (fileName: string) => {
        setSelectedFile(selectedFile.filter((file: any) => file.name !== fileName));
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-2 bg-black/50">
            <div className="bg-white w-full max-w-lg p-6 rounded-xl">
                <div className="w-full flex items-center justify-between">
                    <h2 className="w-full text-zinc-500 text-2xl text-center">
                        {cotacaoSelected ? 'Enviar Cotação' : 'Confirmar Reserva'}
                    </h2>
                    <X onClick={handleShowConfirmSendPDF} cursor="pointer" />
                </div>

                <div className="w-full mt-6 flex flex-col gap-4">
                    <input
                        type="file"
                        multiple
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-zinc-500 file:text-white"
                        onChange={(e) => {
                            const files = e.target.files ? Array.from(e.target.files) : [];
                            const newFiles = [
                                ...selectedFile,
                                ...files.filter((file) => !selectedFile.some((f: any) => f.name === file.name))
                            ];
                            setSelectedFile(newFiles);
                        }}
                    />

                    {/* Exibição dos arquivos selecionados */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        {selectedFile.map((file) => (
                            <div
                                key={file.name}
                                className="flex items-center gap-2 bg-zinc-100 px-3 py-1 rounded-full text-sm"
                            >
                                <span>{file.name}</span>
                                <X
                                    onClick={() => handleRemoveFile(file.name)}
                                    className="cursor-pointer text-red-500"
                                />
                            </div>
                        ))}
                    </div>

                    <ButtonComp
                        text="Enviar"
                        isLoading={isLoadingPDF}
                        onClick={handleSendPDFCotacao}
                    />
                </div>
            </div>
        </div>
    );
}
