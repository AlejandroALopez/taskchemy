import Head from "next/head";
import { Fragment } from "react";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { getTasksHandler } from "@/actions/taskActions";
import { sortArrayOfTasksByDate } from "@/utils/dateFunctions";
import AllTaskList from "@/components/tasks/AllTaskList";

function Tasks(props: any) {
  return (
    <main className={"flex min-h-screen flex-col p-12"}>
      <Fragment>
        <Head>
          <title>My Tasks</title>
          <meta name="description" content="See all tasks!" />
        </Head>
        <div>
          <AllTaskList tasks={sortArrayOfTasksByDate(props.tasks)} />
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
    const tasks = await getTasksHandler(user?.email as string);

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
      },
    };
  }
}

export default Tasks;
