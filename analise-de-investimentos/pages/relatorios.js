import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { InvestimentosContext } from "../context/InvestimentosContext";

export default function Relatorios() {
  const router = useRouter();
  const [relatorios, setRelatorios] = useState([]);

  const { state, dispatch, resetState } = useContext(InvestimentosContext);

  console.log('state', state)

  // useEffect(() => {
  //   if (state.isSubmitted) router.push("/tabelas");
  // }, [router, state.isSubmitted]);

  useEffect(() => {
    fetch(`/api/listarInvestimentos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async result => {
      const data = await result.json();
      setRelatorios(data);
    });
  }, []);

  const abrirRelatorio = id => {
    fetch(`/api/listarInvestimentos/` + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async result => {
      const data = await result.json();
      dispatch(data);
    });
  };

  const reset = () => {
    resetState();
    router.push("/");
  };

  return (
    <main
      className={`flex justify-center items-center flex-col min-h-screen min-w-full p-0 bg-gradient-to-r from-cyan-500 to-blue-500 text-lg`}
    >
      <div className="h-full min-h-[40em] w-full max-w-[40em] flex items-center flex-col border-4 pt-16 bg-white rounded-xl">
        <h1 className="text-md mb-10">Visualizar relatórios</h1>
        <div className="mt-auto mb-auto flex flex-col overflow-y-auto max-h-[20em] w-full text-center">
          {relatorios.map(rel => (
            <button
              key={rel.id}
              onClick={() => abrirRelatorio(rel.id)}
              className="text-black hover:text-blue-500"
            >
              {rel.nome}
            </button>
          ))}
          {!relatorios.length && <h2>Nenhum relatório encontrado!</h2>}
        </div>

        <button
          onClick={reset}
          className="border rounded border-red-500 bg-red-500 text-white text-md w-80 p-2 mb-16 hover:bg-red-600"
        >
          Voltar
        </button>
      </div>
    </main>
  );
}
