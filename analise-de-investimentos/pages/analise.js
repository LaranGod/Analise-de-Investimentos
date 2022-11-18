import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useContext } from "react";

export default function Analise() {
  const router = useRouter();
  // const { state, dispatch } = useContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    const { tipoDeAnalise, iInf, iRisco, iMer, numInvestimentos } = data;

    const submitData = {
      tipoDeAnalise,
      iInf: parseInt(iInf, 10),
      iRisco: parseInt(iRisco, 10),
      iMer: parseInt(iMer, 10),
      numInvestimentos: parseInt(numInvestimentos, 10),
    };

    // dispatch({ ...submitData });

    router.push("/tabela");
  };

  return (
    <div>
      <Head>
        <title>Análise de Investimentos</title>
        <meta name="description" content="Analise sua decisão" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className={`flex justify-center items-center flex-col min-h-screen min-w-full p-0 bg-gradient-to-r from-indigo-400 to-cyan-300  text-lg`}
      >
        <div className="h-[900px] w-[800px] flex items-center flex-col border-4 pt-16 bg-white rounded-xl ">
          <h1 className="mb-10 text-2xl">ANÁLISE DE INVESTIMENTOS</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center flex-col">
              <div>
                <p className="text-md">Qual a taxa de inflação?</p>
                <div className="flex mb-4">
                  <div className="input">
                    <input
                      className="border-2 h-8"
                      type="number"
                      min="0"
                      {...register("iInf", {
                        valueAsNumber: true,
                        required: "Digite a taxa de inflação!",
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="iInf"
                      render={({ message }) => (
                        <p className="text-sm text-red-500 mb-4">{message}</p>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div>
                <p className="text-md">Qual a taxa de risco?</p>
                <div className="flex mb-4">
                  <div className="input">
                    <input
                      className="border-2 h-8"
                      type="number"
                      min="0"
                      {...register("iRisco", {
                        valueAsNumber: true,
                        required: "Digite a taxa de risco!",
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="iRisco"
                      render={({ message }) => (
                        <p className="text-sm text-red-500 mb-4">{message}</p>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div>
                <p className="text-md">Qual a taxa de remuneração real?</p>
                <div className="flex mb-4">
                  <div className="input">
                    <input
                      className="border-2 h-8"
                      type="number"
                      min="0"
                      {...register("iMer", {
                        valueAsNumber: true,
                        required: "Digite a taxa de remuneração real!",
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="iMer"
                      render={({ message }) => (
                        <p className="text-sm text-red-500 mb-4">{message}</p>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center flex-col mt-8">
              <div className="w-3/5 flex items-center flex-col">
                <p className="text-md mb-4">Selecione o tipo de análise a ser realizada</p>

                <div className="flex mb-4">
                  <div className="mb-0">
                    <div className="mb-2">
                      <label>
                        <input
                          {...register("tipoAnalise", {
                            required: "Selecione o tipo de analise!",
                          })}
                          type="radio"
                          value="a"
                          className="mr-2"
                        />
                        A taxa interna de retorno (de desconto) será aplicada diretamente nos fluxos de caixa incrementais
                      </label>
                    </div>
                    <div className="radio">
                      <label>
                        <input
                          {...register("tipoAnalise")}
                          type="radio"
                          value="b"
                          className="mr-2"
                        />
                        A taxa interna de retorno (de desconto) do investimento será calculada pela aplicação e comparada à taxa de desconto
                      </label>
                    </div>
                  </div>

                  <ErrorMessage
                    errors={errors}
                    name="tipoAnalise"
                    render={({ message }) => (
                      <p className="text-sm text-red-500">{message}</p>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center flex-col pt-6">
              <div className="">
                <p className="text-md">Qual o número de Investimentos?</p>

                <div className="flex mb-20">
                  <input
                    className="border-2 h-8 w-full"
                    type="number"
                    min="0"
                    max="3"
                    {...register("numInvestimentos", {
                      valueAsNumber: true,
                      required: "Digite o número de Investimentos!",
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="numInvestimentos"
                    render={({ message }) => (
                      <p className="text-sm text-red-500 mb-4">{message}</p>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col items-center">
              <button
                type="submit"
                className="border rounded border-green-500 bg-green-500 hover:bg-green-600 text-white text-md w-[500px] p-2"
              >
                Prosseguir
              </button>
              <button
                type="button"
                className="border rounded border-red-500 bg-red-500 hover:bg-red-600 text-white text-md w-[500px] p-2 mt-1"
                onClick={() => router.push("/")}
              >
                Voltar
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
