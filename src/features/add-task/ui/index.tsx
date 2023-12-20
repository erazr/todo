import React from "react";
import { motion } from "framer-motion";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Task } from "@/shared/mocks/models";
import { taskModel } from "@/entities/task";
import { TaskStatus } from "@/features/task-status";
import styles from "./styles.module.scss";
import { AppDispatch } from "@/app/store";

type AddTaskModalProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddTaskModalRef = React.forwardRef(
  ({ setIsOpen }: AddTaskModalProps, ref: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const [disabled, setDisabled] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState<Task["status"]>("pending");

    const onChange = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      if (
        e.target instanceof HTMLTextAreaElement &&
        e.target.value.length <= 30
      )
        setDescription(e.target.value);

      if (e.target instanceof HTMLInputElement) setTitle(e.target.value);
    };

    const onSubmitHandle = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (
        description.length <= 30 &&
        description.length > 0 &&
        title.length > 0
      ) {
        const id = Date.now();

        dispatch(
          taskModel.addTask({
            id,
            description,
            status,
            title,
          })
        );

        if (status === "completed") {
          dispatch(taskModel.postCompletedTasks(id));
        }

        setDisabled(true);

        setTimeout(() => {
          setDisabled(false);
          setIsOpen(false);
        }, 1000);
      }
    };

    return (
      <div ref={ref} className={styles["add-todo-modal"]}>
        <form
          action=""
          method="post"
          onSubmit={onSubmitHandle}
          className={styles["add-todo-modal-inner"]}
        >
          <div className={styles["modal-header"]}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={onChange}
              className={styles["modal-header__input-name"]}
            />
            <TaskStatus setStatus={setStatus} />
          </div>
          <div className={styles["textarea-wrapper"]}>
            <textarea
              placeholder="Description..."
              value={description}
              onChange={onChange}
            />
            <span>{description.length}/30</span>
          </div>
          <div className={styles["buttons-wrapper"]}>
            <button
              type="button"
              className={styles["close-btn"]}
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
            <button
              type="submit"
              disabled={disabled}
              className={styles["submit-btn"]}
            >
              Add a task
            </button>
          </div>
        </form>
      </div>
    );
  }
);

export const AddTaskModal = motion(AddTaskModalRef);
