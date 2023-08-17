import Image from "next/image";
import { useEffect, useState } from "react";
import { getRemainingGrowthTime, seedImages } from "@/utils/gardenConstants";
import { Lab, Seed } from "@/types/AlchemyTypes";

interface SeedProps {
    seed: Seed,
    lab: Lab,
}

function SeedItem(props: SeedProps) {
    const [deleted, setDeleted] = useState(false);
    const remainingGrowthTime = getRemainingGrowthTime(props.seed.readyOn);

    useEffect(() => {
        const abc = {...props.lab.plants};
        console.log('Lab: ', abc);
    }, []);

    // Handler for clicking on a fully grown plant, adding it to our plant collection
    async function collectPlant(seed: Seed) {
        setDeleted(true);

        // Increase count of plant or add new plant to collection
        let updatedPlants = {...props.lab.plants};
        if (updatedPlants.hasOwnProperty(seed.alias)) {
            updatedPlants[seed.alias] = updatedPlants[seed.alias] + 1
        } else {
            updatedPlants[seed.alias] = 1
        }

        const newLabData = {
            labId: props.lab.id,
            newData: {
                userEmail: props.lab.userEmail,
                recipes: props.lab.recipes,
                plants: updatedPlants
            }
        }

        // Update user's inventory (lab)
        const response = await fetch("/api/labs/update-lab", {
            method: "PUT",
            body: JSON.stringify(newLabData),
            headers: {
              "Content-Type": "application/json",
            },
          });

        // Delete seed from garden
        const response2 = await fetch(`/api/seeds/${seed.id}`, {
            method: "DELETE",
        });
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