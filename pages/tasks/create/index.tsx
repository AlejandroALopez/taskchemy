import Head from "next/head";
import { useState, Fragment } from "react";
import { useRouter } from "next/router";
import { Tag } from "@/types/TagTypes";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function TaskCreate() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [tags, setTags] = useState([]);
  const [showTags, setShowTags] = useState(false);

  // --------------------------
  // TAG TEST

  const TEST_TAGS: Tag[] = [
    {
      id: "a234567898765",
      name: "Code",
      color: "#ECECEC",
    },
    {
      id: "a234567898765434563",
      name: "Cooking",
      color: "#ECECEC",
    },
    {
      id: "a23456789876548",
      name: "Skill improvement",
      color: "#ECECEC",
    },
    {
      id: "a23456789876548",
      name: "Code improvement",
      color: "#ECECEC",
    },
  ];

  // --------------------------

  function cancelHandler() {
    router.back(); // back to dashboard
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
              {showTags && (
                <div
                  className={
                    "relative top-2 h-5/6 w-5/6 bg-white border-2 border-black rounded-xl"
                  }
                >
                  <div className={"h-4/6 overflow-scroll overflow-x-hidden"}>
                    {TEST_TAGS.map((tag) => (
                      <div
                        className={"flex items-center w-11/12 m-2 p-2 bg-gray-400 rounded-lg border-black border-2"}
                        key={tag.id}
                      >
                        <p>{tag.name}</p>
                        <div className={"w-4 h-4"} />
                      </div>
                    ))}
                  </div>
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

export default TaskCreate;
