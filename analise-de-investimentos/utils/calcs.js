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
  for (const investimento of investimentos) {
    const somaEntradas = investimento.reduce((sum, i) => sum + Number(i.entrada), 0);
    const mediaEntradas = somaEntradas / (investimento.length - 1);

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

    return { paybackMedio: payback, paybackYear: paybackIndex + 1 };
  }
}

const calcPaybackEfetivo = (investimentos) => {
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
    return { paybackEfetivo: payback, paybackYear: paybackIndex }
  }
}

const calcPaybackAjustado = (investimentos, txRetorno) => {
  console.log('investimentos', investimentos);
  console.log('txRetorno', txRetorno);

  const payback = [];
  const saldos = [0];
  let paybackIndex = null;
  for (const investimento of investimentos) {
    const valorInicial = Number(investimento[0].saida);
    for (const [index, periodo] of investimento.entries()) {

      if (index === 0) {
        payback.push({ original: `(${periodo.saida})`, descontado: '0.00', acumulado: `(${periodo.saida})` });
        continue;
      }

      const fluxDescontado = index === 1 ? Number(periodo.entrada) / txRetorno : Number(periodo.entrada) / Math.pow(txRetorno, index);
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
    return { paybackAjustado: payback, paybackYear: paybackIndex }
  }
}


export { calcPaybackMedio, calcPaybackEfetivo, calcPaybackAjustado };