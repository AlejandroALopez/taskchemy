import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import MoneyItem from "@/components/garden/MoneyItem";
import { getReadyTime, getRemainingGrowthTime, SEEDS } from "@/utils/gardenConstants";

import PlantGrowing from "@/public/icons/garden/plantGrowing.svg";
import { Seed } from "@/types/AlchemyTypes";

function Garden() {
    const userStats = { // for testing
        id: "12312v2",
        userId: "c102dn02n2",
        coins: 3,
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
                    <div className={"flex flex-row flex-wrap gap-16 mt-12"}>
                        {SEEDS.map((seed: Seed) => {
                            const remainingGrowthTime = getRemainingGrowthTime(seed.readyOn);
                            return (
                            <div key={seed.id} className={"flex flex-col gap-8"}>
                                <div className={"relative w-[180px] h-[320px]"}>
                                    <Image
                                        src={remainingGrowthTime === "Ready" ? seed.img : PlantGrowing}
                                        alt={"plant1"}
                                        width={180}
                                        height={320}
                                    />
                                </div>
                                <div className={"flex flex-col items-center px-4 py-8 bg-[#F5F5DC] border-[#88370F] border-4 rounded-xl"}>
                                    <p className={"text-xl font-medium"}>{seed.name}</p>
                                    <p>{remainingGrowthTime}</p>
                                </div>
                            </div>
                        )}
                        )}
                    </div>
                </div>
            </Fragment>
        </main>
    );
}

export default Garden;