import "@/styles/globals.css";
import Head from "next/head";
import { Provider } from 'react-redux';
import store from '../redux/store';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>MeTime Travel</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="android-chrome" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  )
}
