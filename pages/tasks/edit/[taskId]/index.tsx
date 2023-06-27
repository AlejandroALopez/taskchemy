import Head from "next/head";
import { FindOptions, MongoClient, ObjectId } from "mongodb";
import { useState, Fragment } from "react";
import { useRouter } from "next/router";
import { Task } from "@/types/TaskTypes";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function TaskEdit(props: any) {
  const router = useRouter();
  const [title, setTitle] = useState(props.taskData.title);
  const [description, setDescription] = useState(props.taskData.description);
  const [date, setDate] = useState(new Date(props.taskData.date));
  const [tags, setTags] = useState([]); // props.taskData.tags

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

  return (
    <main className={"flex min-h-screen flex-col p-12"}>
      <Fragment>
        <Head>
          <title>Edit Task</title>
          <meta name="description" content="Edit an existing task!" />
        </Head>
        <div className={"flex flex-col w-10/12"}>
          <p className={"text-3xl mb-10"}>Edit Task</p>
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
            <div className={"w-4/12"}>
              <p className={"text-xl mb-4"}>Tags</p>
              <button className={"border-2 border-black rounded-2xl px-3 py-2"}>
                <p>+ Add tag</p>
              </button>
            </div>
            <div>
              <p className={"text-xl mb-4"}>Date to complete</p>
              <p className={"text-xl mb-4"}>(Select date from calendar)</p>
            </div>
            <Calendar
              onChange={(event: any) => setDate(event)}
              value={date}
              minDate={date.getTime() <= new Date().getTime() ? date : new Date()}
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
              onClick={submitHandler}
            >
              <p className={"text-3xl"}>Update Task</p>
            </button>
          </div>
        </div>
      </Fragment>
    </main>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    process.env.MONGO_URL || ''
  );

  const db = client.db();
  const tasksCollection = db.collection("tasks");

  // const options: FindOptions<Document> = { _id: 1 };
  const tasks = await tasksCollection.find({}).toArray(); // filter, fields to extract

  client.close();

  return {
    fallback: 'blocking', // false = all supported values in paths, true otherwise
    paths: tasks.map((task) => ({
      params: { taskId: task._id.toString() },
    })),
  };
}

export async function getStaticProps(context: any) {
  // fetch data for a single meetup
  const taskId = context.params.taskId;

  const client = await MongoClient.connect(
    process.env.MONGO_URL || ''
  );

  const db = client.db();
  const tasksCollection = db.collection("tasks");

  const selectedTask = await tasksCollection.findOne({
    _id: new ObjectId(taskId),
  });

  client.close();

  return {
    props: {
      taskData: {
        id: selectedTask?._id.toString(),
        title: selectedTask?.title,
        description: selectedTask?.description,
        tags: selectedTask?.tags,
        date: selectedTask?.date,
      },
    },
  };
}

export default TaskEdit;
