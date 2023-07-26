import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { Task } from "../../types/TaskTypes";
import { Tag } from "@/types/TagTypes";

import DownArrow from "@/public/icons/arrows/down.svg";
import UpArrow from "@/public/icons/arrows/up.svg";
import Edit from "@/public/icons/action/edit.svg";
import Delete from "@/public/icons/action/delete.svg";
import BigCheck from "@/public/icons/others/bigCheck.svg";

function AllTaskItem(props: Task) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [deleteWarning, setDeleteWarning] = useState(false);

  // action for deleting this task
  async function deleteTaskHandler() {
    const response = await fetch(`/api/tasks/${props.id}`, {
      method: "DELETE",
    });

    const data = await response.json();
    setDeleted(true);
  }

  function expandTaskHandler() {
    setExpanded(!expanded);
  }

  function editTaskHandler() {
    router.push("/tasks/edit/" + props.id);
  }

  function toggleWarning() {
    setDeleteWarning(!deleteWarning);
  }

  return (
    <>
      {!deleted && (
        <li
          className={`flex flex-row w-11/12 ${
            expanded ? "h-64 md:h-40" : "h-fit"
          } mb-4`}
        >
          <div
            className={
              "flex flex-col items-center justify-between px-4 py-2 w-full bg-white rounded-3xl drop-shadow-md"
            }
          >
            <div
              className={"flex flex-row items-center justify-between w-full"}
            >
              <div className={"flex flex-row items-center"}>
                <div
                  className={`flex items-center justify-center ${
                    props.completed ? "border-regular" : "border-alternate p-5"
                  } border-2 rounded-full`}
                >
                  {props.completed && (
                    <div className={"relative w-[40px] h-[40px]"}>
                      <Image src={BigCheck} alt="big check" />
                    </div>
                  )}
                </div>
                <p className={"max-w-8/12 text-lg md:text-xl m-4 line-clamp-1 text-black"}>
                  {props.title}
                </p>
              </div>
              <button onClick={expandTaskHandler} className={"transition hover:scale-110 duration-300"}>
                <div className={"relative w-[60px] h-[60px]"}>
                  <Image
                    src={expanded ? UpArrow : DownArrow}
                    alt="arrow down/up"
                  />
                </div>
              </button>
            </div>
            {expanded && (
              <div
                className={"flex flex-col justify-start w-full pb-32 md:pb-16"}
              >
                <div className={"w-full h-0.5 bg-regular rounded-md"} />
                <div
                  className={"flex flex-col md:flex-row justify-between mt-2"}
                >
                  <p
                    className={
                      "w-full md:w-5/12 text-sm md:text-md h-16 text-start text-black"
                    }
                  >
                    {props.description}
                  </p>
                  <div className={"flex flex-row flex-wrap justify-center md:w-5/12"}>
                    {props.tags.map((tag: string, index: number) => (
                      <div
                        key={index}
                        className={
                          "flex items-center h-1/2 p-2 ml-4 mb-2 bg-regular rounded-lg"
                        }
                      >
                        <p className={"text-white"}>{tag}</p>
                      </div>
                    ))}
                  </div>
                  {deleteWarning ? (
                    <div
                      className={
                        "flex flex-row items-center justify-center lg:justify-startlg:w-3/12 gap-2"
                      }
                    >
                      <p className={"text-lg mr-2"}>Delete?</p>
                      <button
                        className={"bg-regular p-2 rounded-xl mr-2 transition hover:scale-110 duration-300"}
                        onClick={deleteTaskHandler}
                      >
                        <p className={"text-white"}>Yes</p>
                      </button>
                      <button
                        className={"bg-white border-2 border-alternate p-2 rounded-xl mr-2 transition hover:scale-110 duration-300"}
                        onClick={toggleWarning}
                      >
                        <p className={"text-alternate"}>No</p>
                      </button>
                    </div>
                  ) : (
                    <div
                      className={
                        "flex flex-row-reverse md:justify-start justify-evenly md:items-start w-full md:w-3/12 gap-2"
                      }
                    >
                      <button onClick={toggleWarning} className={"transition hover:scale-110 duration-300"}>
                        <Image src={Delete} alt="delete" />
                      </button>
                      <button onClick={editTaskHandler} className={"transition hover:scale-110 duration-300"}>
                        <Image src={Edit} alt="edit" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </li>
      )}
    </>
  );
}

export default AllTaskItem;
