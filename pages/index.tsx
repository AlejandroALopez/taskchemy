import Head from "next/head";
import { Fragment } from "react";
import { Inter } from "next/font/google";
import { getSession } from "next-auth/react";
import { getTasksHandler } from "../actions/taskActions";
import TodayTaskList from "../components/tasks/TodayTaskList";
import TodayRoutines from "@/components/routines/TodayRoutineList";
import { getRoutinesHandler } from "@/actions/routineActions";
import { GetServerSidePropsContext } from "next";
// import LoginButton from "@/components/auth/login_btn";

const inter = Inter({ subsets: ["latin"] });

function Home(props: any) {
  return (
    <main
      className={`flex h-screen flex-col ${inter.className}`}
    >
      <Fragment>
        <Head>
          <title>Task Alchemy</title>
          <meta
            name="description"
            content="A Next.js app to manage tasks with an alchemy theme!"
          />
        </Head>
        <div className={"flex flex-row mx-12 mt-24"}>
          <TodayTaskList tasks={props.tasks} />
          <TodayRoutines routines={props.routines} />
          {/* <LoginButton /> */}
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
          userEmail: routine.userEmail,
        })),
      },
    };
  }
}

export default Home;
