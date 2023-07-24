import Head from "next/head";
import Image from "next/image";
import { useState, Fragment } from "react";
import { GetServerSidePropsContext } from "next";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getTagsHandler } from "@/actions/tagActions";
import CheckIcon from "@/public/icons/others/check.svg";
import AddIcon from "@/public/icons/action/add.svg";
import PenIcon from "@/public/icons/others/pen.svg";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function TaskCreate(props: any) {
  const router = useRouter();
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [tags, setTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>(props.serverTags.map(({name} : any) => name));
  const [showTags, setShowTags] = useState(false);
  const [newTagName, setNewTagName] = useState("");

  function isTagActive(tag: string): boolean {
    return tags.indexOf(tag) !== -1;
  }

  function removeTagHandler(tag: string) {
    setTags(tags.filter((item) => item !== tag));
  }

  function cancelHandler() {
    router.back();
  }

  // action for creating a task
  async function createTaskHandler(enteredTaskData: any) {
    const response = await fetch("/api/tasks/new-task", {
      method: "POST",
      body: JSON.stringify(enteredTaskData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    router.back();
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

  function submitHandler(event: any) {
    event.preventDefault();

    const taskData = {
      title: title,
      description: description,
      tags: tags,
      date: date.getTime(),
      completed: false,
      userEmail: session?.user?.email,
    };

    createTaskHandler(taskData);
  }

  function toggleShowTags() {
    setShowTags(!showTags);
  }

  function handleNewTag(event: any) {
    event.preventDefault();

    const newTagData = {
      name: newTagName,
      color: "#2AC769",
      userEmail: session?.user?.email,
    };

    createTagHandler(newTagData);
    setAvailableTags((prevTags) => [...prevTags, newTagData.name])
    setNewTagName("");
  }

  return (
    <main className={"flex min-h-screen flex-col p-12"}>
      <Fragment>
        <Head>
          <title>Create Task</title>
          <meta name="description" content="Create a new task!" />
        </Head>
        <div className={"flex flex-col md:w-10/12"}>
          <p className={"text-3xl mb-10 font-medium"}>Create Task</p>
          <div className={"flex flex-row mb-6 justify-between"}>
            <p className={"text-xl w-4/12 mr-4"}>Title</p>
            <input
              onChange={(event: any) => setTitle(event.target.value)}
              value={title}
              className={"w-9/12 border-2 border-regular rounded-lg px-2"}
              placeholder="Task title"
            />
          </div>
          <div className={"flex flex-row mb-6 justify-between"}>
            <p className={"text-xl w-4/12 mr-4"}>Description (optional)</p>
            <textarea
              className={"w-9/12 border-2 border-regular rounded-lg px-2"}
              placeholder="Task description"
              rows={3}
              value={description}
              onChange={(event: any) => setDescription(event.target.value)}
            />
          </div>
          <div className={"flex flex-col lg:flex-row justify-between my-4"}>
            <div className={"md:w-5/12 lg:w-4/12 max-h-full mb-4"}>
              <div className={"flex flex-row items-center"}>
                <p className={"text-xl mr-4"}>Tags</p>
                <button
                  onClick={toggleShowTags}
                  className={
                    "border-2 bg-regular rounded-2xl px-3 py-2 drop-shadow-md"
                  }
                >
                  <p className={"text-white"}>+ Add tag</p>
                </button>
              </div>
              {showTags ? (
                <div
                  className={
                    "relative z-10 top-2 h-fit w-5/6 bg-white rounded-xl drop-shadow-md"
                  }
                >
                  <div className={"max-h-40 overflow-scroll overflow-x-hidden"}>
                    {availableTags.map((tag: string, index: number) => (
                      <button
                        className={`flex justify-between items-center w-11/12 m-2 p-2 rounded-lg drop-shadow-md ${
                          isTagActive(tag)
                            ? "bg-dark"
                            : "bg-light"
                        }`}
                        key={index}
                        onClick={() => {
                          if (isTagActive(tag)) {
                            removeTagHandler(tag);
                          } else {
                            setTags((oldTags) => [...oldTags, tag]);
                          }
                        }}
                      >
                        <p className={`${isTagActive(tag)
                            ? "text-white"
                            : "text-black"
                        }`}>{tag}</p>
                        <div
                          className={
                            "flex justify-center items-center w-6 h-6 bg-white"
                          }
                        >
                          {isTagActive(tag) && (
                            <Image src={CheckIcon} alt="check" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className={"flex flex-col items-center justify-center pb-2"}>
                    <div className={"h-0.5 w-11/12 m-4 rounded-lg bg-white"} />
                    <div
                      className={
                        "flex flex-row items-center justify-between w-11/12 h-12 p-2 border-2 border-alternate rounded-md"
                      }
                    >
                      <Image src={PenIcon} alt="pen" />
                      <input
                        onChange={(event: any) =>
                          setNewTagName(event.target.value)
                        }
                        value={newTagName}
                        className={
                          "border-2 border-alternate w-8/12 p-1 text-alternate rounded-lg"
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
                  {tags.map((tag: string, i: number) => (
                    <button
                      key={i}
                      onClick={() => removeTagHandler(tag)}
                      className={"bg-dark rounded-2xl px-3 py-2 m-0.5"}
                    >
                      <p className={"text-white"}>{tag}</p>
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
                "px-6 py-2 md:px-12 md:py-4 bg-white border-2 border-alternate rounded-2xl drop-shadow-md"
              }
              onClick={cancelHandler}
            >
              <p className={"text-xl md:text-2xl lg:text-3xl text-alternate"}>
                Cancel
              </p>
            </button>
            <button
              className={
                "px-6 py-2 md:px-12 md:py-4 bg-regular rounded-2xl drop-shadow-md"
              }
              onClick={submitHandler}
            >
              <p className={"text-xl md:text-2xl lg:text-3xl text-white"}>
                + Add Task
              </p>
            </button>
          </div>
        </div>
      </Fragment>
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    const user = session.user;
    const serverTags = await getTagsHandler(user?.email as string);

    return {
      props: {
        serverTags: serverTags.map((tag: any) => ({
          id: tag._id.toString(),
          name: tag.name,
          color: tag.color,
          userEmail: tag.userEmail,
        })),
      },
    };
  }
}

export default TaskCreate;
