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

function Resultados(props) {
  const router = useRouter();


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

        <h2 className="bold text-lg text-center mt-16">Payback Efetivo</h2>
        <TabelaPaybackEfetivo />
        {/*
        <h2 className="bold text-lg text-center mt-6">VEIP</h2>
        <TabelaVeip /> */}
      </div>
    </>
  );
}

export default withRouter(Resultados);
