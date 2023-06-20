import { useRouter } from "next/router";
import { TaskProps } from "../../types/TaskTypes";
import TaskItem from "./TaskItem";

function TaskList(props: TaskProps) {
  const router = useRouter();

  function addTaskHandler() {
    router.push("/tasks/create"); // move to task creation page
  }

  function allTasksHandler() {
    router.push("/tasks"); // move to task creation page
  }

  return (
    <div className={"flex flex-col min-w-fit"}>
      <div className={"flex flex-row justify-between"}>
        <p className={"text-3xl mb-10"}>Today's Tasks</p>
        <button onClick={addTaskHandler} className={"w-12 h-10 bg-stone-500 border-4 border-slate-600 rounded-md"}>
          <p className={"text-2xl"}>+</p>
        </button>
      </div>
      <ul className={"list-none m-0 p-0 max-h-80 overflow-scroll overflow-x-hidden"}>
        {props.tasks.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            title={task.title}
            completed={task.completed}
          />
        ))}
      </ul>
      <button onClick={allTasksHandler} className={"mt-10 bg-gray-400 h-24 border-4 border-slate-600 rounded-md"}>
        <p className={"text-4xl"}>See All Tasks</p>
      </button>
    </div>
  );
}

export default TaskList;