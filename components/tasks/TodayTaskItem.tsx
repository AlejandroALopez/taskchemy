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
    <li className={"flex flex-row items-center w-11/12 m-3"}>
      <button
        className={
          "flex items-center justify-center w-16 h-14 bg-light border-solid border-regular border-4 rounded-full"
        }
        onClick={handleTaskComplete}
      >
        {completed && <Image src={BigCheckIcon} alt="big check" />}
      </button>
      <div
        className={
          "flex w-full ml-10 bg-lightest border-4 border-light rounded-2xl"
        }
      >
        <p className={"break-words text-lg m-4 lg:text-xl"}>{props.title}</p>
      </div>
    </li>
  );
}

export default TodayTaskItem;
