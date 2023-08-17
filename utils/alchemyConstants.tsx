import { AliasToImages, AliasToNames, PotionRecipe } from "@/types/AlchemyTypes";
import WhiteCalm from '@/public/icons/plantStore/whiteCalm.svg';
import BlueOrder from '@/public/icons/plantStore/blueOrder.svg';
import RedSpin from '@/public/icons/plantStore/redSpin.svg';

// Helper object for displaying plant images on the lab
export const aliasToImages: AliasToImages = {
    whiteCalm: WhiteCalm,
    blueOrder: BlueOrder,
    redSpin: RedSpin,
}

// Helper object for displaying plant images on the lab
export const aliasToNames: AliasToNames = {
    whiteCalm: "White Calm",
    blueOrder: "Blue Order",
    redSpin: "Red Spin",
}

export const RECIPES: PotionRecipe[] = [
    {
        name: "Health potion",
        imgIndex: 0, // img index for main display on lab and thumbnail
        ingredients: {
            "whiteCalm": 1,
            "lifeEssence": 1,
    }},
];