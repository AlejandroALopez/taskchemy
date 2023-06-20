import { useRouter } from "next/router";
import { TaskProps } from "../../types/TaskTypes";
import TaskItem from "./TaskItem";

function TaskList(props: TaskProps) {
  const router = useRouter();

  function addTaskHandler() {
    // navigate programatically
    router.push("/create-task"); // push new page with meeting id
  }

  return (
    <div className={"flex flex-col"}>
      <div className={"flex flex-row justify-between"}>
        <p className={"text-3xl mb-10"}>Today's Tasks</p>
        <button onClick={addTaskHandler} className={"w-16 h-10 bg-stone-500"}>
          <p className={"text-3xl"}>+</p>
        </button>
      </div>
      <ul className={"list-none m-0 p-0"}>
        {props.tasks.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            title={task.title}
            completed={task.completed}
          />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
