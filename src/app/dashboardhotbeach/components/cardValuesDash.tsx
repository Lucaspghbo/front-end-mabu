
"use client"
interface CardValuesDashProps {
    text: string;
    value: number | string;
}

export function CardValuesDash({ text, value }: CardValuesDashProps) {
    return (
        <div className="relative flex flex-col gap-2 w-[140px] md:w-[250px] h-[135px] rounded-xl bg-zinc-700 p-2 pt-5 md:p-6">
            {/* <div className="absolute right-3 top-3 bg-green-400 p-1 rounded-md">
                <span className="text-yellow-500">+ {percentage}%</span>
            </div> */}
            <span className="text-zinc-200 text-sm md:text-lg">{text}</span>
            <strong className="text-zinc-100 text-lg md:text-4xl">{value}</strong>
        </div>
    )
}