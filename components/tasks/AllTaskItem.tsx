import Image from "next/image";
import { useRouter } from 'next/router';
import { useState } from "react";
import { Task } from "../../types/TaskTypes";
import { Tag } from "@/types/TagTypes";

import DownArrow from "@/public/icons/arrows/down.svg";
import UpArrow from "@/public/icons/arrows/up.svg";
import Edit from "@/public/icons/action/edit.svg";
import Delete from "@/public/icons/action/delete.svg";

function AllTaskItem(props: Task) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);

  function expandTaskHandler() {
    setExpanded(!expanded);
  }

  function editTaskHandler() {
    router.push('/tasks/edit/' + props.id);
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
                {props.tags.map((tag: Tag, index: number) => (
                  <div
                    key={index}
                    className={
                      "flex items-center h-1/2 p-2 ml-4 mb-2 bg-gray-300 border-2 border-gray-400 rounded-xl"
                    }
                  >
                    <p>{tag.name}</p>
                  </div>
                ))}
              </div>
              <div className={"flex flex-row justify-between"}>
                <button
                onClick={editTaskHandler}
                >
                  <Image src={Edit} alt="edit" />
                </button>
                <button>
                  <Image src={Delete} alt="delete" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </li>
  );
}

export default AllTaskItem;
