import Head from "next/head";
import { Fragment } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Fragment>
        <Head>
          <title>Task Alchemy</title>
          <meta
            name="description"
            content="A Next.js app to manage tasks with an alchemy theme!"
          />
        </Head>
        <div>
          <p>Hello</p>
        </div>
      </Fragment>
    </main>
  );
}
