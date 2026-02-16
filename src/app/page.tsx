"use client";
import { useEffect, useState } from "react";
import SignIn from "./signin/page";
import HomeDash from "./dashboard/home/page";
import { useRouter } from "next/navigation";
import { api } from "./services/axios";
// import { CotacaoPDF } from "./dashboard/components/pagesPDF/cotacao_pdf";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigation = useRouter();

  useEffect(() => {
    const userDataRaw = localStorage.getItem("@data");
    if (userDataRaw) {
      try {
        const userData = JSON.parse(userDataRaw);
        const hotel = userData.hotel;

        setLoggedIn(true);

        if (hotel === "TODOS") {
          navigation.push("/optionuser");
        } else if (hotel === "MABU_THERMAS") {
          navigation.push("/dashboard/home");
        } else if (hotel === "HOT_BEACH_RESORT") {
          navigation.push("/dashboardhotbeach/home?hotel=HOT_BEACH_RESORT");
        } else if (hotel === "HOT_BEACH_SUITE") {
          navigation.push("/dashboardhotbeach/home?hotel=HOT_BEACH_SUITE");
        } else if (hotel === "JAPARATINGA") {
          navigation.push("/dashboardhotbeach/home?hotel=JAPARATINGA");
        } else {
          navigation.push("/signin");
        }
      } catch {
        setLoggedIn(false);
        navigation.push("/signin");
      }
    } else {
      setLoggedIn(false);
      navigation.push("/signin");
    }
  }, [navigation]);

  useEffect(() => {
    const interval = setInterval(async () => {
      // confirming online
      await api
        .post("/confirmarOnline")
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    }, 3 * 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      {loggedIn ? <HomeDash /> : <SignIn />}
      {/* <CotacaoPDF cotacaoSelected={null} /> */}
    </div>
  );
}
