import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { RoutineColorProps } from "../../types/RoutineTypes";
import { DAYS_OF_WEEK } from "../../utils/constants";

import EditIcon from "@/public/icons/action/editWhite.svg";
import DeleteIcon from "@/public/icons/action/deleteWhite.svg";

function RoutineItem(props: RoutineColorProps) {
  const router = useRouter();
  const [deleted, setDeleted] = useState(false);
  const [deleteWarning, setDeleteWarning] = useState(false);
  const DAYS: string[] = ["S", "M", "T", "W", "T", "F", "S"];
  const ROUTINE_COLORS: string[] = [
    "bg-[#246b3f]",
    "bg-[#24386b]",
    "bg-[#6b2424]",
  ]; // green, blue, red
  const routineColor: string =
    ROUTINE_COLORS[props.index % ROUTINE_COLORS.length];

  // action for deleting this routine
  async function deleteRoutineHandler() {
    const response = await fetch(`/api/routines/${props.routineObj.id}`, {
      method: "DELETE",
    });

    const data = await response.json();
    setDeleted(true);
  }

  function editRoutineHandler() {
    router.push("/routines/edit/" + props.routineObj.id);
  }

  function toggleWarning() {
    setDeleteWarning(!deleteWarning);
  }

  return (
    <>
      {!deleted && (
        <li className={"flex flex-row w-11/12 mb-10"}>
          <div
            className={`flex flex-row justify-between items-center w-full p-4 ${routineColor} border-4 border-darkest rounded-3xl`}
          >
            <div className={"flex flex-col"}>
              <p className={"text-2xl m-4 text-white"}>
                {props.routineObj.title}
              </p>
              <div className={"flex flex-row"}>
                {[...Array(7)].map((value: undefined, index: number) => (
                  <div
                    key={index}
                    className={`h-8 w-8 ml-4 rounded-full border-2 border-black ${
                      props.routineObj.frequency[index] ? "bg-white" : ""
                    }`}
                  >
                    <p
                      className={`text-lg text-center ${
                        props.routineObj.frequency[index]
                          ? "text-black"
                          : "text-white"
                      }`}
                    >
                      {DAYS_OF_WEEK[index]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className={"mx-20"}>
              <p className={"text-lg text-center text-white"}>
                Streak: {props.routineObj.daysFollowed} days
              </p>
            </div>
            {deleteWarning ? (
              <div
                className={"flex flex-row items-center justify-evenly w-3/12"}
              >
                <p className={"text-lg text-white"}>Delete?</p>
                <button
                  className={"bg-green-400 p-2 rounded-xl"}
                  onClick={deleteRoutineHandler}
                >
                  Yes
                </button>
                <button
                  className={"bg-red-400 p-2 rounded-xl"}
                  onClick={toggleWarning}
                >
                  No
                </button>
              </div>
            ) : (
              <div className={"flex flex-row-reverse items-center w-3/12"}>
                <button onClick={toggleWarning}>
                  <Image src={DeleteIcon} alt="delete" />
                </button>
                <button onClick={editRoutineHandler}>
                  <Image src={EditIcon} alt="edit" />
                </button>
              </div>
            )}
          </div>
        </li>
      )}
    </>
  );
}

export default RoutineItem;
