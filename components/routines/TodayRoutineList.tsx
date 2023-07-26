import { Routine } from "../../types/RoutineTypes";
import TodayRoutineItem from "./TodayRoutineItem";

function TodayRoutineList(props: any) {
  const dayNumber = new Date().getDay(); // only show routines on today's weekday (e.g. monday)

  return (
    <div className={"flex flex-col w-8/12 bg-white rounded-2xl p-4 m-8 lg:w-3/12 md:w-4/12 drop-shadow-md"}>
      <div className={"flex flex-row items-center justify-between"}>
        <p className={"text-xl font-medium text-black"}>Routines Today</p>
      </div>
      {props.routines?.length > 0 ? (
        <ul className={"list-none m-0 p-0"}>
          {props.routines?.map((routine: Routine) => {
            if (routine.frequency[dayNumber]) {
              return (
                <TodayRoutineItem
                  key={routine.id}
                  id={routine.id}
                  title={routine.title}
                  description={routine.description}
                  frequency={routine.frequency}
                  daysFollowed={routine.daysFollowed}
                  lastCompleted={routine.lastCompleted}
                  userEmail={routine.userEmail}
                />
              );
            } else return null;
          })}
        </ul>
      ) : (
        <div>
          <p className={"text-lg mt-10"}>No routines today</p>
        </div>
      )}
    </div>
  );
}

export default TodayRoutineList;
