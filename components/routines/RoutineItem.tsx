import { Routine } from "../../types/RoutineTypes";

function RoutineItem(props: Routine) {
  return (
    <li className={"flex flex-row w-10/12 h-28 mb-10"}>
      <div className={"flex items-center w-full bg-gray-500 border-4 border-gray-400 rounded-3xl"}>
          <p className={"text-xl m-4 text-white"}>{props.title}</p>
      </div>
    </li>
  );
}

export default RoutineItem;
