import Head from "next/head";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, Fragment } from "react";

function SignUp() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  // action for creating a user
  async function createUserHandler(enteredUserData: any) {
    const response = await fetch("/api/auth/new-user", {
      method: "POST",
      body: JSON.stringify(enteredUserData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return {status: response.status, signUpMessage: data.message};
  }

  // Create account if criteria met
  const handleSubmit = async (e: any) => {
    setError("");
    e.preventDefault();

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    // create account
    const { status, signUpMessage } = await createUserHandler(data);

    if (status === 409) { // email already registered
      console.log("Error: ", signUpMessage);
      setError(signUpMessage);
      return;
    }

    const signInResponse = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (signInResponse && !signInResponse.error) {
      router.push("/");
    } else {
      console.log("Error: ", signInResponse);
      setError("Error while creating user");
    }
  };

  return (
    <main className={"flex min-h-screen flex-col p-24"}>
      <Fragment>
        <Head>
          <title>Sign up</title>
          <meta name="description" content="Create an account to use the app" />
        </Head>
      </Fragment>
      <form
        className={"flex flex-col items-center w-full"}
        onSubmit={handleSubmit}
      >
        <p className={"text-3xl mb-8"}>Create Account</p>
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
          className={"p-6 mt-8 bg-regular rounded-2xl drop-shadow-md transition hover:scale-110 duration-300"}
          type="submit"
        >
          <p className={"text-3xl text-white"}>Create Account</p>
        </button>
        <div className={"mt-16"}>
          <p>
            Have an account?{" "}
            <Link href="/login" className={"text-regular"}>
              Log in here
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
}

export default SignUp;
