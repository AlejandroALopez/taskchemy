import Head from "next/head";
import Link from 'next/link';
import { useState, Fragment } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function loginHandler() {
    console.log("logged with: ", email, ", ", password);
  }

  return (
    <main className={"flex min-h-screen flex-col p-24"}>
      <Fragment>
        <Head>
          <title>Login</title>
          <meta
            name="description"
            content="Log into your account to use the app"
          />
        </Head>
        <div className={"flex flex-col items-center w-full"}>
          <p className={"text-3xl mb-8"}>Login</p>
          <div className={"py-8"}>
            <div className={"py-4"}>
              <p className={"text-2xl mb-2"}>Email</p>
              <input
                onChange={(event: any) => setEmail(event.target.value)}
                value={email}
                className={"border-2 border-dark rounded-lg px-2"}
                placeholder="Email"
              />
            </div>
            <div className={"py-4"}>
              <p className={"text-2xl mb-2"}>Password</p>
              <input
                onChange={(event: any) => setPassword(event.target.value)}
                value={password}
                className={"border-2 border-dark rounded-lg px-2"}
                placeholder="Password"
              />
            </div>
          </div>
          <button
            className={
              "w-56 h-20 mt-8 bg-dark border-4 border-medium rounded-2xl"
            }
            onClick={loginHandler}
          >
            <p className={"text-3xl text-white"}>Login</p>
          </button>
          <div className={"mt-16"}>
            <p>
              Don't have an account yet?{" "}
              <Link href="/signup" className={"text-regular"}>Sign up here</Link>
            </p>
          </div>
        </div>
      </Fragment>
    </main>
  );
}

export default Login;
