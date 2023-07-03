import Image from "next/image";
import { useState } from "react";
import { Routine } from "../../types/RoutineTypes";
import BigCheckIcon from "@/public/icons/others/bigCheck.svg";

function TodayRoutineItem(props: Routine) {
  const [completed, setCompleted] = useState(false); // replace with a props var

  function handleRoutineComplete() {
    setCompleted(!completed);
    // updateRoutineCompletionHandler(!completed);
  }

  return (
    <div
      className={
        "flex flex-row items-center justify-between bg-regular my-4 px-4 py-2 rounded-lg"
      }
    >
      <p className={"w-8/12 text-lg text-white"}>{props.title}</p>
      <button
        className={
          "flex justify-center items-center w-12 h-12 rounded-full bg-lightest border-4 border-medium"
        }
        onClick={handleRoutineComplete}
      >
        {completed && <Image src={BigCheckIcon} alt="big check" />}
      </button>
    </div>
  );
}

export default TodayRoutineItem;
