export interface Routine {
    id: string,
    title: string,
    description: string,
    frequency: boolean[], // for days of the week 0 to 6
    daysFollowed: number, // days the routine was successfully followed
    lastCompleted: string, // last day formatted, '' by default
    userEmail: string
}

export interface RoutineProps {
    routines: Routine[]
}

export interface RoutineColorProps {
    routineObj: Routine,
    index: number, // for color variation purposes
}