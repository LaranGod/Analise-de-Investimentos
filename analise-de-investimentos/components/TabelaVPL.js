import { useEffect, useState, useContext } from "react";
import { withRouter, useRouter } from "next/router";
import { useForm, useFieldArray } from "react-hook-form";
import styles from "../styles/Home.module.css";
import { InvestimentosContext } from "../context/InvestimentosContext";
import LeftArrow from "../public/left-arrow.svg";

function TabelaVPL() {
  const { state, dispatch, resetState } = useContext(InvestimentosContext);
  const { vpl } = state;
  

  return (
    <div className="flex flex-col items-center">
      <table>
        <thead className="bg-white border-b">
          <tr>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
            >
              Investimento
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
            >
              VPL
            </th>
          </tr>
        </thead>
        <tbody>
          {vpl && vpl.map((value, valueIndex) => (
            <tr
              className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 text-center"
              key={valueIndex.id}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Invest {valueIndex + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {value.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TabelaVPL;
