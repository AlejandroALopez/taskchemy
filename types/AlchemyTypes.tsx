// Type for keeping track of user's coins. May expand later with things like EXP or LVL
export interface UserStats {
    id: string,
    userId: string,
    coins: number,
}

// Type for the plants on the store
export interface Plant {
    name: string,
    cost: number,
    timeToGrow: number, // in days
    imgShop: any, // small image for the shop
    imgGarden: string, // image for finalized plant on garden (pass to Seed object created after purchase)
}

// Type for seeds the user can acquire and grow
export interface Seed {
    id: string,
    userId: string,
    name: string,
    alias: string, // same as name, but all camel case (useful for the Lab's plant dictionary)
    timeToGrow: number, // in days
    plantedOn: number, // timestamp, when seed was planted
    readyOn: number, // timestamp, when plant ready to collect
    img: null,
}

// Type for each potion recipe the user can access to
export interface PotionRecipe {
    name: string,
    img: null, // img for main display on lab
    thumbnail: null, // small image for the recipe selector
    completed: boolean, // if it was prepared at least once
    ingredients: {
        [key: string]: number, // Name of plant and how many we need. E.g. "plantA": 2
    }
}

// Type for the lab each user gets, with a collection of available recipes, plants collected, and potions made
export interface Lab {
    userId: string,
    recipes: PotionRecipe[], // make 
    plants: {
        [key: string]: number, // Name of plant and how many we have. E.g. "plantB": 3
    }
}


