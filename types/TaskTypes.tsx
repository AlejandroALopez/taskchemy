export interface Task {
    id: string,
    title: string,
    description: string,
    tags: string[],
    date: number,
    completed: boolean
}

export interface TaskProps {
    tasks: Task[]
}