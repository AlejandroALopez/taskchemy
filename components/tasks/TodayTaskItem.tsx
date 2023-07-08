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
          completed ? "p-1" : "p-6"
        } bg-light border-regular border-4 rounded-full`}
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
          "flex w-11/12 ml-10 bg-lightest border-4 border-light rounded-2xl"
        }
      >
        <p className={"break-words text-lg m-4 w-11/12 lg:text-xl"}>
          {props.title}
        </p>
      </div>
    </div>
  );
}

export default TodayTaskItem;
