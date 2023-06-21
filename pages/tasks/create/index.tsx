import Head from "next/head";
import { useState, Fragment } from "react";
import { useRouter } from "next/router";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function TaskCreate() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [dateOption, setOption] = useState("");
  const [tags, setTags] = useState([]);

  function cancelHandler() {
    router.push("/"); // back to dashboard
  }

  function addTaskHandler(event: any) {
    event.preventDefault();

    const taskData = {
      title: title,
      description: description,
      tags: tags,
      date: date.getTime(),
    };

    console.log(taskData);
    // props.onAddTask(taskData);
    router.push("/");
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
            <p className={"text-xl mr-12"}>Task</p>
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
            <div className={"w-4/12"}>
              <p className={"text-xl mb-4"}>Tags</p>
              <button className={"border-2 border-black rounded-2xl px-3 py-2"}>
                <p>+ Add tag</p>
              </button>
            </div>
            <div>
              <p className={"text-xl mb-4"}>Date to complete</p>
              <ul className={"flex flex-col"}>
                <li className={"flex flex-row items-center mb-4"}>
                  <div
                    className={
                      "border-2 border-black w-10 h-10 bg-slate-200 rounded-full"
                    }
                  />
                  <p className={"text-lg ml-3"}>Today</p>
                </li>
                <li className={"flex flex-row items-center mb-4"}>
                  <div
                    className={
                      "border-2 border-black w-10 h-10 bg-slate-200 rounded-full"
                    }
                  />
                  <p className={"text-lg ml-3"}>Tomorrow</p>
                </li>
                <li className={"flex flex-row items-center mb-4"}>
                  <div
                    className={
                      "border-2 border-black w-10 h-10 bg-slate-200 rounded-full"
                    }
                  />
                  <p className={"text-lg ml-3"}>Select day</p>
                </li>
              </ul>
            </div>
            <Calendar
              onChange={(event: any) => setDate(event)}
              value={date}
              minDate={new Date()}
            />
          </div>
          <div className={"flex flex-row justify-between mt-4"}>
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
              onClick={addTaskHandler}
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
