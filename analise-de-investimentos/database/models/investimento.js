import mongoose from "mongoose";

const InvestimentoSchema = new mongoose.Schema({
  nome: String,
  isSubmitted: Boolean,
  iInf: Number,
  iMer: Number,
  iRisco: Number,
  id: String,
  investimentos: Array,
  numInvestimentos: Number,
  paybackAjustado: Array,
  paybackEfetivo: Array,
  paybackMedio: Array,
  prazosInvestimentos: Array,
  txInternaRetorno: Number,
  vpl: Array,
});

const Investimento =
  mongoose.models.Investimento ??
  mongoose.model("Investimento", InvestimentoSchema);

export default Investimento;
