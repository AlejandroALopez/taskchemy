import Head from "next/head";
import { Fragment } from "react";
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

export async function getStaticProps() {
    const tasks = await getTasksHandler();
  
    return {
      props: {
        tasks: tasks.map((task: any) => ({ // sort from newest to oldest date
          id: task._id.toString(),
          title: task.title,
          description: task.description,
          tags: task.tags,
          date: task.date,
          completed: task.completed,
          userId: task.userId
        })),
      },
      revalidate: 1,
    };
  }
  
  

export default Tasks;
