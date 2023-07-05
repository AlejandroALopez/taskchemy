import Head from "next/head";
import { Fragment } from "react";
import { Inter } from "next/font/google";
import { getTasksHandler } from "../actions/taskActions";
import TodayTaskList from "../components/tasks/TodayTaskList";
import TodayRoutines from "@/components/routines/TodayRoutineList";
import { getRoutinesHandler } from "@/actions/routineActions";

const inter = Inter({ subsets: ["latin"] });

function Home(props: any) {
  return (
    <main className={`flex min-h-screen flex-col mx-12 my-24 ${inter.className}`}>
      <Fragment>
        <Head>
          <title>Task Alchemy</title>
          <meta
            name="description"
            content="A Next.js app to manage tasks with an alchemy theme!"
          />
        </Head>
        <div className={"flex flex-row"}>
          <TodayTaskList tasks={props.tasks} />
          <TodayRoutines routines={props.routines} />
        </div>
      </Fragment>
    </main>
  );
}

export async function getStaticProps() {
  const tasks = await getTasksHandler();
  const routines = await getRoutinesHandler();

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
        daysFollowed: routine.daysFollowed
      })),
    },
    revalidate: 1,
  };
}

export default Home;
