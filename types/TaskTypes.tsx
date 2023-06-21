export interface Task {
    id: string,
    title: string,
    tags: string[],
    description: string,
    date: string,
    completed: boolean
}

export interface TaskProps {
    tasks: Task[]
}