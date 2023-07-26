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
    <div className={"flex flex-col w-full"}>
      <div
        className={
          "flex flex-col w-full md:w-11/12 justify-between mb-10 md:flex-row md:items-center"
        }
      >
        <div className={"flex flex-row items-center m-2 md:w-3/12"}>
          <p className={"text-3xl font-medium text-black"}>My Tasks</p>
          <button
            onClick={addTaskHandler}
            className={
              "w-12 h-12 ml-8 bg-regular rounded-xl drop-shadow-md"
            }
          >
            <p className={"text-4xl text-white mb-1"}>+</p>
          </button>
        </div>
        {/* <div className={"flex flex-row md:w-9/12 m-2 md:px-4 items-center justify-between"}>
          <div className="flex items-center w-1/2 md:w-8/12 h-12 bg-white border-2 border-alternate rounded-2xl">
            <input className="m-4 w-full bg-white" placeholder="Search" />
          </div>
          <button
            onClick={sortTagHandler}
            className={"w-32 h-12 bg-regular rounded-xl drop-shadow-md"}
          >
            <p className={"text-md text-white"}>Sort by Tags</p>
          </button>
        </div> */}
      </div>
      {props.tasks.length > 0 ? (
        <ul
          className={
            "list-none w-full md:w-11/12 m-0 p-0 overflow-y-scroll max-h-[32rem] overflow-x-hidden"
          }
        >
          {props.tasks.map((task, index) => {
            const formattedDate = formatDate(new Date(task.date));
            const sameDate = dateIter === formattedDate; // if false, new header
            dateIter = formattedDate;

            return (
              <div key={task.id}>
                {!sameDate && (
                  <div className={`${index === 0 ? "" : "mt-8"}`}>
                    <p className={"text-2xl text-black"}>
                      {formattedDate === today ? "Today" : formattedDate}
                    </p>
                    <div className={"w-11/12 h-1 bg-black mb-4 rounded-3xl"} />
                  </div>
                )}
                <AllTaskItem
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  tags={task.tags}
                  date={task.date}
                  completed={task.completed}
                  userEmail={task.userEmail}
                />
              </div>
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
