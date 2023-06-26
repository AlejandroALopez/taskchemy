import Image from "next/image";
import { useState } from "react";
import { Task } from "../../types/TaskTypes";
import DownArrow from "@/public/icons/arrows/down.svg";
import UpArrow from "@/public/icons/arrows/up.svg";
import Edit from "@/public/icons/action/edit.svg";
import Delete from "@/public/icons/action/delete.svg";

function AllTaskItem(props: Task) {
  const [expanded, setExpanded] = useState(false);
  const testTags = [
    "short",
    "ab",
    "long sentence",
    "i dont know",
    "i dont know",
    "short",
    "ab",
    "long sentence",
  ];

  function expandTaskHandler() {
    setExpanded(!expanded);
  }

  return (
    <li className={`flex flex-row w-10/12 ${expanded ? "h-40" : "h-20"} mb-4`}>
      <div
        className={
          "flex flex-col items-center justify-between px-4 w-full border-4 border-gray-400 rounded-3xl"
        }
      >
        <div className={"flex flex-row items-center justify-between w-full"}>
          <div className={"flex flex-row items-center"}>
            <div
              className={"w-10 h-10 border-4 border-gray-400 rounded-full"}
            />
            <p className={"text-xl m-4"}>{props.title}</p>
          </div>
          <button onClick={expandTaskHandler}>
            <Image src={expanded ? UpArrow : DownArrow} alt="arrow down/up" />
          </button>
        </div>
        {expanded && (
          <div className={"flex flex-col justify-start w-full pb-16"}>
            <div className={"w-full h-0.5 bg-gray-500 rounded-md"} />
            <div className={"flex justify-between mt-2"}>
              <p className={"w-5/12 text-start"}>{props.description}</p>
              <div className={"flex flex-row flex-wrap w-5/12 h-14"}>
                {testTags.map((tag, index) => (
                  <div
                    key={index}
                    className={
                      "flex items-center h-1/2 p-2 ml-4 mb-2 bg-gray-300 border-2 border-gray-400 rounded-xl"
                    }
                  >
                    <p>{tag}</p>
                  </div>
                ))}
              </div>
              <div className={"flex flex-row justify-between"}>
                <Image src={Edit} alt="edit" />
                <Image src={Delete} alt="delete" />
              </div>
            </div>
          </div>
        )}
      </div>
    </li>
  );
}

export default AllTaskItem;
