import { ChangeEvent, MouseEvent, useState } from "react";
import { Task } from "@/shared/mocks/models";
import { Variants, motion } from "framer-motion";
import styles from "./styles.module.scss";
import { TaskStatus } from "@/features/task-status";
import { useDispatch } from "react-redux";
import { taskModel } from "../..";
import { AppDispatch } from "@/app/store";

const variants: Variants = {
  expanded: {
    height: "200px",
  },
  closed: {
    height: "64px",
  },
};

export default function TaskRow({ data }: { data: Task }) {
  const [isExpand, setIsExpand] = useState(false);

  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);
  const [status, setStatus] = useState<Task["status"]>(data.status);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target instanceof HTMLTextAreaElement && e.target.value.length <= 30)
      setDescription(e.target.value);

    if (e.target instanceof HTMLInputElement && e.target.value.length > 0)
      setTitle(e.target.value);
  };

  const dispatch = useDispatch<AppDispatch>();

  const updateTask = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const task = dispatch(
      taskModel.editTask({
        id: data.id,
        title,
        description,
        status,
      })
    );
    setIsExpand(false);
    console.log("Task edited with ID:", task.payload.id, task.payload);

    if (status === "completed") dispatch(taskModel.postCompletedTasks(data.id));
  };

  return (
    <motion.div
      variants={variants}
      animate={isExpand ? "expanded" : "closed"}
      className={styles.task}
      onClick={() => {
        setIsExpand(true);
      }}
    >
      <div className={styles["task-inner"]}>
        <input
          value={title}
          onChange={onChange}
          className={styles.input}
          style={{
            border: isExpand ? "1px #638bb3 solid" : "none",
          }}
        />
        <TaskStatus
          placeholder={
            data.status.charAt(0).toUpperCase() +
            data.status.slice(1).replace("-", " ")
          }
          setStatus={setStatus}
        />
      </div>
      <motion.div
        initial={false}
        onAnimationEnd={() => console.log(123)}
        variants={{
          expanded: {
            clipPath: "inset(0% -0.76% 0% -0.76% round 10px)",
            display: "block",
          },
          closed: {
            clipPath: "inset(0% 0% 100.00% 0% round 10px)",
          },
        }}
        animate={{
          transitionEnd: {
            display: "none",
          },
        }}
      >
        <div className={styles["textarea-wrapper"]}>
          <textarea
            placeholder="Description..."
            value={description}
            onChange={onChange}
            onClick={(e: MouseEvent<HTMLTextAreaElement>) => {
              e.stopPropagation();
            }}
          />
          <span>{description.length}/30</span>
        </div>

        <div className={styles["buttons-wrapper"]}>
          <button
            type="button"
            className={styles["close-btn"]}
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              setIsExpand(false);
            }}
          >
            Close
          </button>
          <button
            type="button"
            className={styles["edit-btn"]}
            onClick={(e) => {
              updateTask(e);
            }}
          >
            Edit
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
