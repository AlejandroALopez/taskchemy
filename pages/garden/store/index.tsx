import Head from "next/head";
import Image from "next/image";
import Link from 'next/link';
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { Fragment } from "react";
import { PLANTS } from "@/utils/gardenConstants";
import { Plant } from "@/types/AlchemyTypes";
import { getUserStats } from "@/actions/alchemyActions";
import StoreItem from "@/components/garden/StoreItem";
import MoneyItem from "@/components/garden/MoneyItem";
import BackArrow from "@/public/icons/arrows/back.svg";

function PlantStore(props: any) {
    const router = useRouter();

    // action for creating a seed
    async function createSeedHandler(seedData: any) {
        const response = await fetch("/api/seeds/new-seed", {
            method: "POST",
            body: JSON.stringify(seedData),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        router.push("/garden");
    }

    return (
        <main className={"flex min-h-screen flex-col p-12"}>
            <Fragment>
                <Head>
                    <title>Plant Store</title>
                    <meta name="description" content="Buy plant seeds with coins earned through completing tasks" />
                </Head>
                <div>
                    <div className={"flex flex-row gap-8 items-center"}>
                        <Link href='/garden' className={"relative w-[60px] h-[60px] transition hover:scale-110 duration-300"}>
                            <Image
                                src={BackArrow}
                                alt="arrow down/up"
                                height={60}
                                width={60}
                            />
                        </Link>
                        <p className={"text-3xl font-medium"}>Plant Shop</p>
                        <MoneyItem coins={props.stats.coins} />
                    </div>
                    <div className={"flex flex-col gap-6 mt-4"}>
                        {PLANTS?.map((plant: Plant, index: number) =>
                        (
                            <StoreItem
                                key={index}
                                userStats={props.stats}
                                plant={plant}
                                createSeedHandler={createSeedHandler}
                            />
                        ))}
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
        const stats = await getUserStats(user?.email as string);

        return {
            props: {
                stats: {
                    id: stats?._id.toString(),
                    userEmail: stats?.userEmail,
                    coins: stats?.coins,
                },
            },
        };
    }
}

export default PlantStore;