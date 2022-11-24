import { useEffect, useState, useContext } from "react";
import { withRouter, useRouter } from "next/router";
import Image from "next/image";
import { useForm, useFieldArray } from "react-hook-form";
import styles from "../styles/Home.module.css";
import { InvestimentosContext } from "../context/InvestimentosContext";
import { calcPaybackMedio } from "../utils/calcs";
import LeftArrow from "../public/left-arrow.svg";
import TabelaPaybackMedio from "../components/TabelaPaybackMedio";
import TabelaPaybackEfetivo from "../components/TabelaPaybackEfetivo";
import TabelaPaybackAjustado from "../components/paybackAjustado";
import TabelaVPL from "../components/TabelaVPL";

function Resultados(props) {
  const router = useRouter();
  const { state, resetState } = useContext(InvestimentosContext);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!props.router) {
      router.push("/");
    }
  }, [router, props.router]);
  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const onSubmit = data => {};

  const reset = () => {
    resetState();
    router.push("/");
  };

  const saveAnalysis = async () => {
    setIsSubmitting(true);

    // const nomeRelatorio = window.prompt("Nome do relatório:");

    // console.log("{ ...state, nome: nomeRelatorio }", {
    //   ...state,
    //   nome: nomeRelatorio,
    // });

    try {
      // if (nomeRelatorio) {
      //   const response = await fetch("/api/salvarInvestimento", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ ...state, nome: nomeRelatorio }),
      //   });

      //   const data = await response.json();

      //   if (data === "Saved") {
      //     const shouldReturn = confirm(
      //       "Relatório salvo. Deseja voltar a tela inicial?"
      //     );
      //     if (shouldReturn) reset();
      //   }
      // }
      window.print();
      setIsSubmitting(false);
    } catch (error) {
      alert("Não foi possível salvar o relatório! Tente novamente.");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center py-10">
        <h2 className="bold text-lg text-center">Payback Médio</h2>
        <TabelaPaybackMedio />

        <h2 className="bold text-lg text-center mt-16">Payback Efetivo</h2>
        <TabelaPaybackEfetivo />

        <h2 className="bold text-lg text-center mt-16">Payback Ajustado</h2>
        <TabelaPaybackAjustado />

        <h2 className="bold text-lg text-center mt-16">VPL</h2>
        <TabelaVPL />

        <p className="text-lg text-center mt-6">
        <strong>Melhor investimento geral:</strong> Investimento {state.melhorInvestimento + 1}{" "}
        (maior quantidade de indicadores positivos)
      </p>
      </div>

      <div className="w-56 my-10 items-center mx-auto">
        {!state.id && (
          <button
            type="submit"
            className="border rounded border-green-500 bg-green-500 disabled:bg-green-300 text-white text-center text-sm w-full mt-2 p-2 print:hidden"
            onClick={saveAnalysis}
            disabled={isSubmitting}
          >
            Salvar análise
          </button>
        )}
        <button
          type="submit"
          className="border rounded border-red-500 bg-red-500 disabled:bg-red-300 text-white text-center text-sm w-full mt-2 p-2 print:hidden "
          onClick={reset}
          disabled={isSubmitting}
        >
          Voltar ao início
        </button>
      </div>
    </>
  );
}

export default withRouter(Resultados);
