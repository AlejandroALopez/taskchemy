export interface Task {
    id: string,
    title: string,
    completed: boolean
}

export interface TaskProps {
    tasks: Task[]
}
