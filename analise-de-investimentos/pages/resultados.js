import { useEffect, useState, useContext } from "react";
import { withRouter, useRouter } from "next/router";
import Image from "next/image";
import { useForm, useFieldArray } from "react-hook-form";
import styles from "../styles/Home.module.css";
import { InvestimentosContext } from "../context/InvestimentosContext";
import { calcPaybackMedio } from "../utils/calcs";
import LeftArrow from "../public/left-arrow.svg";
import TabelaPaybackMedio from "../components/TabelaPaybackMedio";

function Resultados(props) {
  const router = useRouter();
  const { state, dispatch, resetState } = useContext(InvestimentosContext);
  const { paybackMedio, paybackMedioYear, paybackEfetivo, paybackEfetivoYear } = state;

  console.log('paybackMed', paybackMedio)

  useEffect(() => {
    if (!props.router || isNaN(state.numInvestimentos)) {
      router.push("/");
    }
  }, [router, props.router, state]);
  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  console.log("allValues", watch());

  const onSubmit = (data) => {};

  const saveAnalysis = async () => {
    setIsSubmitting(true);

    const nomeRelatorio = window.prompt("Nome do relatório:");
    try {
      if (nomeRelatorio) {
        const response = await fetch("/api/salvarAnalise", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...state, nome: nomeRelatorio }),
        });

        const data = await response.json();

        if (data === "Saved") {
          const shouldReturn = confirm(
            "Relatório salvo. Deseja voltar a tela inicial?"
          );
          if (shouldReturn) reset();
        }
      }
      setIsSubmitting(false);
    } catch (error) {
      alert("Não foi possível salvar o relatório! Tente novamente.");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div>
        <h2 className="bold text-lg text-center">Payback Médio</h2>
        <TabelaPaybackMedio />

        {/* <h2 className="bold text-lg text-center mt-6">POE</h2>
        <TabelaPoe />

        <h2 className="bold text-lg text-center mt-6">VEIP</h2>
        <TabelaVeip /> */}
      </div>
    </>
  );
}

export default withRouter(Resultados);
