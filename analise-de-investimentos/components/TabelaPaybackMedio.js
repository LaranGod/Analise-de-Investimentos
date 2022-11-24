import { useEffect, useState, useContext } from "react";
import { withRouter, useRouter } from "next/router";
import { useForm, useFieldArray } from "react-hook-form";
import styles from "../styles/Home.module.css";
import { InvestimentosContext } from "../context/InvestimentosContext";
import LeftArrow from "../public/left-arrow.svg";

function TabelaPaybackMedio() {
  const { state, dispatch, resetState } = useContext(InvestimentosContext);
  const { paybackMedio } = state;
  

  return (
    <div>
      {paybackMedio.map((invest, investIndex) => (
        <table key={investIndex}>
          <thead className="bg-white border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
              >
                Payback médio
              </th>

              {/* RENDERIZA CENARIOS */}
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
                  Ano {fieldIndex + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {field.saida}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {field.entrada}
                </td>
                {
                  fieldIndex === invest.paybackYear ? (
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium bg-green-500 text-gray-900">
                      {field.saldo}
                    </td>
                  ) : (
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {field.saldo}
                    </td>
                  )
                }
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );
}

export default TabelaPaybackMedio;
