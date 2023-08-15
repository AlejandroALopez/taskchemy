import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import { Fragment, useState, Dispatch, SetStateAction, createContext, useContext, useEffect } from "react";
import { Inter } from "next/font/google";
import { getSession } from "next-auth/react";
import { getTasksHandler } from "../actions/taskActions";
import { getRoutinesHandler } from "@/actions/routineActions";
import { getUserStats } from "@/actions/alchemyActions";
import TodayTaskList from "../components/tasks/TodayTaskList";
import TodayRoutines from "@/components/routines/TodayRoutineList";
import MoneyItem from "@/components/garden/MoneyItem";

const inter = Inter({ subsets: ["latin"] });

// Context for updating coins number on dashboard upon task/routine completed
interface ContextProps {
  currentCoins: number;
  setCurrentCoins: Dispatch<SetStateAction<number>>;
}

export const CoinsContext = createContext<ContextProps>({
  currentCoins: 0,
  setCurrentCoins: (): number => 0,
});

export const useCoinsContext = () => useContext(CoinsContext);

function Home(props: any) {
  const [currentCoins, setCurrentCoins] = useState<number>(props.stats.coins);

  useEffect(() => {
    setCurrentCoins(props.stats.coins);
  },[]);

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
        <div>
          <div className="flex flex-row-reverse mt-6 px-12">
            <MoneyItem coins={currentCoins} />
          </div>
          <CoinsContext.Provider value={{ currentCoins, setCurrentCoins }}>
            <div className={"flex flex-col items-center mt-6 md:items-start md:flex-row md:mx-12 md:mt-12"}>
              <TodayTaskList tasks={props.tasks} stats={props.stats}/>
              <TodayRoutines routines={props.routines} />
            </div>
          </CoinsContext.Provider>
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
    const stats = await getUserStats(user?.email as string);

    return {
      props: {
        stats: {
          id: stats?._id.toString(),
          userEmail: stats?.userEmail,
          coins: stats?.coins,
        },
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
