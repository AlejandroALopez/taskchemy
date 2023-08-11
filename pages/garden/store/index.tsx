import Head from "next/head";
import Image from "next/image";
import Link from 'next/link';
import { Fragment } from "react";
import { PLANTS } from "@/utils/gardenConstants";
import { Plant } from "@/types/AlchemyTypes";
import StoreItem from "@/components/garden/StoreItem";
import MoneyItem from "@/components/garden/MoneyItem";
import BackArrow from "@/public/icons/arrows/back.svg";

function PlantStore() {
    const userStats = { // for testing
        id: "12312v2",
        userId: "c102dn02n2",
        coins: 3,
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
                        <MoneyItem coins={userStats.coins} />
                    </div>
                    <div className={"flex flex-col gap-6 mt-4"}>
                        {PLANTS?.map((plant: Plant, index: number) =>
                        (
                            <StoreItem
                                key={index}
                                userStats={userStats}
                                plant={plant}
                            />
                        ))}
                    </div>
                </div>
            </Fragment>
        </main>
    );
}

export default PlantStore;