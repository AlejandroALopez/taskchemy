import { Plant } from "@/types/AlchemyTypes";
import WhiteCalm from '@/public/icons/plantStore/whiteCalm.svg';
import BlueOrder from '@/public/icons/plantStore/blueOrder.svg';
import RedSpin from '@/public/icons/plantStore/redSpin.svg';

export const PLANTS: Plant[] = [
    {
        name: "White calm",
        cost: 1,
        timeToGrow: 1,
        imgShop: WhiteCalm,
        imgGarden: "abc",
    },
    {
        name: "Blue order",
        cost: 3,
        timeToGrow: 2,
        imgShop: BlueOrder,
        imgGarden: "abc",
    },
    {
        name: "Red spin",
        cost: 5,
        timeToGrow: 3,
        imgShop: RedSpin,
        imgGarden: "abc",
    }
]