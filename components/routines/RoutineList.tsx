import { useRouter } from "next/router";
import { Routine, RoutineProps } from "../../types/RoutineTypes";
import RoutineItem from "./RoutineItem";

function RoutineList(props: RoutineProps) {
  const router = useRouter();

  function addRoutineHandler() {
    router.push("/routines/create"); // move to task creation page
  }

  return (
    <div className={"flex flex-col w-full"}>
      <div className={"flex flex-row items-center gap-6 lg:w-10/12 mb-8"}>
        <p className={"text-3xl font-medium"}>My Routines</p>
        <button
          onClick={addRoutineHandler}
          className={
            "w-12 h-12 bg-regular rounded-xl drop-shadow-md"
          }
        >
          <p className={"text-4xl text-white mb-1"}>+</p>
        </button>
      </div>
      {props.routines.length > 0 ? (
        <ul
          className={
            "list-none lg:w-10/12 m-0 p-0 overflow-scroll overflow-x-hidden max-h-[32rem]"
          }
        >
          {props.routines.map((routine: Routine, index) => (
            <RoutineItem
              key={routine.id}
              routineObj={routine}
              index={index}
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
