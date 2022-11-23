import { useEffect, useState, useContext } from "react";
import { withRouter, useRouter } from "next/router";
import { useForm, useFieldArray } from "react-hook-form";
import styles from "../styles/Home.module.css";
import { InvestimentosContext } from "../context/InvestimentosContext";
import investimentos from "../pages/investimentos";

function Tabela(props) {
  const router = useRouter();
  const { state, dispatch, resetState } = useContext(InvestimentosContext);

  const { numInvestimentos, prazosInvestimentos } = state;
  const [generalErrorMsg, setGeneralErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);



  useEffect(() => {
    if (
      !props.router ||
      isNaN(state.numInvestimentos)
    ) {
      router.push("/");
    }
  }, [router, props.router, state]);

  const newPrazosInvestimentos = prazosInvestimentos.map((prazo) => prazo + 1)
  const arrPrazos = newPrazosInvestimentos.map((praso) => Array.from(
    Array(praso || 0),
    (_, i) => i + 1
  ));
  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      investimentos: arrPrazos.map((arrPraso) => arrPraso.map(i => ({})))
    }
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

  console.log("state tabela", state)

  const onSubmit = data => {
    setGeneralErrorMsg("");
    const totalCenariosValue = data.cenarios.reduce(
      (total, cenario) => total + parseInt(cenario.value, 10),
      0
    );

    if (totalCenariosValue !== 100) {
      setGeneralErrorMsg(
        "Total de probabilidades dos cenários deve ser igual a 100!"
      );
      return;
    }

    const { investimentos } = data;

    dispatch({ investimentos, isSubmitted: true });
  };

  const columnList = [
    'saida', 'entrada'
  ]
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
    <div className={styles.container}>
      <div className={styles.main}>
        {!state.isSubmitted && (
          <div className="bg-gradient-to-r text-center py-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className=""
            >
            <div className="flex flex-col">
              {
                allValues.investimentos.map((fieldsInvestimento, investimentoIndex) => (
                  <div key={investimentoIndex} className='mt-4'>
                    {`Investimento ${investimentoIndex + 1}`}
                    <table className="mx-4">
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
                                    `investimentos.${investimentoIndex}.${fieldIndex}-${colIndex}.value`,
                                    {
                                      required:
                                        "Investimento não informado!",
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
                ))
              }
            </div>
              <div className="flex gap-2 pb-2 justify-end mr-12 mt-4">
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
                  Concluir
                </button>
              </div>
              {/* {errors.cenarios && (
                <p className="text-md text-red-500 mt-5">
                  Informe todos os cenários!
                </p>
              )}
              {errors.investimentos && (
                <p className="text-md text-red-500 mt-5">
                  Informe todos os investimentos!
                </p>
              )}
              {generalErrorMsg && (
                <p className="text-md text-red-500 mt-5">{generalErrorMsg}</p>
              )} */}
            </form>
          </div>
        )
      }
      </div>
    </div>
  );
}

export default withRouter(Tabela);
