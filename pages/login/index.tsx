import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, Fragment } from "react";

function Login() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  // action for signing in
  async function signInHandler(enteredUserData: any) {
    const response = await fetch("/api/auth/sign-in", {
      method: "POST",
      body: JSON.stringify(enteredUserData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    }

    console.log('data: ', data);
    const signInResponse = await signInHandler(data);

    if (signInResponse.data) {
      console.log('user: ', signInResponse.data);
      router.push("/");
    } else {
      console.log(signInResponse.message); // error
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
        <div className={"py-8"}>
          <div className={"py-4"}>
            <p className={"text-2xl mb-2"}>Email</p>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className={"border-2 border-dark rounded-lg px-2"}
            />
          </div>
          <div className={"py-4"}>
            <p className={"text-2xl mb-2"}>Password</p>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className={"border-2 border-dark rounded-lg px-2"}
            />
          </div>
        </div>
        <button
          className={
            "w-56 h-20 mt-8 bg-dark border-4 border-medium rounded-2xl"
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
