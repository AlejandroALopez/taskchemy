import Head from "next/head";
import { Fragment } from "react";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
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
    const routines = await getRoutinesHandler(user?.email as string);

    return {
      props: {
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

export default Routines;
