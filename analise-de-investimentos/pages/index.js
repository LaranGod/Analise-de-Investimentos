import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <main
      className={`flex justify-center items-center flex-col min-h-screen min-w-full p-0 bg-gradient-to-r from-indigo-400 to-cyan-300 text-lg`}
    >
      <div className="h-[600px] w-[500px] flex items-center flex-col border-4 pt-16 bg-white rounded-xl ">
        <h1 className="mb-20 text-2xl">BEM VINDO!</h1>
        <h2 className="mb-10 text-2xl">Selecione uma das opções abaixo</h2>
        <button
          type="button"
          className="border rounded border-green-500 bg-green-500 hover:bg-green-600 text-white text-md w-80 p-2"
          onClick={() => router.push('/analise')}
        >
          Realizar nova análise
        </button>
        <button
          type="button"
          className="border rounded border-yellow-500 bg-yellow-500 hover:bg-yellow-600 text-white text-md w-80 p-2 mt-3"
          onClick={() => router.push('/relatorios')}
        >
          Visualizar análises anteriores
        </button>
      </div>
    </main>
  );
}