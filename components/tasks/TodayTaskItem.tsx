import { Task } from "../../types/TaskTypes";

function TodayTaskItem(props: Task) {
  return (
    <li className={"flex flex-row w-96 h-16 mb-3"}>
      <div className={"h-16 w-20 bg-light border-solid border-regular border-4 rounded-full"} />
      <div className={"flex items-center ml-10 w-full bg-lightest border-4 border-light rounded-2xl"}>
          <p className={"text-xl m-4"}>{props.title}</p>
      </div>
    </li>
  );
}

export default TodayTaskItem;
