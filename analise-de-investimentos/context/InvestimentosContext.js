import React from 'react';

const initialValues = {
  id: null,
  nome: null,
  tipoAnalise: null,
  numInvestimentos: null,
  iInf: null, 
  iRisco: null, 
  iMer: null,
  prazosInvestimentos: [],
  investimentos: [],
  isSubmitted: false
};

const InvestimentosContext = React.createContext();

const stateReducer = (state, data) => ({ ...state, ...data });

function InvestimentosProvider({children}) {
  const [state, dispatch] = React.useReducer(stateReducer, initialValues)

  const resetState = () => dispatch(initialValues);

  const value = { state, dispatch, resetState }
  return <InvestimentosContext.Provider value={value} key='investimentos-provider'>{children}</InvestimentosContext.Provider>
}

export { InvestimentosContext, InvestimentosProvider };