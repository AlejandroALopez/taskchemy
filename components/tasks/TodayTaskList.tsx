import { useRouter } from "next/router";
import { TaskProps } from "../../types/TaskTypes";
import { formatDate } from "@/utils/dateFunctions";
import TodayTaskItem from "./TodayTaskItem";

function TodayTaskList(props: TaskProps) {
  const router = useRouter();
  const today = formatDate(new Date());

  function addTaskHandler() {
    router.push("/tasks/create"); // move to task creation page
  }

  function allTasksHandler() {
    router.push("/tasks"); // move to task creation page
  }

  return (
    <div className={"flex flex-col w-8/12 md:w-1/2"}>
      <div
        className={"flex flex-row items-center justify-between mb-10 md:w-10/12"}
      >
        <p className={"text-3xl lg:text-3xl md:text-2xl"}>Today's Tasks</p>
        <button
          onClick={addTaskHandler}
          className={
            "flex items-center justify-center px-2 bg-dark border-4 border-medium rounded-xl"
          }
        >
          <p className={"text-3xl text-white"}>+</p>
        </button>
      </div>
      {props.tasks?.length > 0 ? (
        <ul
          className={
            "list-none m-0 p-0 h-80 max-h-80 overflow-scroll overflow-x-hidden md:w-10/12"
          }
        >
          {props.tasks?.map((task) => {
            if (formatDate(new Date(task.date)) === today) {
              return (
                <TodayTaskItem
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  tags={task.tags}
                  date={task.date}
                  completed={task.completed}
                  userEmail={task.userEmail}
                />
              );
            } else return null;
          })}
        </ul>
      ) : (
        <div>
          <p className={"text-lg"}>No active tasks today.</p>
        </div>
      )}
      <div className={"flex justify-center md:w-10/12"}>
        <button
          onClick={allTasksHandler}
          className={
            "px-8 mt-10 bg-dark h-16 border-4 border-medium rounded-2xl"
          }
        >
          <p className={"text-2xl text-white"}>See All Tasks</p>
        </button>
      </div>
    </div>
  );
}

export default TodayTaskList;
