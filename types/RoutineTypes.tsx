export interface Routine {
    id: string,
    title: string,
    description: string,
    frequency: number[], // days of the week from 0 to 6
}

export interface RoutineProps {
    routines: Routine[]
}