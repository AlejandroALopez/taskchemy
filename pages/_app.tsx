import Layout from "../components/layout/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  ...appProps
}: AppProps) {
  const noLayoutPages = [`/login`, `/signup`];
  const getContent = () => {
    if (noLayoutPages.includes(appProps.router.pathname)) {
      return <Component {...pageProps} />;
    } else {
      return (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      );
    }
  };

  return (
    <SessionProvider session={session}>
      {getContent()}
    </SessionProvider>
  );
}
