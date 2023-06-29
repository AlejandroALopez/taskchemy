import { useRouter } from "next/router";
import { TaskProps } from "../../types/TaskTypes";
import { formatDate } from "@/utils/dateFunctions";
import AllTaskItem from "./AllTaskItem";

function AllTaskList(props: TaskProps) {
  const router = useRouter();
  const today: string = formatDate(new Date());
  let dateIter: string = ""; // to group up dates with tasks in order

  function addTaskHandler() {
    router.push("/tasks/create"); // move to task creation page
  }

  function sortTagHandler() {
    console.log("sort by tag");
  }

  return (
    <div className={"flex flex-col"}>
      <div
        className={"flex flex-row w-10/12 items-center justify-between mb-10"}
      >
        <p className={"text-3xl"}>My Tasks</p>
        <button
          onClick={addTaskHandler}
          className={
            "w-12 h-12 bg-gray-300 border-4 border-gray-500 rounded-md"
          }
        >
          <p className={"text-2xl"}>+</p>
        </button>
        <div className="flex items-center w-6/12 h-12 bg-gray-300  border-4 border-gray-500 rounded-2xl">
          <input className="m-4 w-full bg-gray-300" placeholder="Search" />
        </div>
        <button
          onClick={sortTagHandler}
          className={
            "w-32 h-12 bg-gray-200 border-4 border-slate-600 rounded-md"
          }
        >
          <p className={"text-md"}>Sort by Tags</p>
        </button>
      </div>
      {props.tasks.length > 0 ? (
        <ul
          className={
            "list-none m-0 p-0 max-h-96 overflow-y-scroll overflow-x-hidden"
          }
        >
          {props.tasks.map((task, index) => {
            const formattedDate = formatDate(new Date(task.date));
            const sameDate = dateIter === formattedDate; // if false, new header
            dateIter = formattedDate;

            return (
              <>
                {!sameDate && (
                  <div className={`${index === 0 ? '': 'mt-8'}`}>
                    <p className={"text-2xl text-gray-500"}>
                      {formattedDate === today ? 'Today' : formattedDate}
                    </p>
                    <div className={"w-10/12 h-1 bg-gray-400 mb-4 rounded-3xl"} />
                  </div>
                )}
                <AllTaskItem
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  tags={task.tags}
                  date={task.date}
                  completed={task.completed}
                />
              </>
            );
          })}
        </ul>
      ) : (
        <div>
          <p className={"text-lg"}>
            No tasks. Click the + button above to make some!
          </p>
        </div>
      )}
    </div>
  );
}

export default AllTaskList;
