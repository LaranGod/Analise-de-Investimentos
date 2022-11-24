import { useEffect, useState, useContext } from "react";
import { withRouter, useRouter } from "next/router";
import { useForm, useFieldArray } from "react-hook-form";
import styles from "../styles/Home.module.css";
import { InvestimentosContext } from "../context/InvestimentosContext";
import {
  calcPaybackEfetivo,
  calcPaybackMedio,
  calcPaybackAjustado,
  calcVPL,
} from "../utils/calcs";
import LeftArrow from "../public/left-arrow.svg";
import Image from "next/image";

function Tabelas(props) {
  const router = useRouter();
  const { state, dispatch, resetState } = useContext(InvestimentosContext);

  const { numInvestimentos, prazosInvestimentos } = state;
  const [generalErrorMsg, setGeneralErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTableSubmitted, setIsTableSubmitted] = useState(false);

  useEffect(() => {
    if (!props.router || isNaN(state.numInvestimentos)) {
      router.push("/");
    }
  }, [router, props.router, state]);

  const newPrazosInvestimentos = prazosInvestimentos.map(prazo => prazo + 1);
  const arrPrazos = newPrazosInvestimentos.map(prazo =>
    Array.from(Array(prazo || 0), (_, i) => i)
  );

  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      investimentos: arrPrazos,
    },
  });
  const { fields: todosInvestimentos } = useFieldArray({
    control,
    name: "investimentos",
  });
  const allValues = watch();

  const reset = () => {
    resetState();
    router.push("/");
  };

  console.log("state tabela", state);

  const onSubmit = data => {
    setGeneralErrorMsg("");
    // const totalCenariosValue = data.cenarios.reduce(
    //   (total, cenario) => total + parseInt(cenario.value, 10),
    //   0
    // );

    // if (totalCenariosValue !== 100) {
    //   setGeneralErrorMsg(
    //     "Total de probabilidades dos cenários deve ser igual a 100!"
    //   );
    //   return;
    // }

    const { investimentos } = data;

    const paybackMedio = calcPaybackMedio(investimentos);
    const paybackEfetivo = calcPaybackEfetivo(investimentos);
    const paybackAjustado = calcPaybackAjustado(investimentos, state.txInternaRetorno);
    const vpl = calcVPL(investimentos, paybackAjustado);
    console.log("paybackMedio", paybackMedio);
    console.log("paybackEfetivo", paybackEfetivo);
    console.log("paybackAjustado", paybackAjustado);
    console.log("vpl", vpl);

    dispatch({
      investimentos,
      paybackMedio,
      paybackEfetivo,
      paybackAjustado,
      vpl,
      isSubmitted: false,
    });
    router.push("/resultados");
  };

  const columnList = ["saida", "entrada"];

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

  console.log("allValues.investimentos", allValues.investimentos);

  return (
    <div className={`bg-gradient-to-r from-indigo-400 to-cyan-300  text-lg`}>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className="bg-gradient-to-r text-center py-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center"
            >
              {!isTableSubmitted ? (
                <div className="flex mx-4 flex-col">
                  {allValues.investimentos.map(
                    (fieldsInvestimento, investimentoIndex) => (
                      <div key={investimentoIndex} className="mt-4">
                        {`Investimento ${investimentoIndex + 1}`}
                        <table className="mx-4 mt-2">
                          <thead className="bg-white border-b">
                            <tr>
                              <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                              >
                                Data
                              </th>
                              <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                              >
                                Saída
                              </th>
                              <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                              >
                                Entrada
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* RENDERIZA INVESTIMENTOS */}
                            {fieldsInvestimento.map((field, fieldIndex) => (
                              <tr
                                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                                key={fieldIndex.id}
                              >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  Ano {fieldIndex}
                                </td>
                                {columnList.map((i, colIndex) => (
                                  <td
                                    className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                                    key={`${field.id}-${fieldIndex}-${colIndex}`}
                                  >
                                    <input
                                      {...register(
                                        `investimentos.${investimentoIndex}.${fieldIndex}.${i}`,
                                        {
                                          required: false,
                                        }
                                      )}
                                      type="number"
                                      className="w-20 text-center"
                                      step="0.1"
                                    />
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )
                  )}
                  <div className="flex gap-2 pb-2 mt-8">
                    <button
                      type="button"
                      className="border rounded border-red-500 bg-red-500 text-white text-sm w-32 mt-2 p-2"
                      onClick={reset}
                    >
                      Voltar
                    </button>
                    <button
                      type="button"
                      className="border rounded border-green-500 bg-green-500 text-white text-sm w-32 mt-2 p-2"
                      onClick={() => setIsTableSubmitted(true)}
                    >
                      Prosseguir
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-[900px] flex items-center flex-col border-4 pt-16 bg-white rounded-xl">
                    <h1 className="mb-10">Fluxo de caixa</h1>
                    {allValues.investimentos.map(
                      (investimento, investimentoIndex) => (
                        <div
                          className="flex flex-col h-80 w-full px-10 items-center border-y-2"
                          key={investimentoIndex}
                        >
                          <div className="mb-8 place-self-start font-bold">{`Investimento ${
                            investimentoIndex + 1
                          }`}</div>
                          {console.log("investimento <<<<", investimento)}
                          <div className="flex h-60 items-center">
                            {investimento.map((field, fieldIndex) => (
                              <div
                                className="mr-20 w-full text-center"
                                key={`${investimentoIndex}-${fieldIndex}`}
                              >
                                {console.log("field <<<<", field)}
                                {field.saida !== "" ? (
                                  <div className="pt-24">
                                    <LeftArrow className="-rotate-90 h-10" />
                                    <div>{field.saida}</div>
                                  </div>
                                ) : (
                                  <div className="pb-24">
                                    <div>{field.entrada}</div>
                                    <LeftArrow className="rotate-90 h-10" />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                    <div className="flex gap-2 pb-2 my-8">
                      <button
                        type="button"
                        className="border rounded border-red-500 bg-red-500 text-white text-sm w-32 mt-2 p-2"
                        onClick={reset}
                      >
                        Voltar
                      </button>
                      <button
                        type="submit"
                        className="border rounded border-green-500 bg-green-500 text-white text-sm w-32 mt-2 p-2"
                      >
                        Prosseguir
                      </button>
                    </div>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Tabelas);
