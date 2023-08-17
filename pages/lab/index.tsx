import Head from "next/head";
import Image from "next/image";
import { Fragment } from "react";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { aliasToImages, aliasToNames } from "@/utils/alchemyConstants";
import { getUserLab, getUserStats } from "@/actions/alchemyActions";
import FlaskWater from "@/public/icons/lab/flaskWater.svg";

function Lab(props: any) {

    function addPlantToMix(plantAlias: String) {
        console.log("Plant added to mix: ", plantAlias);
    }

    function mixHandler() {
        console.log("Mixing");
    }

    return (
        <main className={"flex min-h-screen flex-col p-12"}>
            <Fragment>
                <Head>
                    <title>Lab</title>
                    <meta name="description" content="Brew potions with your plants and discover new recipes" />
                </Head>
                <div>
                    <div className={"flex flex-row gap-2 md:gap-8 items-center"}>
                        <p className={"text-3xl font-medium"}>Alchemy Lab</p>
                    </div>
                    <div className={"flex flex-row mt-6 gap-20"}>
                        <div className={"bg-[#FBF0DE] border-[#F1CB8E] border-4 rounded-2xl"}>
                            {Object.keys(props.lab.plants).map((plantAlias: string, index: number) => (
                                <div key={index} className={"flex flex-row gap-4 py-6 pl-8 pr-16"}>
                                    <div className={"relative w-[125px] h-[125px]"}>
                                        <Image
                                            src={aliasToImages[plantAlias]}
                                            alt="plant image"
                                            height={125}
                                            width={125}
                                        />
                                    </div>
                                    <div className={"flex flex-col gap-4"}>
                                        <p className={"text-2xl"}>{aliasToNames[plantAlias]}</p>
                                        <p className={"text-lg font-light italic"}>Available: {props.lab.plants[plantAlias]}</p>
                                        <button onClick={() => addPlantToMix(plantAlias)} className={"px-4 py-2 drop-shadow-lg bg-regular rounded-xl transition hover:scale-110 duration-300"}>
                                            <p className={"text-white"}>Add to mix</p>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={"flex flex-col items-center gap-8"}>
                            <p className={"text-2xl"}>?????</p>
                            <div className={"relative w-[300] h-[220]"}>
                                <Image
                                    src={FlaskWater}
                                    alt="flask"
                                    height={220}
                                    width={300}
                                />
                            </div>
                            <div className={"flex flex-row gap-8"}>
                                <div className={"h-[8rem] w-[8rem] bg-[#EAFBF1] border-[#2AC769] border-2 rounded-2xl"} />
                                <div className={"h-[8rem] w-[8rem] bg-[#EAFBF1] border-[#2AC769] border-2 rounded-2xl"} />
                            </div>
                            <button onClick={() => mixHandler()} className={"px-8 py-4 drop-shadow-lg bg-regular rounded-xl transition hover:scale-110 duration-300"}>
                                <p className={"text-white text-2xl"}>Add to mix</p>
                            </button>
                        </div>
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
        const lab = await getUserLab(user?.email as string);

        return {
            props: {
                stats: {
                    id: stats?._id.toString(),
                    userEmail: stats?.userEmail,
                    coins: stats?.coins,
                },
                lab: {
                    id: lab?._id.toString(),
                    userEmail: lab?.userEmail,
                    recipes: lab?.recipes,
                    plants: lab?.plants
                },
            },
        };
    }
}

export default Lab;