import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import { Fragment } from "react";
import { Inter } from "next/font/google";
import { getSession } from "next-auth/react";
import { getTasksHandler } from "../actions/taskActions";
import { getRoutinesHandler } from "@/actions/routineActions";
import TodayTaskList from "../components/tasks/TodayTaskList";
import TodayRoutines from "@/components/routines/TodayRoutineList";

const inter = Inter({ subsets: ["latin"] });

function Home(props: any) {
  return (
    <main
      className={`flex flex-col md:h-screen ${inter.className}`}
    >
      <Fragment>
        <Head>
          <title>Task Alchemy</title>
          <meta
            name="description"
            content="A Next.js app to manage tasks with an alchemy theme!"
          />
        </Head>
        <div className={"flex flex-col items-center mt-12 md:items-start md:flex-row md:mx-12 md:mt-24"}>
          <TodayTaskList tasks={props.tasks} />
          <TodayRoutines routines={props.routines} />
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
      }
    };
  } else {
    const user = session.user;
    const tasks = await getTasksHandler(user?.email as string);
    const routines = await getRoutinesHandler(user?.email as string);

    return {
      props: {
        tasks: tasks.map((task: any) => ({
          id: task._id.toString(),
          title: task.title,
          description: task.description,
          tags: task.tags,
          date: task.date,
          completed: task.completed,
          userEmail: task.userEmail,
        })),
        routines: routines.map((routine: any) => ({
          id: routine._id.toString(),
          title: routine.title,
          description: routine.description,
          frequency: routine.frequency,
          daysFollowed: routine.daysFollowed,
          lastCompleted: routine.lastCompleted,
          userEmail: routine.userEmail,
        })),
      },
    };
  }
}

export default Home;
