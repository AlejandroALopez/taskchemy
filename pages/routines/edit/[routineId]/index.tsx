import Head from "next/head";
import { useState, Fragment } from "react";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { DAYS_OF_WEEK } from "@/utils/constants";
import {
  getRoutinesHandler,
  getOneRoutineHandler,
} from "@/actions/routineActions";

function RoutineEdit(props: any) {
  const router = useRouter();
  const [title, setTitle] = useState(props.routineData.title);
  const [description, setDescription] = useState(props.routineData.description);
  const [frequency, setFrequency] = useState(props.routineData.frequency);

  function cancelHandler() {
    router.push("/routines"); // back to routines page
  }

  // action for creating a routine
  async function updateRoutineHandler(enteredRoutineData: any) {
    const response = await fetch("/api/routines/update-routine", {
      method: "PUT",
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
      routineId: props.routineData.id,
      newData: {
        title: title,
        description: description,
        frequency: frequency,
        daysFollowed: props.routineData.daysFollowed,
        lastCompleted: props.routineData.lastCompleted,
        userEmail: props.routineData.userEmail,
      },
    };

    updateRoutineHandler(routineData);
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
          <title>Edit Routine</title>
          <meta name="description" content="Edit an existing routine" />
        </Head>
        <div className={"flex flex-col w-10/12"}>
          <p className={"text-3xl mb-10"}>Create Routine</p>
          <div className={"flex flex-row mb-6 justify-between"}>
            <p className={"text-xl mr-12"}>Title</p>
            <input
              onChange={(event: any) => setTitle(event.target.value)}
              value={title}
              className={"w-9/12 border-2 border-dark rounded-lg px-2"}
              placeholder="Routine title"
            />
          </div>
          <div className={"flex flex-row mb-6 justify-between"}>
            <p className={"text-xl mr-12"}>Description (optional)</p>
            <textarea
              className={"w-9/12 border-2 border-dark rounded-lg px-2"}
              placeholder="Routine description"
              rows={3}
              value={description}
              onChange={(event: any) => setDescription(event.target.value)}
            />
          </div>
          <div className={"flex flex-row my-6 justify-between"}>
            <p className={"text-xl mr-12"}>Frequency (everyday by default)</p>
            <div className={"flex flex-row"}>
              {[...Array(7)].map((value: undefined, index: number) => (
                <button
                  key={index}
                  className={`flex items-center justify-center h-14 w-14 ml-4 rounded-full border-2 border-black ${
                    frequency[index] ? "bg-darkest" : "bg-white"
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
          <div className={"flex flex-row justify-between mt-52"}>
            <button
              className={"w-72 h-20 bg-dark border-4 border-medium rounded-2xl"}
              onClick={cancelHandler}
            >
              <p className={"text-3xl text-white"}>Cancel</p>
            </button>
            <button
              className={"w-72 h-20 bg-dark border-4 border-medium rounded-2xl"}
              onClick={submitHandler}
            >
              <p className={"text-3xl text-white"}>Update Routine</p>
            </button>
          </div>
        </div>
      </Fragment>
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { routineId } = context.query;
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
    const selectedRoutine = await getOneRoutineHandler(
      routineId as string,
      user?.email as string
    );

    return {
      props: {
        routineData: {
          id: selectedRoutine?._id.toString(),
          title: selectedRoutine?.title,
          description: selectedRoutine?.description,
          frequency: selectedRoutine?.frequency,
        },
      },
    };
  }
}

export default RoutineEdit;
