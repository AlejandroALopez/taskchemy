import Head from "next/head";
import Image from "next/image";
import { useState, Fragment } from "react";
import { useRouter } from "next/router";
import { Tag } from "@/types/TagTypes";
import { getTagsHandler } from "@/actions/tagActions";
import CheckIcon from "@/public/icons/others/check.svg";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function TaskCreate(props: any) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [tags, setTags] = useState<Tag[]>([]);
  const [showTags, setShowTags] = useState(false);

  // adapted from https://stackoverflow.com/questions/13964155/get-javascript-object-from-array-of-objects-by-value-of-property
  function findTagById(array: Array<any>, id: any): Tag | undefined {
    var result = array.find((obj) => {
      return obj.id === id;
    });

    return result;
  }

  function removeTagHandler(tag: Tag) {
    setTags(tags.filter((item) => item.id !== tag.id));
  }

  // --------------------------

  function cancelHandler() {
    router.back();
  }

  // action for creating a task
  async function createTaskHandler(enteredTaskData: any) {
    const response = await fetch("/api/new-task", {
      method: "POST",
      body: JSON.stringify(enteredTaskData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    router.replace("/");
  }

  function submitHandler(event: any) {
    event.preventDefault();

    const taskData = {
      title: title,
      description: description,
      tags: tags,
      date: date.getTime(),
      completed: false,
    };

    createTaskHandler(taskData);
  }

  function toggleShowTags() {
    setShowTags(!showTags);
  }

  return (
    <main className={"flex min-h-screen flex-col p-12"}>
      <Fragment>
        <Head>
          <title>Create Task</title>
          <meta name="description" content="Create a new task!" />
        </Head>
        <div className={"flex flex-col w-10/12"}>
          <p className={"text-3xl mb-10"}>Create Task</p>
          <div className={"flex flex-row mb-6 justify-between"}>
            <p className={"text-xl mr-12"}>Title</p>
            <input
              onChange={(event: any) => setTitle(event.target.value)}
              value={title}
              className={"w-9/12"}
              placeholder="Task title"
            />
          </div>
          <div className={"flex flex-row mb-6 justify-between"}>
            <p className={"text-xl mr-12"}>Description (optional)</p>
            <textarea
              className={"w-9/12"}
              placeholder="Task description"
              rows={3}
              value={description}
              onChange={(event: any) => setDescription(event.target.value)}
            />
          </div>
          <div className={"flex flex-row my-6 justify-between"}>
            <div className={"w-4/12 max-h-full"}>
              <div className={"flex flex-row items-center"}>
                <p className={"text-xl mr-4"}>Tags</p>
                <button
                  onClick={toggleShowTags}
                  className={"border-2 border-black rounded-2xl px-3 py-2"}
                >
                  <p>+ Add tag</p>
                </button>
              </div>
              {showTags ? (
                <div
                  className={
                    "relative z-10 top-2 h-5/6 w-5/6 bg-white border-2 border-black rounded-xl"
                  }
                >
                  <div className={"h-4/6 overflow-scroll overflow-x-hidden"}>
                    {props.availableTags.map((tag: Tag) => (
                      <button
                        className={`flex justify-between items-center w-11/12 m-2 p-2 rounded-lg border-black border-2 ${
                          findTagById(tags, tag.id)
                            ? "bg-gray-400"
                            : "bg-gray-200"
                        }`}
                        key={tag.id}
                        onClick={() => {
                          if (findTagById(tags, tag.id)) {
                            setTags(tags.filter((item) => item.id !== tag.id));
                          } else {
                            setTags((oldTags) => [...oldTags, tag]);
                          }
                        }}
                      >
                        <p>{tag.name}</p>
                        <div
                          className={
                            "flex justify-center items-center w-6 h-6 bg-white"
                          }
                        >
                          {findTagById(tags, tag.id) && (
                            <Image src={CheckIcon} alt="check" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  className={
                    "w-full h-5/6 mt-2 overflow-scroll overflow-x-hidden"
                  }
                >
                  {tags.map((tag) => (
                    <button
                      key={tag.id}
                      onClick={() => removeTagHandler(tag)}
                      className={"bg-black rounded-2xl px-3 py-2 m-0.5"}
                    >
                      <p className={"text-white"}>{tag.name}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div>
              <p className={"text-xl mb-4"}>Date to complete</p>
              <p className={"text-xl mb-4"}>(Select date from calendar)</p>
            </div>
            <Calendar
              onChange={(event: any) => setDate(event)}
              value={date}
              minDate={new Date()}
            />
          </div>
          <div className={"flex flex-row justify-between mt-6"}>
            <button
              className={
                "w-72 h-20 bg-gray-200 border-4 border-black rounded-2xl"
              }
              onClick={cancelHandler}
            >
              <p className={"text-3xl"}>Cancel</p>
            </button>
            <button
              className={
                "w-72 h-20 bg-gray-200 border-4 border-black rounded-2xl"
              }
              onClick={submitHandler}
            >
              <p className={"text-3xl"}>+ Add Task</p>
            </button>
          </div>
        </div>
      </Fragment>
    </main>
  );
}

export async function getStaticProps() {
  const availableTags = await getTagsHandler();

  return {
    props: {
      availableTags: availableTags.map((tag: any) => ({
        id: tag._id.toString(),
        name: tag.name,
        color: tag.color,
      })),
    },
    revalidate: 1,
  };
}

export default TaskCreate;
