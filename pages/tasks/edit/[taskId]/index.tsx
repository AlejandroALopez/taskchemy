import Head from "next/head";
import Image from "next/image";
import { useState, Fragment } from "react";
import { useRouter } from "next/router";
import { getTagsHandler } from "@/actions/tagActions";
import { getTasksHandler, getOneTaskHandler } from "@/actions/taskActions";
import { Tag } from "@/types/TagTypes";
import CheckIcon from "@/public/icons/others/check.svg";
import AddIcon from "@/public/icons/action/add.svg";
import PenIcon from "@/public/icons/others/pen.svg";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function TaskEdit(props: any) {
  const router = useRouter();
  const [title, setTitle] = useState(props.taskData.title);
  const [description, setDescription] = useState(props.taskData.description);
  const [date, setDate] = useState(new Date(props.taskData.date));
  const [tags, setTags] = useState<Tag[]>(props.taskData.tags);
  const [showTags, setShowTags] = useState(false);
  const [newTagName, setNewTagName] = useState("");

  function cancelHandler() {
    router.back(); // back to dashboard
  }

  function toggleShowTags() {
    setShowTags(!showTags);
  }

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

  // action for updating a task
  async function updateTaskHandler(enteredTaskData: any) {
    const response = await fetch("/api/update-task", {
      method: "PUT",
      body: JSON.stringify(enteredTaskData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    router.replace("/tasks");
  }

  function submitHandler(event: any) {
    event.preventDefault();

    const enteredData = {
      taskId: props.taskData.id,
      newData: {
        title: title,
        description: description,
        tags: tags,
        date: date.getTime(),
        completed: props.taskData.completed,
      },
    };

    updateTaskHandler(enteredData);
  }

  // action for creating a tag
  async function createTagHandler(enteredTagData: any) {
    const response = await fetch("/api/new-tag", {
      method: "POST",
      body: JSON.stringify(enteredTagData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
  }

  function handleNewTag(event: any) {
    event.preventDefault();

    const newTagData = {
      name: newTagName,
      color: "#CECECE",
    };

    createTagHandler(newTagData);
    setNewTagName("");
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
              className={"w-9/12 border-2 border-dark rounded-lg px-2"}
              placeholder="Task title"
            />
          </div>
          <div className={"flex flex-row mb-6 justify-between"}>
            <p className={"text-xl mr-12"}>Description (optional)</p>
            <textarea
              className={"w-9/12 border-2 border-dark rounded-lg px-2"}
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
                  className={
                    "border-2 bg-regular border-medium rounded-2xl px-3 py-2"
                  }
                >
                  <p className={"text-white"}>+ Add tag</p>
                </button>
              </div>
              {showTags ? (
                <div
                  className={
                    "relative z-10 top-2 h-4/6 w-5/6 bg-white border-2 border-black rounded-xl"
                  }
                >
                  <div className={"h-4/6 overflow-scroll overflow-x-hidden"}>
                    {props.availableTags.map((tag: Tag) => (
                      <button
                        className={`flex justify-between items-center w-11/12 m-2 p-2 rounded-lg border-black border-2 ${
                          findTagById(tags, tag.id)
                            ? "bg-regular"
                            : "bg-lightest"
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
                            "flex justify-center items-center w-6 h-6 bg-white border-2 border-darkest"
                          }
                        >
                          {findTagById(tags, tag.id) && (
                            <Image src={CheckIcon} alt="check" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className={"flex flex-col items-center justify-center"}>
                    <div className={"h-0.5 w-11/12 m-4 rounded-lg bg-white"} />
                    <div
                      className={
                        "flex flex-row items-center justify-between w-11/12 h-12 p-2 bg-lightest border-2 border-black rounded-md"
                      }
                    >
                      <Image src={PenIcon} alt="pen" />
                      <input
                        onChange={(event: any) =>
                          setNewTagName(event.target.value)
                        }
                        value={newTagName}
                        className={
                          "bg-lightest border-2 border-black w-8/12 p-1 text-gray-500 rounded-lg"
                        }
                        placeholder="Create new tag"
                      />
                      <button onClick={handleNewTag}>
                        <Image src={AddIcon} alt="add" />
                      </button>
                    </div>
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
                      className={"bg-dark rounded-2xl px-3 py-2 m-0.5"}
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
              minDate={
                date.getTime() <= new Date().getTime() ? date : new Date()
              }
            />
          </div>
          <div className={"flex flex-row justify-between mt-4"}>
            <button
              className={
                "w-72 h-20 bg-dark border-4 border-medium rounded-2xl"
              }
              onClick={cancelHandler}
            >
              <p className={"text-3xl text-white"}>Cancel</p>
            </button>
            <button
              className={
                "w-72 h-20 bg-dark border-4 border-medium rounded-2xl"
              }
              onClick={submitHandler}
            >
              <p className={"text-3xl text-white"}>Update Task</p>
            </button>
          </div>
        </div>
      </Fragment>
    </main>
  );
}

export async function getStaticPaths() {
  const tasks = await getTasksHandler();

  return {
    fallback: "blocking", // false = all supported values in paths, true otherwise
    paths: tasks.map((task) => ({
      params: { taskId: task._id.toString() },
    })),
  };
}

export async function getStaticProps(context: any) {
  const selectedTask = await getOneTaskHandler(context.params.taskId);
  const availableTags = await getTagsHandler();

  return {
    props: {
      taskData: {
        id: selectedTask?._id.toString(),
        title: selectedTask?.title,
        description: selectedTask?.description,
        tags: selectedTask?.tags,
        date: selectedTask?.date,
        completed: selectedTask?.completed,
      },
      availableTags: availableTags.map((tag: any) => ({
        id: tag._id.toString(),
        name: tag.name,
        color: tag.color,
      })),
    },
    revalidate: 1,
  };
}

export default TaskEdit;
