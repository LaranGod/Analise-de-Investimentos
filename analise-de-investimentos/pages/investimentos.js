import { useEffect, useState, useContext } from "react";
import { withRouter, useRouter } from "next/router";
import { useForm, useFieldArray } from "react-hook-form";
import styles from "../styles/Home.module.css";
import { InvestimentosContext } from "../context/InvestimentosContext";

function Investimentos(props) {
  const router = useRouter();
  const { state, dispatch, resetState } = useContext(InvestimentosContext);
  const { tipoAnalise, numInvestimentos, iInf, iRisco, iMer } = state;

  return(
    <div>
    </div>
  )
}

export default withRouter(Investimentos)