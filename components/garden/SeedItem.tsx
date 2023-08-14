import Image from "next/image";
import { useState } from "react";
import { getRemainingGrowthTime, seedImages } from "@/utils/gardenConstants";
import { Seed } from "@/types/AlchemyTypes";

interface SeedProps {
    seed: Seed,
}

function SeedItem(props: SeedProps) {
    const [deleted, setDeleted] = useState(false);
    const remainingGrowthTime = getRemainingGrowthTime(props.seed.readyOn);

    // Handler for clicking on a fully grown plant, adding it to our plant collection
    async function collectPlant(seed: Seed) {
        // Update user's inventory
        const response = await fetch(`/api/seeds/${seed.id}`, {
            method: "DELETE",
        });

        const data = await response.json();
        setDeleted(true);
    }

    return (
        <>
            {!deleted && (
                <div key={props.seed.id} className={"flex flex-col gap-8 mb-4"}>
                    <button
                        onClick={() => collectPlant(props.seed)}
                        disabled={remainingGrowthTime !== "Ready"}
                        className={`relative w-[180px] h-[320px] ${remainingGrowthTime === "Ready" && "transition hover:scale-110 duration-300"}`}>
                        <Image
                            src={remainingGrowthTime === "Ready" ? seedImages[props.seed.imgIndex] : seedImages[0]}
                            alt={"plant1"}
                            width={180}
                            height={320}
                        />
                    </button>
                    <div className={"flex flex-col gap-1 items-center px-4 py-8 bg-[#F5F5DC] border-[#88370F] border-4 rounded-xl"}>
                        <p className={"text-xl font-medium"}>{props.seed.name}</p>
                        <p>{remainingGrowthTime}</p>
                        <p className={"text-sm text-center"}>{remainingGrowthTime === "Ready" ? "Click plant to collect!" : "Come back later"}</p>
                    </div>
                </div>
            )}
        </>
    )
}

export default SeedItem;