import Head from "next/head";
import { useState, Fragment } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { DAYS_OF_WEEK } from "@/utils/constants";

function RoutineCreate() {
  const router = useRouter();
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState(new Array(7).fill(true));

  function cancelHandler() {
    router.push("/routines"); // back to routines page
  }

  // action for creating a routine
  async function createRoutineHandler(enteredRoutineData: any) {
    const response = await fetch("/api/routines/new-routine", {
      method: "POST",
      body: JSON.stringify(enteredRoutineData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    router.replace("/routines");
  }

  function submitHandler(event: any) {
    event.preventDefault();

    const routineData = {
      title: title,
      description: description,
      frequency: frequency,
      daysFollowed: 0,
      lastCompleted: "",
      userEmail: session?.user?.email,
    };

    createRoutineHandler(routineData);
  }

  function handleFrequencyChange(index: number) {
    let newArr = [...frequency];
    newArr[index] = !newArr[index];
    setFrequency(newArr);
  }

  return (
    <main className={"flex min-h-screen flex-col p-12"}>
      <Fragment>
        <Head>
          <title>Create Routine</title>
          <meta name="description" content="Create a new routine!" />
        </Head>
        <div className={"flex flex-col w-10/12"}>
          <p className={"text-3xl mb-10 font-medium"}>Create Routine</p>
          <div className={"flex flex-row mb-6 justify-between"}>
            <p className={"text-xl w-4/12 mr-4"}>Title</p>
            <input
              onChange={(event: any) => setTitle(event.target.value)}
              value={title}
              className={"w-9/12 border-2 border-regular rounded-lg px-2"}
              placeholder="Routine title"
            />
          </div>
          <div className={"flex flex-row mb-6 justify-between"}>
            <p className={"text-xl w-4/12 mr-4"}>Description (optional)</p>
            <textarea
              className={"w-9/12 border-2 border-regular rounded-lg px-2"}
              placeholder="Routine description"
              rows={3}
              value={description}
              onChange={(event: any) => setDescription(event.target.value)}
            />
          </div>
          <div className={"flex flex-col lg:flex-row my-6 justify-between"}>
            <p className={"text-xl lg:mr-12"}>
              Frequency (everyday by default)
            </p>
            <div className={"flex flex-row flex-wrap mt-4 lg:mt-0"}>
              {[...Array(7)].map((value: undefined, index: number) => (
                <button
                  key={index}
                  className={`flex items-center justify-center h-14 w-14 m-2 rounded-full drop-shadow-md ${
                    frequency[index] ? "bg-regular" : "bg-white"
                  }`}
                  onClick={() => handleFrequencyChange(index)}
                >
                  <p
                    className={`text-2xl ${
                      frequency[index] ? "text-white" : "text-black"
                    }`}
                  >
                    {DAYS_OF_WEEK[index]}
                  </p>
                </button>
              ))}
            </div>
          </div>
          <div
            className={"flex flex-row justify-between mt-6 md:mt-20 lg:mt-42"}
          >
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
                + Add Routine
              </p>
            </button>
          </div>
        </div>
      </Fragment>
    </main>
  );
}

export default RoutineCreate;
