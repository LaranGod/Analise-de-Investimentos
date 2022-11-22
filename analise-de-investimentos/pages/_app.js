import '../styles/globals.css'
import { InvestimentosProvider } from "../context/InvestimentosContext";

function MyApp({ Component, pageProps }) {
  return (
    <InvestimentosProvider>
      <Component {...pageProps} />
    </InvestimentosProvider>
  )
}

export default MyApp
