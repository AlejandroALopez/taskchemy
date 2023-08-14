import { Plant, Seed } from "@/types/AlchemyTypes";

import WhiteCalm from '@/public/icons/plantStore/whiteCalm.svg';
import BlueOrder from '@/public/icons/plantStore/blueOrder.svg';
import RedSpin from '@/public/icons/plantStore/redSpin.svg';

import PlantGrowing from "@/public/icons/garden/plantGrowing.svg";
import PlantWhite from "@/public/icons/garden/plantWhite.svg";
import PlantBlue from "@/public/icons/garden/plantBlue.svg";
import PlantRed from "@/public/icons/garden/plantRed.svg";

// Time units in miliseconds, useful for some functions
const daysInMiliseconds = 1000 * 60 * 60 * 24;
const hoursInMiliseconds = 1000 * 60 * 60;
const minutesInMiliseconds = 1000 * 60;

// Array of SVG elements for the plants in the garden, so the seeds store index values instead of whole SVG elements
export const seedImages :any[] = [PlantGrowing, PlantWhite, PlantBlue, PlantRed]

// For testing the garden
export const SEEDS: Seed[] = [
    {
        id: "as88h8h4f",
        userEmail: "alex@hotmail.com",
        name: "Plant Z",
        alias: "plantZ",
        timeToGrow: 1,
        plantedOn: 1691962933460, // timestamp, when seed was planted
        readyOn: 1692049333460, // timestamp, when plant ready to collect
        imgIndex: 1,
    },
    {
        id: "123443",
        userEmail: "alex@hotmail.com",
        name: "Plant A",
        alias: "plantA",
        timeToGrow: 1,
        plantedOn: 1691962933460, // timestamp, when seed was planted
        readyOn: 1691962933460, // timestamp, when plant ready to collect
        imgIndex: 1,
    },
    {
        id: "48237874",
        userEmail: "alex@hotmail.com",
        name: "Plant B",
        alias: "plantB",
        timeToGrow: 1,
        plantedOn: 1691962933460, // timestamp, when seed was planted
        readyOn: 1691962933460, // timestamp, when plant ready to collect
        imgIndex: 2,
    },
    {
        id: "482378744444",
        userEmail: "alex@hotmail.com",
        name: "Plant C",
        alias: "plantC",
        timeToGrow: 1,
        plantedOn: 1691962933460, // timestamp, when seed was planted
        readyOn: 1691962933460, // timestamp, when plant ready to collect
        imgIndex: 3,
    },
]

// Established plants for the store
export const PLANTS: Plant[] = [
    {
        name: "White calm",
        cost: 1,
        timeToGrow: 1,
        imgShop: WhiteCalm,
        imgIndex: 1,
    },
    {
        name: "Blue order",
        cost: 3,
        timeToGrow: 2,
        imgShop: BlueOrder,
        imgIndex: 2,
    },
    {
        name: "Red spin",
        cost: 5,
        timeToGrow: 3,
        imgShop: RedSpin,
        imgIndex: 3,
    }
]

// Returns the date (in miliseconds) when a bought seed will become a collectable plant in the garden
// Takes the number of days needed to grow the plant 
export function getReadyTime(days: number): number {
    const now: number = new Date().getTime();
    const growthTime: number = days * daysInMiliseconds; // days converted to miliseconds

    return now + growthTime;
}

// Returns remaining time (string e.g. 50 min, 2 days, etc.) before a seed grows into a plant
// Takes the date (in miliseconds) when the time is ready, and returns the time between then and today
export function getRemainingGrowthTime(readyDate: number): string {
    const now: number = new Date().getTime();
    const difference: number = readyDate - now;

    if (difference <= 0) {
        return "Ready";
    }

    const days = Math.floor(difference / daysInMiliseconds);
    const hours = Math.floor((difference % daysInMiliseconds) / hoursInMiliseconds);
    const minutes = Math.floor((difference % hoursInMiliseconds) / minutesInMiliseconds);

    if (days > 0) {
        return `${days} ${days === 1 ? "day" : "days"} left`;
    } else if (hours > 0) {
        return `${hours} ${hours === 1 ? "hour" : "hours"} left`;
    } else {
        return `${minutes} ${minutes === 1 ? "minute" : "minutes"} left`;
    }
}