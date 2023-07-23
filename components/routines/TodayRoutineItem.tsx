import Image from "next/image";
import { useState } from "react";
import { formatDate } from "@/utils/dateFunctions";
import { Routine } from "../../types/RoutineTypes";
import WhiteCheckIcon from "@/public/icons/others/midWhiteCheck.svg";

function TodayRoutineItem(props: Routine) {

  const [completed, setCompleted] = useState(formatDate(new Date()) === props.lastCompleted); // replace with a props var

  function handleRoutineComplete() {
    setCompleted(!completed);
    updateRoutineCompletionHandler(!completed);
  }

  // action for updating a routine completion on the backend
  async function updateRoutineCompletionHandler(newStatus: boolean) {
    let newDaysFollowed : number;
    let newLastCompleted : string;

    if (newStatus) { // now completed, update streak and completion date
      newDaysFollowed = props.daysFollowed + 1;
      newLastCompleted = formatDate(new Date());
    } else { // undo complete, streak - 1 and reset completion date
      newDaysFollowed = props.daysFollowed - 1;
      newLastCompleted = '';
    }

    const enteredData = {
      routineId: props.id,
      newData: {
        title: props.title,
        description: props.description,
        frequency: props.frequency,
        daysFollowed: newDaysFollowed,
        lastCompleted: newLastCompleted,
        userEmail: props.userEmail,
      },
    };

    const response = await fetch("/api/routines/update-routine", {
      method: "PUT",
      body: JSON.stringify(enteredData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
  }

  return (
    <div
      className={
        "flex flex-row items-center justify-between bg-dark my-4 px-4 py-2 rounded-lg drop-shadow-md"
      }
    >
      <p className={"break-words w-8/12 text-lg text-white"}>{props.title}</p>
      <button
        className={
          "flex justify-center items-center w-12 h-12 rounded-full bg-dark border-2 border-white"
        }
        onClick={handleRoutineComplete}
      >
        {completed && <Image src={WhiteCheckIcon} alt="white check" />}
      </button>
    </div>
  );
}

export default TodayRoutineItem;
