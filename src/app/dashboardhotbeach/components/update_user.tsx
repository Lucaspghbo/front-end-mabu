import { Button, ButtonComp } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { InputForm, InputFormPassword } from "@/components/ui/input"
import { apiAdmin } from "@/services/axios"
import { UsersProps } from "@/types/usersProps"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"

const formSchema = z.object({
    nome: z.string(),
    email: z.string().email(),
    password: z.string().nullable().optional(),
    isAdmin: z.boolean(),
    linkWhatsApp: z.string(),
    hotel: z.enum(["MABU_THERMAS", "HOT_BEACH_RESORT", "HOT_BEACH_SUITE", "JAPARATINGA", "TODOS"]).optional(),
})
export function UpdateUser({
    users,
    handleShowAlterUser,
    fecthUsers,
}
    : {
        users: UsersProps | null,
        handleShowAlterUser: () => void,
        fecthUsers: () => void,
    }) {
    const [checkPassword, setCheckPassword] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {}
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await apiAdmin.put(`/user/${users?.id}`, values);
            if (response.status === 200) {
                toast.success("Usuário atualizado com sucesso!");
                handleShowAlterUser();
                await fecthUsers();
            }
        } catch (error: any) {
            console.log(error);
        }
    }

    useEffect(() => {
        form.setValue("nome", users?.nome || "");
        form.setValue("email", users?.email || "");
        form.setValue("isAdmin", users?.isAdmin || false);
        form.setValue("linkWhatsApp", users?.linkWhatsApp || "");
        form.setValue("hotel", (users?.hotel as "MABU_THERMAS" | "HOT_BEACH_RESORT" | "HOT_BEACH_SUITE" | "JAPARATINGA" | "TODOS") || "HOT_BEACH_RESORT");
    }, [form, users?.email, users?.isAdmin, users?.linkWhatsApp, users?.nome, users?.hotel]);

    return (
        <div className="absolute top-0 left-0 w-full h-screen p-2 overflow-hidden bg-black/50 flex items-center justify-center z-50">
            <div className="w-full max-w-xl bg-zinc-700 p-6 rounded-xl">
                <h2 className="text-slate-50 text-2xl text-center">Atualizar Usuário</h2>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-2 mt-2">
                            <InputForm
                                label="Nome"
                                placeholder="Digite o nome"
                                name="nome"
                            />
                            <InputForm
                                label="Email"
                                placeholder="Digite o email"
                                name="email"
                            />
                            <InputForm
                                label="WhatsApp"
                                placeholder="Digite o WhatsApp"
                                name="linkWhatsApp"
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
                                    type="password"
                                    label="Senha"

                                    placeholder="Digite a senha"
                                    name="password"
                                />
                            )}
                            <div className="flex justify-end mt-2">
                                <div className="w-32">
                                    <Button
                                        className="bg-slate-200 text-zinc-500"
                                        onClick={handleShowAlterUser}
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
    )
}