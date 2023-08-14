import { Task } from "@/types/TaskTypes";

// Returns a string of format 'Weekday, Month DD' from a provided date
// Obtained from: hhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
export function formatDate(date: Date): string {
  const options: any = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}

// Returns a sorted array of Tasks, from newest to oldest
export function sortArrayOfTasksByDate(tasks: Task[]): Task[] {
  tasks.sort(function (a: Task, b: Task) {
    if (a.date < b.date) return -1;
    if (a.date > b.date) return 1;
    return 0;
  });

  return tasks.reverse();
}
