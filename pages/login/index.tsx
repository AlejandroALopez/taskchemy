import Head from "next/head";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, Fragment } from "react";

function Login() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: any) => {
    setError("");
    e.preventDefault();

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    }

    const signInResponse = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    if (signInResponse && !signInResponse.error) {
      router.push("/");
    } else {
      console.log("Error: ", signInResponse);
      setError("Your Email or Password is wrong!");
    }
  };

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
      </Fragment>
      <form
        className={"flex flex-col items-center w-full"}
        onSubmit={handleSubmit}
      >
        <p className={"text-3xl mb-8"}>Login</p>
        {error && (
          <span className={"p-4 mb-2 text-lg bg-red-500 text-white"}>
            {error}
          </span>
        )}
        <div className={"py-8"}>
          <div className={"py-4"}>
            <p className={"text-2xl mb-2"}>Email</p>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className={"border-2 border-regular rounded-lg px-2 text-black"}
            />
          </div>
          <div className={"py-4"}>
            <p className={"text-2xl mb-2"}>Password</p>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className={"border-2 border-regular rounded-lg px-2 text-black"}
            />
          </div>
        </div>
        <button
          className={
            "p-6 mt-8 bg-regular rounded-2xl drop-shadow-md"
          }
          type="submit"
        >
          <p className={"text-3xl text-white"}>Log in</p>
        </button>
        <div className={"mt-16"}>
          <p>
            Don't have an account yet?{" "}
            <Link href="/signup" className={"text-regular"}>
              Sign up here
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
}

export default Login;
