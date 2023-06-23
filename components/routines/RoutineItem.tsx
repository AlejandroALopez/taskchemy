import { Routine } from "../../types/RoutineTypes";
import { DAYS_OF_WEEK } from '../../utils/constants';

function RoutineItem(props: Routine) {
  const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <li className={"flex flex-row w-10/12 mb-10"}>
      <div
        className={
          "flex flex-row items-center w-full p-4 bg-gray-500 border-4 border-gray-400 rounded-3xl"
        }
      >
        <div className={"flex flex-col"}>
          <p className={"text-2xl m-4 text-white"}>{props.title}</p>
          <div className={"flex flex-row"}>
            {[...Array(7)].map((value: undefined, index: number) => (
              <div
                key={index}
                className={`h-8 w-8 ml-4 rounded-full border-2 border-white ${
                  props.frequency[index] ? "bg-black" : "bg-gray-300"
                }`}
              >
                <p className={"text-lg text-center text-white"}>
                  {DAYS_OF_WEEK[index]}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className={"mx-20"}>
          <p className={"text-lg text-center text-white"}>Streak: {props.daysFollowed} days</p>
        </div>
      </div>
    </li>
  );
}

export default RoutineItem;
