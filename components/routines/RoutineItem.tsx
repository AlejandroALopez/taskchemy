import { RoutineColorProps } from "../../types/RoutineTypes";
import { DAYS_OF_WEEK, ROUTINE_COLORS } from '../../utils/constants';

function RoutineItem(props: RoutineColorProps) {
  const DAYS: string[] = ["S", "M", "T", "W", "T", "F", "S"];
  const routineColor: string = ROUTINE_COLORS[props.index % ROUTINE_COLORS.length];

  return (
    <li className={"flex flex-row w-10/12 mb-10"}>
      <div
        className={
          `flex flex-row items-center w-full p-4 ${routineColor} border-4 border-darkest rounded-3xl`
        }
      >
        <div className={"flex flex-col"}>
          <p className={"text-2xl m-4 text-white"}>{props.routineObj.title}</p>
          <div className={"flex flex-row"}>
            {[...Array(7)].map((value: undefined, index: number) => (
              <div
                key={index}
                className={`h-8 w-8 ml-4 rounded-full border-2 border-black ${
                  props.routineObj.frequency[index] ? "bg-white" : ""
                }`}
              >
                <p className={`text-lg text-center ${
                  props.routineObj.frequency[index] ? "text-black" : "text-white"
                }`}>
                  {DAYS_OF_WEEK[index]}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className={"mx-20"}>
          <p className={"text-lg text-center text-white"}>Streak: {props.routineObj.daysFollowed} days</p>
        </div>
      </div>
    </li>
  );
}

export default RoutineItem;
