import Head from "next/head";
import { Fragment } from "react";
import { Routine } from "../../types/RoutineTypes";
import routineData from "../../testData/RoutineData";
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
  const routines = routineData;

  return {
    props: {
      routines: routines.map((routine: Routine) => ({
        id: routine.id,
        title: routine.title,
        description: routine.description,
        frequency: routine.frequency,
      })),
    },
    revalidate: 1,
  };
}

export default Routines;
