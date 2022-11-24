const formatSaldo = (saldo) => {
  if (Math.sign(saldo) === 1) {
    return `(${saldo.toFixed(2)})`;
  }
  if (Math.sign(saldo) === -1) {
    return Math.abs(saldo).toFixed(2);
  }
  if (!isNaN(saldo)) return saldo.toFixed(2);
}

const calcPaybackMedio = (investimentos) => {
  const pbkTable = [];
  for (const investimento of investimentos) {
    const somaEntradas = investimento.reduce((sum, i) => sum + Number(i.entrada), 0);
    const mediaEntradas = somaEntradas / (investimento.length - 1);

    const valorInicial = Number(investimento[0].saida);
    const pbkAtual = (valorInicial / (mediaEntradas * (investimento.length - 1)) * (investimento.length - 1));
    // 1º -> subtrai a primeira entrada do valor inicial
    // proximos -> subtrai do saldo da row anterior 
    const payback = [];
    let paybackIndex = null;
    const saldos = [0];
    for (const [index, periodo] of investimento.entries()) {
      if (index === 0) {
        payback.push({ saida: valorInicial, entrada: null, saldo: null });
        continue;
      };

      if (index === 1) {
        const saldo = valorInicial - mediaEntradas;
        if (!paybackIndex && saldo <= 0) paybackIndex = index;

        saldos.push(saldo);
        payback.push({ saida: null, entrada: mediaEntradas.toFixed(2), saldo: formatSaldo(saldo) });
        continue;
      }

      const saldo = Number(saldos[index - 1]) - mediaEntradas;
      saldos.push(saldo);
      if (!paybackIndex && saldo <= 0) paybackIndex = index;
      payback.push({ saida: null, entrada: mediaEntradas.toFixed(2), saldo: formatSaldo(saldo) });
    }

    pbkTable.push({ tabela: payback, paybackYear: paybackIndex + 1, pbkAtual: pbkAtual.toFixed(2) });
  }
  return pbkTable;
}

const calcPaybackEfetivo = (investimentos) => {
  const pbkTable = [];
  for (const investimento of investimentos) {
    const valorInicial = Number(investimento[0].saida);
    // 1º -> subtrai a primeira entrada do valor inicial
    // proximos -> subtrai do saldo da row anterior 
    const payback = [];
    let paybackIndex = null;
    const saldos = [0];
    for (const [index, periodo] of investimento.entries()) {
      if (index === 0) {
        payback.push({ saida: valorInicial, entrada: null, saldo: null });
        continue;
      };

      if (index === 1) {
        const saldo = valorInicial - periodo.entrada;
        if (!paybackIndex && saldo <= 0) paybackIndex = index;

        saldos.push(saldo);
        payback.push({ saida: null, entrada: periodo.entrada, saldo: formatSaldo(saldo) });
        continue;
      }

      const saldo = Number(saldos[index - 1]) - periodo.entrada;
      saldos.push(saldo);
      if (!paybackIndex && saldo <= 0) paybackIndex = index;
      payback.push({ saida: null, entrada: periodo.entrada, saldo: formatSaldo(saldo) });
    }
    pbkTable.push({ tabela: payback, paybackYear: paybackIndex + 1 });
  }
  return pbkTable;
}

const calcPaybackAjustado = (investimentos, txRetorno) => {
  const pbkTable = [];
  for (const investimento of investimentos) {
    const payback = [];
    const saldos = [0];
    let paybackIndex = null;

    const valorInicial = Number(investimento[0].saida);
    
    const sumRetornosAjustados = investimento.reduce((sum, i, index) => sum + (Number(i.entrada) / Math.pow(txRetorno, index)), 0);
    console.log('sumRetornosAjustados', sumRetornosAjustados);
    const pbkAtual = (valorInicial / sumRetornosAjustados) * (investimento.length - 1);

    for (const [index, periodo] of investimento.entries()) {
      if (index === 0) {
        payback.push({ original: `(${periodo.saida})`, descontado: '0.00', acumulado: `(${periodo.saida})` });
        continue;
      }

      const fluxDescontado = Number(periodo.entrada) / Math.pow(txRetorno, index);
      if (index === 1) {
        const saldo = valorInicial - fluxDescontado;
        if (!paybackIndex && saldo <= 0) paybackIndex = index;

        saldos.push(saldo);
        payback.push({ original: periodo.entrada, descontado: fluxDescontado.toFixed(2), acumulado: formatSaldo(saldo) });
        continue;
      }

      const saldo = Number(saldos[index - 1]) - fluxDescontado;
      saldos.push(saldo);
      if (!paybackIndex && saldo <= 0) paybackIndex = index;
      payback.push({ original: periodo.entrada, descontado: fluxDescontado.toFixed(2), acumulado: formatSaldo(saldo) });
    }

    pbkTable.push({ tabela: payback, paybackYear: paybackIndex + 1, pbkAtual: pbkAtual.toFixed(2), retornos: sumRetornosAjustados });
  }
  return pbkTable;
}

const calcVPL = (investimentos, paybackAjustado) => {
  console.log('investimentos', investimentos);
  console.log('paybackAjustado', paybackAjustado);
  const VPL = [];
  for (const [index, investimento] of investimentos.entries()) {
    const valorInicial = Number(investimento[0].saida);
    const retorno = paybackAjustado[index].retornos;

    const vpl = retorno - valorInicial;
    VPL.push(vpl);
  }
  return VPL;
}


export { calcPaybackMedio, calcPaybackEfetivo, calcPaybackAjustado, calcVPL };