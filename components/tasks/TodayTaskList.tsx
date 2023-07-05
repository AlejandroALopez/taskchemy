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
    <div className={"flex flex-col w-1/2"}>
      <div
        className={"flex flex-row w-10/12 items-center justify-between mb-10"}
      >
        <p className={"text-3xl"}>Today's Tasks</p>
        {/* <p>Email: {session?.user?.image}</p> */}
        <button
          onClick={addTaskHandler}
          className={
            "flex items-center justify-center w-12 h-12 bg-dark border-4 border-medium rounded-2xl"
          }
        >
          <p className={"text-3xl text-white"}>+</p>
        </button>
      </div>
      {props.tasks?.length > 0 ? (
        <ul
          className={
            "list-none w-10/12 m-0 p-0 h-80 max-h-80 overflow-scroll overflow-x-hidden"
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
      <div className={"flex justify-center w-10/12"}>
        <button
          onClick={allTasksHandler}
          className={
            "w-1/2 mt-10 bg-dark h-16 border-4 border-medium rounded-2xl"
          }
        >
          <p className={"text-2xl text-white"}>See All Tasks</p>
        </button>
      </div>
    </div>
  );
}

export default TodayTaskList;
