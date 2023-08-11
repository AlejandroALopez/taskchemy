import Head from "next/head";
import { Fragment } from "react";
import { useRouter } from "next/router";

function Garden() {
    const router = useRouter();
    function goToStoreHandler() {
        router.push("/garden/store"); // move to task creation page
    }

    return (
        <main className={"flex min-h-screen flex-col p-12"}>
        <Fragment>
            <Head>
                <title>Garden</title>
                <meta name="description" content="Grow plants needed to brew potions" />
            </Head>
            <div className={"flex justify-center md:w-10/12"}>
                <button
                    onClick={goToStoreHandler}
                    className={
                        "px-8 py-4 mt-10 bg-regular h-16 rounded-2xl drop-shadow-md transition hover:scale-110 duration-300"
                    }
                >
                    <p className={"text-2xl text-white"}>Buy Plants</p>
                </button>
            </div>
        </Fragment>
    </main>
    );
}

export default Garden;