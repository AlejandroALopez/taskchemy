import TaskItem from './TaskItem';

function TaskList(props) {
    return (
        <ul className={"list-none m-0 p-0"}>
        {props.tasks.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            title={task.title}
            completed={task.completed}
          />
        ))}
      </ul>
    );
}

export default TaskList;