import Head from "next/head";
import { Fragment } from "react";
import { Routine } from "../../types/RoutineTypes";
import { getRoutinesHandler } from "../../actions/routineActions";
import RoutineList from "../../components/routines/RoutineList";

function Routines(props: any) {
  return (
    <main className={"flex min-h-screen flex-col p-12"}>
      <Fragment>
        <Head>
          <title>Routines</title>
          <meta
            name="description"
            content="See the routines you want to build!"
          />
        </Head>
        <div>
          <RoutineList routines={props.routines} />
        </div>
      </Fragment>
    </main>
  );
}

export async function getStaticProps() {
  const routines = await getRoutinesHandler();

  return {
    props: {
      routines: routines.map((routine: any) => ({
        id: routine._id.toString(),
        title: routine.title,
        description: routine.description,
        frequency: routine.frequency,
        daysFollowed: routine.daysFollowed,
      })),
    },
    revalidate: 1,
  };
}

export default Routines;
