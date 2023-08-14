import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { getUserSeeds } from "@/actions/gardenActions";
import { getReadyTime, getRemainingGrowthTime, seedImages } from "@/utils/gardenConstants";
import { Seed } from "@/types/AlchemyTypes";
import MoneyItem from "@/components/garden/MoneyItem";
import SeedItem from "@/components/garden/SeedItem";

function Garden(props: any) {
    const userStats = { // for testing
        id: "12312v2",
        userEmail: "alex@hotmail.com",
        coins: 5,
    }

    return (
        <main className={"flex min-h-screen flex-col p-12"}>
            <Fragment>
                <Head>
                    <title>Garden</title>
                    <meta name="description" content="Grow plants needed to brew potions" />
                </Head>
                <div>
                    <div className={"flex flex-row gap-2 md:gap-8 items-center"}>
                        <p className={"text-3xl font-medium"}>Garden</p>
                        <MoneyItem coins={userStats.coins} />
                        <Link href='/garden/store' className={"px-8 py-4 bg-regular h-16 rounded-2xl drop-shadow-md transition hover:scale-110 duration-300"}>
                            <p className={"text-2xl text-white"}>Buy Plants</p>
                        </Link>
                    </div>
                    <div className={"flex flex-row overflow-scroll overflow-y-hidden gap-28 mt-6 max-w-6xl"}>
                        {props.seeds.map((seed: Seed) => <SeedItem seed={seed}/>
                        )}
                    </div>
                </div>
            </Fragment>
        </main>
    );
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    } else {
        const user = session.user;
        const seeds = await getUserSeeds(user?.email as string);

        return {
            props: {
                seeds: seeds.map((seed: any) => ({
                    id: seed._id.toString(),
                    userEmail: seed.userEmail,
                    name: seed.name,
                    alias: seed.alias,
                    timeToGrow: seed.timeToGrow,
                    plantedOn: seed.plantedOn,
                    readyOn: seed.readyOn,
                    imgIndex: seed.imgIndex,
                })),
            },
        };
    }
}

export default Garden;