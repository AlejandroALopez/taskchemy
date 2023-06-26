import { useRouter } from "next/router";
import { TaskProps } from "../../types/TaskTypes";
import TodayTaskItem from "./TodayTaskItem";

function TodayTaskList(props: TaskProps) {
  const router = useRouter();

  function addTaskHandler() {
    router.push("/tasks/create"); // move to task creation page
  }

  function allTasksHandler() {
    router.push("/tasks"); // move to task creation page
  }

  return (
    <div className={"flex flex-col min-w-fit"}>
      <div className={"flex flex-row w-5/12 items-center justify-between mb-10"}>
        <p className={"text-3xl"}>Today's Tasks</p>
        <button
          onClick={addTaskHandler}
          className={
            "w-12 h-12 bg-gray-300 border-4 border-gray-500 rounded-md"
          }
        >
          <p className={"text-2xl"}>+</p>
        </button>
      </div>
      {props.tasks.length > 0 ? (
        <ul
          className={
            "list-none w-5/12 m-0 p-0 max-h-80 overflow-scroll overflow-x-hidden"
          }
        >
          {props.tasks.map((task) => (
            <TodayTaskItem
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              tags={task.tags}
              date={task.date}
              completed={task.completed}
            />
          ))}
        </ul>
      ) : (
        <div>
          <p className={"text-lg"}>
            No active tasks today.
          </p>
        </div>
      )}
      <button
        onClick={allTasksHandler}
        className={
          "w-5/12 mt-10 bg-gray-400 h-24 border-4 border-slate-600 rounded-md"
        }
      >
        <p className={"text-4xl"}>See All Tasks</p>
      </button>
    </div>
  );
}

export default TodayTaskList;
