import Image from "next/image";
import { useRouter } from "next/router";
import { UserStats, Plant } from "@/types/AlchemyTypes";
import MoneyItem from "./MoneyItem";

interface StorePlantProps {
    userStats: UserStats,
    plant: Plant,
}

function StoreItem(props: StorePlantProps) {
    const router = useRouter();
    const { id, userId, coins } = props.userStats;
    const { name, cost, timeToGrow, imgShop, imgGarden } = props.plant;

    function buyPlantHandler() {
        router.push("/garden");
    }

    return (
        <div className={"flex flex-row gap-4 md:w-10/12 bg-white rounded-2xl px-4 py-4 drop-shadow-md"}>
            {/* <Image
                src={imgShop}
                alt="arrow down/up"
                height={60}
                width={60}
            /> */}
            <div className={"w-2/12 h-36 border-2 border-black rounded-xl bg-white"} />
            <div className={"flex flex-col gap-2 w-full"}>
                <p className={"text-2xl font-medium"}>{name}</p>
                <div className={"w-full h-1 bg-black rounded-full"} />
                <p className={"text-xl"}>Time to collect: {timeToGrow} {timeToGrow === 1 ? "day" : "days"}</p>
                <div className={"flex flex-row-reverse gap-4"}>
                    <button onClick={buyPlantHandler} disabled={coins < cost}
                        className={
                            `px-8 py-4 bg-regular h-16 rounded-2xl drop-shadow-md ${coins < cost ? "opacity-50" : "transition hover:scale-110 duration-300"}`
                        }>
                        <p className={"text-2xl text-white"}>Buy</p>
                    </button>
                    <MoneyItem coins={cost} />
                </div>
            </div>
        </div>
    );
}

export default StoreItem;
