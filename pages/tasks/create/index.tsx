function TaskCreate() {
  return (
    <div className={"flex min-h-screen flex-col p-12 w-64 min-w-fit"}>
      <p className={"text-3xl mb-10"}>Create Task</p>
      <div className={"flex flex-row w-full mb-6 justify-between"}>
        <p className={"text-xl mr-12"}>Task</p>
        <input className={"w-96"} placeholder="Task title" />
      </div>
      <div className={"flex flex-row mb-6 justify-between"}>
        <p className={"text-xl mr-12"}>Description (optional)</p>
        <input className={"w-96"} placeholder="Task description" />
      </div>
      <div className={"flex flex-row mb-6 justify-between"}>
        <div>
          <p className={"text-xl mb-4"}>Tags</p>
          <button className={"border-2 border-black rounded-2xl px-3 py-2"}>
            <p>+ Add tag</p>
          </button>
        </div>
        <div>
          <p className={"text-xl mb-4"}>Date to complete</p>
          <ul className={"flex flex-col"}>
            <li className={"flex flex-row items-center mb-4"}>
              <div className={"border-2 border-black w-10 h-10 bg-slate-200 rounded-full"} />
              <p className={"text-lg ml-3"}>Today</p>
            </li>
            <li className={"flex flex-row items-center mb-4"}>
              <div className={"border-2 border-black w-10 h-10 bg-slate-200 rounded-full"} />
              <p className={"text-lg ml-3"}>Tomorrow</p>
            </li>
            <li className={"flex flex-row items-center mb-4"}>
              <div className={"border-2 border-black w-10 h-10 bg-slate-200 rounded-full"} />
              <p className={"text-lg ml-3"}>Select day</p>
            </li>
          </ul>
        </div>
        <div className={"w-10 h-10 bg-black"} />
      </div>
      <div className={"flex flex-row justify-between"}>
        <button className={"w-72 h-20 bg-gray-400 border-4 border-black rounded-2xl"}>
            <p className={"text-3xl"}>Cancel</p>
        </button>
        <button className={"w-72 h-20 bg-gray-400 border-4 border-black rounded-2xl"}>
            <p className={"text-3xl"}>+ Add Task</p>
        </button>
      </div>
    </div>
  );
}

export default TaskCreate;
