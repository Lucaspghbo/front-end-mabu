"use client"
import Image from "next/image";

export interface ReservasPDFProps {
    name: string;
    bedrooms: string;
    guests: string;
    pensao: string;
    aditional: string;
    datas: string;
    value: string;
}

export function ReservasPDF({
    name,
    bedrooms,
    guests,
    pensao,
    aditional,
    datas,
    value,
}: ReservasPDFProps) {
    return (
        <div id="reserva-pdf">
            <div className="w-full h-[297mm] mt-2 font-sans bg-white">
                <header className="flex items-center gap-8 px-10 bg-[#ecebeb]">
                    <Image
                        src="/images/mabu/pdf/logo-header.png"
                        width={720}
                        height={96}
                        alt="Logo Mabu"
                        className="w-[720px] h-[96px] object-cover"
                    />
                </header>

                <main className="w-full">
                    <div className="relative w-full flex items-center justify-center mt-2">
                        <Image
                            src="/images/mabu/recpção.jpg"
                            width={1200}
                            height={500}
                            className="rounded-xl"
                            alt="Recepção Mabu"
                        />
                    </div>

                    <article className="w-full px-4 mt-1">
                        <div className="w-full flex gap-2">
                            <h2 className="text-lg text-[#01245e] font-semibold">Olá,</h2>
                            <h2 className="text-lg font-semibold">{name}</h2>
                        </div>

                        <div className="flex flex-col gap-2 mt-1">
                            <h2 className="text-lg text-[#01245e] font-semibold">
                                Recebemos o seu pedido de reserva para as seguintes observações:
                            </h2>

                            <div className="flex flex-col text-lg font-semibold">
                                <span>Quartos: <span className="text-[#01245e]">{bedrooms}</span></span>
                                <span>Hóspedes: <span className="text-[#01245e]">{guests}</span></span>
                                <span>Pensão: <span className="text-[#01245e]">{pensao}</span></span>
                                <span>Adicional: <span className="text-[#01245e]">{aditional}</span></span>
                                <span>Datas: <span className="text-[#01245e]">{datas}</span></span>
                                <span>Valor: <span className="text-[#01245e]">{value}</span></span>
                            </div>
                            <Image
                                src="/images/mabu/pdf/divisor.png"
                                width={300}
                                height={20}
                                alt="Separador"
                                className="w-full h-5 object-contain"
                            />
                        </div>
                    </article>
                    <div
                        className="w-full flex items-start justify-start flex-col gap-2 px-4 text-sm font-semibold"
                    >
                        <h2 className="text-lg text-[#01245e] font-semibold">INFORMAÇÕES DE PAGAMENTO</h2>
                        <p>
                            Para a sua segurança, nunca realize o PIX caso não apareça o nome da Empresa acima. Todos os pagamentos são mediantes ao nosso CNPJ com o nome Mabu Convention Thermas Resort.
                        </p>
                        <p>
                            Após o pagamento, encaminhe o comprovante de pagamento para o especialista responsável pela sua reserva.
                        </p>
                        <p>
                            Desde já, agradecemos pela sua preferência !!!
                        </p>
                        <div className="flex gap-6 mt-6">
                            <CardImageText
                                alt="bank"
                                image="/images/bank.jpeg"
                                text="PAGAMENTO RECEBIDO DIRETAMENTE PARA INSTITUIÇÃO EM NOME DO NOSSO HOTEL"
                            />
                            <CardImageText
                                alt="bank"
                                image="/images/pix.png"
                                text="PAGAMENTOS VIA PIX COM 15% DESCONTO"
                            />
                            <CardImageText
                                alt="bank"
                                image="/images/carteira.jpeg"
                                text="PAGUE COM CARTÃO EM ATÉ 12X S/JUROS"
                            />
                            <CardImageText
                                alt="bank"
                                image="/images/mala.png"
                                text="RECEBA A SUA RESERVA APÓS A CONFIRMAÇÃO DE  PAGAMENTO"
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export function CardImageText({ image, text, alt }: { image: string; text: string; alt: string }) {
    return (
        <div
            className="w-full max-[25%] text-xs flex flex-col items-center gap-1 p-1 pb-2 rounded-lg"
            style={{
                border: "2px solid #01245e"
            }}
        >
            <Image
                src={image}
                width={500}
                height={500}
                className="w-10 h-10 object-cover rounded-xl"
                alt={alt}
            />
            <p className="text-xs font-semibold text-center">{text}</p>
        </div>
    );
}