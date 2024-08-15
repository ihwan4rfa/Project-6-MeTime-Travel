import "@/styles/globals.css";
import Head from "next/head";
import { Provider } from 'react-redux';
import store from '../redux/store';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>MeTime Travel</title>
        <link rel="icon" href="/favicon-metime-travel.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </Head>
      <Component {...pageProps} />
      <div className="hidden lg:inline cursor"></div>
      <script src="/script.js"></script>
    </Provider>
  )
}
