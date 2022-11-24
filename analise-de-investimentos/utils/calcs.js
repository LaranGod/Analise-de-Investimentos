const formatSaldo = (saldo) => {
  console.log('saldo', saldo)
  if (Math.sign(saldo) === 1) {
    return `(${saldo.toFixed(2)})`;
  }
  if (Math.sign(saldo) === -1) {
    return Math.abs(saldo).toFixed(2);
  }
  if (!isNaN(saldo)) return saldo.toFixed(2);
}

const calcPaybackMedio = (investimentos) => {
  console.log('investimentos', investimentos);

  for (const investimento of investimentos) {
    console.log('investimento', investimento)
    const somaEntradas = investimento.reduce((sum, i) => sum + Number(i.entrada), 0);
    const mediaEntradas = somaEntradas / (investimento.length - 1);

    console.log("somaEntradas", somaEntradas)
    console.log('mediaEntradas', mediaEntradas)

    const valorInicial = Number(investimento[0].saida);
    console.log('valorInicial', valorInicial);

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



export { calcPaybackMedio };