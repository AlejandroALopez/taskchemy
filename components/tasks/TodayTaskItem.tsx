import Image from "next/image";
import { useState } from "react";
import { Task } from "../../types/TaskTypes";
import BigCheckIcon from "@/public/icons/others/bigCheck.svg";

function TodayTaskItem(props: Task) {
  const [completed, setCompleted] = useState(props.completed);

  // action for updating a task completion on the backend
  async function updateTaskCompletionHandler(status: boolean) {
    const enteredData = {
      taskId: props.id,
      newData: {
        title: props.title,
        description: props.description,
        tags: props.tags,
        date: props.date,
        userEmail: props.userEmail,
        completed: status,
      },
    };

    const response = await fetch("/api/tasks/update-task", {
      method: "PUT",
      body: JSON.stringify(enteredData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
  }

  function handleTaskComplete() {
    setCompleted(!completed);
    updateTaskCompletionHandler(!completed);
  }

  return (
    <div className={"flex flex-row items-center justify-between w-11/12 m-3"}>
      <button
        className={`flex items-center justify-center ${
          completed ? "p-1 border-regular" : "p-6 border-alternate"
        } border-2 rounded-full drop-shadow-md`}
        onClick={handleTaskComplete}
      >
        {completed && (
          <div className={"relative w-[40px] h-[40px]"}>
            <Image src={BigCheckIcon} alt="big check" />
          </div>
        )}
      </button>
      <div
        className={
          "flex w-11/12 ml-10 bg-white rounded-2xl drop-shadow-md"
        }
      >
        <p className={"break-words text-lg m-4 w-11/12 lg:text-xl text-black"}>
          {props.title}
        </p>
      </div>
    </div>
  );
}

export default TodayTaskItem;
