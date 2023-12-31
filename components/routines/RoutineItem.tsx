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
    "bg-[#1B7E43]",
    "bg-[#1B377E]",
    "bg-[#7E1B1B]",
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
        <li className={"flex flex-col lg:flex-row w-11/12 mb-10"}>
          <div
            className={`flex flex-col lg:flex-row justify-between lg:items-center w-full p-6 ${routineColor} rounded-3xl drop-shadow-md`}
          >
            <div className={"flex flex-col lg:w-6/12"}>
              <p className={"text-2xl m-4 text-white"}>
                {props.routineObj.title}
              </p>
              <div className={"flex flex-row flex-wrap"}>
                {[...Array(7)].map((value: undefined, index: number) => (
                  <div
                    key={index}
                    className={`flex items-center px-2 ml-4 rounded-full border-2 border-black ${
                      props.routineObj.frequency[index] ? "bg-white" : ""
                    }`}
                  >
                    <p
                      className={`text-md md:text-lg text-center ${
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
            <div className={"m-4 lg:w-2/12"}>
              <p className={"text-lg text-center text-white"}>
                Streak: {props.routineObj.daysFollowed} days
              </p>
            </div>
            {deleteWarning ? (
              <div
                className={
                  "flex flex-row items-center justify-center lg:justify-startlg:w-3/12"
                }
              >
                <p className={"text-lg text-white mr-2"}>Delete?</p>
                <button
                  className={"bg-green-400 p-2 rounded-xl mr-2 transition hover:scale-110 duration-300"}
                  onClick={deleteRoutineHandler}
                >
                  Yes
                </button>
                <button
                  className={"border-2 border-white p-2 rounded-xl mr-2 transition hover:scale-110 duration-300"}
                  onClick={toggleWarning}
                >
                  No
                </button>
              </div>
            ) : (
              <div
                className={
                  "flex flex-row-reverse items-center justify-center lg:justify-startlg:w-3/12"
                }
              >
                <button
                  className={"relative w-10 lg:w-[60px] h-10 lg:h-[60px] transition hover:scale-110 duration-300"}
                  onClick={toggleWarning}
                >
                  <Image src={DeleteIcon} alt="delete" />
                </button>
                <button
                  className={"relative w-10 lg:w-[60px] h-10 lg:h-[60px] transition hover:scale-110 duration-300"}
                  onClick={editRoutineHandler}
                >
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
