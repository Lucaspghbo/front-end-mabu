import { useRouter, useSearchParams } from "next/navigation";

export function SelectHotel({ }) {
  const searchParams = useSearchParams();
  const navigator = useRouter();

  const hotel = searchParams.get("hotel");

  const handleHotelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const hotel = e.target.value;
    navigator.push(`/dashboardhotbeach/home?hotel=${hotel}`);
  };

  return (
    <div>
      {(hotel?.includes("HOT_BEACH") || hotel === "JAPARATINGA" || hotel === "MABU_THERMAS") && (
        <div className="flex flex-col gap-4">
          <select
            value={hotel}
            onChange={handleHotelChange}
            className="h-10 px-6 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="HOT_BEACH_RESORT">Hot Beach Resort</option>
            <option value="HOT_BEACH_SUITE">Hot Beach Suíte</option>
            <option value="JAPARATINGA">Japaratinga</option>
            <option value="MABU_THERMAS">Mabu Thermas</option>
          </select>
        </div>
      )}
    </div>
  )
}