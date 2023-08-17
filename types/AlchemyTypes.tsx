// Type for keeping track of user's coins. May expand later with things like EXP or LVL
export interface UserStats {
    id: string,
    userEmail: string,
    coins: number,
}

// Type for the plants on the store
export interface Plant {
    name: string,
    alias: string,
    cost: number,
    timeToGrow: number, // in days
    imgShop: any, // small image for the shop
    imgIndex: number, // image index for finalized plant on garden (pass to Seed object created after purchase)
}

// Type for seeds the user can acquire and grow
export interface Seed {
    id: string,
    userEmail: string,
    name: string,
    alias: string, // same as name, but all camel case (useful for the Lab's plant dictionary)
    timeToGrow: number, // in days
    plantedOn: number, // timestamp, when seed was planted
    readyOn: number, // timestamp, when plant ready to collect
    imgIndex: number, // index for array with svg items
}

// Type for each potion recipe the user discovers
// Intended to exist already, so the user tries to unlock them by experimenting at the lab
export interface PotionRecipe {
    name: string,
    imgIndex: number, // img index for main display on lab and thumbnail
    ingredients: {
        [key: string]: number, // Alias of plant and how many we need. E.g. "plantA": 2
    }
}

// Type for the lab each user gets, with a collection of available recipes, plants collected, and potions made
export interface Lab {
    id: string,
    userEmail: string,
    recipes: PotionRecipe[], // List of potion recipes discovered so far
    plants: {
        [key: string]: number, // Alias of plant and how many we have. E.g. "plantB": 3
    }
}


