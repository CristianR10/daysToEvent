import { fetchRoadMap } from "@/utils/openai";
import { useState } from "react";

const ChatComponent = () => {
    const [reponse, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handlesGenerate = async () => {
        if (loading) return; 
        setLoading(true);
        try {
            const result = await fetchRoadMap();
            setResponse(result);
        } catch (error) {
            console.error("Erro ao gerar roteiro:", error);
            setResponse("Falha ao gerar roteiro.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button onClick={handlesGenerate} disabled={loading}>
                {loading ? "Carregando..." : "Gerar Roteiro"}
            </button>
            <>{reponse}</>
        </>
    )
}

export default ChatComponent;