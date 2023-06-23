import { useRouter } from "next/router";
import { RoutineProps } from "../../types/RoutineTypes";
import RoutineItem from "./RoutineItem";

function RoutineList(props: RoutineProps) {
  const router = useRouter();

  function addRoutineHandler() {
    router.push("/routines/create"); // move to task creation page
  }

  return (
    <div className={"flex flex-col w-full"}>
      <div className={"flex flex-row w-3/12 justify-between"}>
        <p className={"text-3xl mb-10"}>My Routines</p>
        <button
          onClick={addRoutineHandler}
          className={
            "w-12 h-10 bg-gray-200 border-4 border-slate-600 rounded-md"
          }
        >
          <p className={"text-2xl"}>+</p>
        </button>
      </div>
      {props.routines.length > 0 ? (
        <ul
          className={
            "list-none w-10/12 m-0 p-0 overflow-scroll overflow-x-hidden max-h-full"
          }
        >
          {props.routines.map((routine) => (
            <RoutineItem
              key={routine.id}
              id={routine.id}
              title={routine.title}
              description={routine.description}
              frequency={routine.frequency}
              daysFollowed={routine.daysFollowed}
            />
          ))}
        </ul>
      ) : (
        <div>
          <p className={"text-lg"}>
            No routines on display. Press the button above to create a routine!
          </p>
        </div>
      )}
    </div>
  );
}

export default RoutineList;
