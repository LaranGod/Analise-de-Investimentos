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
    for (const [index, periodo] of investimento.entries()) {
      console.log('payback', payback);
      if (index === 0) {
        payback.push({ saida: valorInicial, entrada: null, saldo: null });
        continue;
      };

      if (index === 1) {
        const saldo = valorInicial - mediaEntradas;

        console.log('saldoh', {index, saldo})
        
        payback.push({ saida: null, entrada: mediaEntradas.toFixed(2), saldo: formatSaldo(saldo) });
        continue;
      }

      console.log('idnex', index);
      console.log('payback[index - 1]', payback[index - 1].saldo.replace(/(|)/g, ''))
      const saldo = Number(payback[index - 1].saldo.replace(/(|)/g, '')) - mediaEntradas;
      payback.push({ saida: null, entrada: mediaEntradas.toFixed(2), saldo: formatSaldo(saldo) });
    }

    return payback;
  }
  

}

export { calcPaybackMedio };