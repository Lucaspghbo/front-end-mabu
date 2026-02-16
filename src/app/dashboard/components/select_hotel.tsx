"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function SelectHotel() {
  const navigator = useRouter();
  const [currentHotel, setCurrentHotel] = useState<string>("MABU_THERMAS");

  useEffect(() => {
    const hotelFromStorage = localStorage.getItem("hotel") || "MABU_THERMAS";
    setCurrentHotel(hotelFromStorage);
  }, []);

  const handleHotelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const hotel = e.target.value;
    localStorage.setItem("hotel", hotel);
    
    if (hotel === "MABU_THERMAS") {
      navigator.push(`/dashboard/home`);
    } else if (hotel === "HOT_BEACH_RESORT" || hotel === "HOT_BEACH_SUITE" || hotel === "JAPARATINGA") {
      navigator.push(`/dashboardhotbeach/home?hotel=${hotel}`);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <select
          value={currentHotel}
          onChange={handleHotelChange}
          className="h-10 px-6 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="MABU_THERMAS">Mabu Thermas</option>
          <option value="HOT_BEACH_RESORT">Hot Beach Resort</option>
          <option value="HOT_BEACH_SUITE">Hot Beach Suíte</option>
          <option value="JAPARATINGA">Japaratinga</option>
        </select>
      </div>
    </div>
  );
}

