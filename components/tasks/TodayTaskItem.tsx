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
    <li className={"flex flex-row items-center w-96 h-16 m-3"}>
      <button
        className={
          "flex items-center justify-center h-16 w-20 bg-light border-solid border-regular border-4 rounded-full"
        }
        onClick={handleTaskComplete}
      >
        {completed && <Image src={BigCheckIcon} alt="big check" />}
      </button>
      <div
        className={
          "flex items-center ml-10 w-full bg-lightest border-4 border-light rounded-2xl"
        }
      >
        <p className={"text-xl m-4"}>{props.title}</p>
      </div>
    </li>
  );
}

export default TodayTaskItem;
