import { useEffect, useState, useContext } from "react";
import { withRouter, useRouter } from "next/router";
import { useForm, useFieldArray } from "react-hook-form";
import styles from "../styles/Home.module.css";
import { InvestimentosContext } from "../context/InvestimentosContext";
import LeftArrow from "../public/left-arrow.svg";

function TabelaPaybackMedio() {
  const { state, dispatch, resetState } = useContext(InvestimentosContext);
  const { paybackMedio } = state;

  console.log("state", paybackMedio);

  return (
    <div>
      <div className="flex flex-row gap-16 justify-center">
        {paybackMedio &&
          paybackMedio.map((invest, investIndex) => (
            <div
              key={investIndex + Math.random()}
              className="flex flex-col items-center mt-12"
            >
              <div className="mb-8">{`Investimento ${investIndex + 1}`}</div>
              <table>
                <thead className="bg-white border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                    >
                      Data
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                    >
                      Saída
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                    >
                      Entrada
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                    >
                      Saldo
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invest.tabela.map((field, fieldIndex) => (
                    <tr
                      className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 text-center"
                      key={fieldIndex.id}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Ano {fieldIndex}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {field.saida}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {field.entrada}
                      </td>
                      {fieldIndex === invest.paybackYear - 1 ? (
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium bg-green-500 text-gray-900">
                          {field.saldo}
                        </td>
                      ) : (
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {field.saldo}
                        </td>
                      )}
                    </tr>
                  ))}
                  <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 text-center">
                    Payback: {invest.pbkAtual} anos / Rentabilidade:{" "}
                    {invest.rentabilidade}
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
      </div>
      <p className="text-md text-center mt-6">
        <strong>Melhor investimento:</strong> Investimento {state.melhorPbkMedio + 1} (maior rendimento)
      </p>
    </div>
  );
}

export default TabelaPaybackMedio;
