import { useEffect, useState, useContext } from "react";
import { withRouter, useRouter } from "next/router";
import { useForm, useFieldArray } from "react-hook-form";
import styles from "../styles/Home.module.css";
import { InvestimentosContext } from "../context/InvestimentosContext";
import LeftArrow from "../public/left-arrow.svg";

function TabelaPaybackAjustado() {
  const { state, dispatch, resetState } = useContext(InvestimentosContext);
  const { paybackAjustado } = state;
  

  return (
    <div className="flex flex-row gap-16 justify-center">
      {paybackAjustado && paybackAjustado.map((invest, investIndex) => (
        <div key={investIndex} className='flex flex-col items-center mt-20'>
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
                  Fluxo Original
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                >
                  Fluxo Descontado
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                >
                  Fluxo Acumulado
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
                    {field.original}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {field.descontado}
                  </td>
                  {
                    fieldIndex === invest.paybackYear -1 ? (
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium bg-green-500 text-gray-900">
                        {field.acumulado}
                      </td>
                    ) : (
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {field.acumulado}
                      </td>
                    )
                  }
                </tr>
              ))}
              <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 text-center">
                Payback: {invest.pbkAtual} anos / Rentabilidade: {invest.rentabilidade}
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default TabelaPaybackAjustado;
