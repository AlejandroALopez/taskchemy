export interface Routine {
    id: string,
    title: string,
    description: string,
    frequency: boolean[], // for days of the week 0 to 6
    daysFollowed: number // days the routine was successfully followed
}

export interface RoutineProps {
    routines: Routine[]
}