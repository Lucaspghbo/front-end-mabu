"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChooseUnit() {
  const navigation = useRouter();
  const [showHotBeachOptions, setShowHotBeachOptions] = useState(false);

  useEffect(() => {
    const rawData = localStorage.getItem('@data');

    if (rawData) {
      try {
        const parsed = JSON.parse(rawData);
        const token = parsed.token;

        if (!token) {
          console.error("⚠️ Token não encontrado dentro de @data.");
        } else {

        }
      } catch (e) {
        console.error("Erro ao parsear @data:", e);
      }
    } else {
      console.error("⚠️ @data não encontrado no localStorage.");
    }
  }, []);

  const handleSelect = (unit: string) => {
    if (unit === "mabu") {
      localStorage.setItem("hotel", "MABU_THERMAS");
      navigation.replace("/dashboard/home");
    } else if (unit === "hotbeach") {
      // Mostra as sub-opções do Hot Beach
      setShowHotBeachOptions(true);
    } else if (unit === "hotbeach-resort") {
      localStorage.setItem("hotel", "HOT_BEACH_RESORT");
      navigation.replace("/dashboardhotbeach/home?hotel=HOT_BEACH_RESORT");
    } else if (unit === "hotbeach-suite") {
      localStorage.setItem("hotel", "HOT_BEACH_SUITE");
      navigation.replace("/dashboardhotbeach/home?hotel=HOT_BEACH_SUITE");
    } else if (unit === "japaratinga") {
      localStorage.setItem("hotel", "JAPARATINGA");
      navigation.replace("/dashboardhotbeach/home?hotel=JAPARATINGA");
    }
  };

  const handleBack = () => {
    setShowHotBeachOptions(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          Escolha sua unidade
        </h2>
        {!showHotBeachOptions ? (
          // Menu principal
          <div style={styles.buttonContainer}>
            <button
              style={{ ...styles.button, backgroundColor: "#FF6B00" }}
              onClick={() => handleSelect("mabu")}
            >
              Mabu Thermas
            </button>
            <button
              style={{ ...styles.button, backgroundColor: "#0077FF" }}
              onClick={() => handleSelect("hotbeach")}
            >
              Hot Beach
            </button>
            <button
              style={{ ...styles.button, backgroundColor: "#2E7D32" }}
              onClick={() => handleSelect("japaratinga")}
            >
              Japaratinga
            </button>
          </div>
        ) : (
          // Sub-menu do Hot Beach
          <div style={styles.buttonContainer}>
            <button
              style={{ ...styles.button, backgroundColor: "#0077FF" }}
              onClick={() => handleSelect("hotbeach-resort")}
            >
              Hot Beach Resort
            </button>
            <button
              style={{ ...styles.button, backgroundColor: "#00A8FF" }}
              onClick={() => handleSelect("hotbeach-suite")}
            >
              Hot Beach Suíte
            </button>
            <button
              style={{ ...styles.button, backgroundColor: "#666" }}
              onClick={handleBack}
            >
              ← Voltar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: "100vh",
    backgroundColor: "#1e1e1e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#3a3a3a",
    padding: "40px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 0 15px rgba(0,0,0,0.3)",
    width: "300px",
  },
  title: {
    color: "#fff",
    marginBottom: "24px",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  button: {
    padding: "12px",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
