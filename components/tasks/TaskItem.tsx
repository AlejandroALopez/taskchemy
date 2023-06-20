import { Task } from "../../types/TaskTypes";

function TaskItem(props: Task) {
  return (
    <li className={"flex flex-row w-96 h-16 mb-3"}>
      <div className={"w-20 h-16 border-solid border-blue-400 border-4"} />
      <div className={"flex items-center ml-10 w-full border-4 border-slate-600 rounded-md"}>
          <p className={"text-xl m-4"}>{props.title}</p>
      </div>
    </li>
  );
}

export default TaskItem;
