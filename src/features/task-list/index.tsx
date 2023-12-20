import TaskRow from "@/entities/task/ui/task-row";
import styles from "./styles.module.scss";
import { taskModel } from "@/entities/task";

export const TaskList = () => {
  const tasks = taskModel.getFilteredTasks();

  return (
    <div className={styles["task-list"]}>
      {tasks.length >= 1 ? (
        tasks.map((t) => <TaskRow data={t} key={t.id} />)
      ) : (
        <div className={styles["empty-list"]}>No tasks for now!</div>
      )}
    </div>
  );
};
