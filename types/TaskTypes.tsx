import { Tag } from "./TagTypes"

export interface Task {
    id: string,
    title: string,
    description: string,
    tags: Tag[], // tag ids
    date: number, // in miliseconds
    completed: boolean // false upon creation
}

export interface TaskProps {
    tasks: Task[]
}