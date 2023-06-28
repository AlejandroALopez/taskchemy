export interface Task {
    id: string,
    title: string,
    description: string,
    tags: string[], // tag ids
    date: number, // in miliseconds
    completed: boolean // false upon creation
}

export interface TaskProps {
    tasks: Task[]
}