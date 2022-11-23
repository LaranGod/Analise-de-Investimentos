import Head from "next/head";
import { useEffect, useState, useContext } from "react";
import { withRouter, useRouter } from "next/router";
import { useForm, useFieldArray } from "react-hook-form";
import styles from "../styles/Home.module.css";
import { InvestimentosContext } from "../context/InvestimentosContext";

function Investimentos(props) {
  const router = useRouter();
  const { state, dispatch, resetState } = useContext(InvestimentosContext);
  const { tipoAnalise, numInvestimentos, iInf, iRisco, iMer } = state;
  const [mostrarFluxoCaixa, setMostrarFluxoCaixa] = useState(false);
  const [isSubmited, setIsSubmited] = useState();

  const arrInvestimentos = Array.from(
    Array(numInvestimentos || 0),
    (_, i) => i + 1
  );

  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      prazosInvestimentos: arrInvestimentos.map((i) => ({})),
    },
  });

  const { fields: prazosInv } = useFieldArray({
    control,
    name: "prazosInvestimentos",
  });
  const onSubmit = (data) => {
    const { numInvestimentos, prazosInvestimentos } = data;
    prazosInv.map((investimento) => console.log("iv", investimento));
    const submitData = {
      prazosInvestimentos: prazosInvestimentos.map((investimento) =>
        parseInt(investimento.prazo, 10)
      ),
    };

    dispatch({ ...submitData });
    router.push("/tabelas");
  };
  return (
    <div className={`bg-gradient-to-r from-indigo-400 to-cyan-300  text-lg`}>
      <div className={styles.container}>
        <div className={styles.main}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="h-[500px] w-[400px] flex items-center flex-col border-4 pt-16 bg-white rounded-xl">
              <div className="h-72">
                {prazosInv.map((field, fieldIndex) => (
                  <div key={`${field.id}-${fieldIndex}`}>
                    <div className="mb-4">{`Prazo para o Investimento ${
                      fieldIndex + 1
                    }`}</div>
                    <input
                      {...register(`prazosInvestimentos.${fieldIndex}.prazo`, {
                        required: "prazo não informado!",
                      })}
                      type="number"
                      className="w-full border-2 h-8"
                    />
                  </div>
                ))}
              </div>
              <div className="w-full flex flex-col items-center px-10">
                <button
                  type="submit"
                  className="border rounded border-green-500 bg-green-500 hover:bg-green-600 text-white text-md w-full p-2"
                >
                  Prosseguir
                </button>
                <button
                  type="button"
                  className="border rounded border-red-500 bg-red-500 hover:bg-red-600 text-white text-md w-full p-2 mt-1"
                  onClick={() => router.push("/")}
                >
                  Voltar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Investimentos);
