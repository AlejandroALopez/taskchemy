import Head from "next/head";
import { Fragment } from "react";
import { Inter } from "next/font/google";
import { Task } from "../types/TaskTypes";
import { getTasksHandler } from "../actions/taskActions";
import TodayTaskList from "../components/tasks/TodayTaskList";

const inter = Inter({ subsets: ["latin"] });

function Home(props: any) {
  return (
    <main className={`flex min-h-screen flex-col p-24 m-1 ${inter.className}`}>
      <Fragment>
        <Head>
          <title>Task Alchemy</title>
          <meta
            name="description"
            content="A Next.js app to manage tasks with an alchemy theme!"
          />
        </Head>
        <div>
          <TodayTaskList tasks={props.tasks} />
        </div>
      </Fragment>
    </main>
  );
}

export async function getStaticProps() {
  const tasks = await getTasksHandler();

  return {
    props: {
      tasks: tasks.map((task: any) => ({
        id: task._id.toString(),
        title: task.title,
        description: task.description,
        tags: task.tags,
        date: task.date,
        completed: task.completed,
      })),
    },
    revalidate: 1,
  };
}

export default Home;
