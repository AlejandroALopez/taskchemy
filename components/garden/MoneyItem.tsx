import Image from "next/image";
import MoneyIcon from "@/public/icons/plantStore/money.svg";

interface MoneyProps {
    coins: number, // either cost or number of coins a user has
}

function MoneyItem(props: MoneyProps) {
    return (
        <div className={"flex flex-row items-center gap-3 bg-white rounded-2xl border-black border-2 px-4 py-2"}>
            <div className={"relative w-[40px] h-[40px]"}>
                <Image src={MoneyIcon} alt="big check" />
            </div>
            <p className={"text-2xl"}>{props.coins}</p>
        </div>
    );
}

export default MoneyItem;
