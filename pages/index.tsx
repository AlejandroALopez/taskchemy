import Head from "next/head";
import { Fragment } from "react";
import { Inter } from "next/font/google";
import { Task } from "../types/TaskTypes";
import taskData from "../testData/TaskData";
import TaskList from "../components/tasks/TaskList";

const inter = Inter({ subsets: ["latin"] });

function Home(props: any) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Fragment>
        <Head>
          <title>Task Alchemy</title>
          <meta
            name="description"
            content="A Next.js app to manage tasks with an alchemy theme!"
          />
        </Head>
        <div>
          <TaskList tasks={props.tasks} />
        </div>
      </Fragment>
    </main>
  );
}

export async function getStaticProps() {
  // // fetch data from an API
  // const client = await MongoClient.connect(
  //   "mongodb+srv://user1:user1password@cluster0.tudeixo.mongodb.net/?retryWrites=true&w=majority"
  // );

  // const db = client.db();
  // const meetupsCollection = db.collection("meetups");

  // const meetups = await meetupsCollection.find().toArray();

  // client.close();

  const tasks = taskData;

  return {
    props: {
      tasks: tasks.map((task: Task) => ({
        title: task.title,
        id: task.id,
        completed: task.completed,
      })),
    },
    // props: {
    //   meetups: meetups.map((meetup) => ({
    //     title: meetup.title,
    //     address: meetup.address,
    //     image: meetup.image,
    //     id: meetup._id.toString(),
    //   })),
    // },
    revalidate: 1,
  };
}

export default Home;
