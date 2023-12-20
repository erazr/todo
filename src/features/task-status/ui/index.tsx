import { Variants, motion } from "framer-motion";
import React, { MouseEvent, useState } from "react";
import { Task } from "@/shared/mocks/models";
import styles from "./styles.module.scss";
import { taskModel } from "@/entities/task";

const variants: Variants = {
  open: {
    opacity: 1,
    y: 0,
  },
  closed: {
    opacity: 0,
    y: 20,
  },
};

type TaskStatusProps = {
  placeholder?: string;
  setStatus: React.Dispatch<React.SetStateAction<Task["status"]>>;
};

export const TaskStatus = ({ placeholder, setStatus }: TaskStatusProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownPlaceholder, setDropwdownPlaceholder] = useState(
    placeholder ?? "Status"
  );

  const statusHandle = (status: Task["status"]) => {
    setStatus(status);

    setDropwdownPlaceholder(
      status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")
    );
  };

  return (
    <motion.div
      initial={false}
      className={styles["dropdown-btn"]}
      animate={isDropdownOpen ? "open" : "closed"}
      onClick={() => {
        setIsDropdownOpen(!isDropdownOpen);
      }}
      data-status={dropdownPlaceholder}
    >
      {dropdownPlaceholder}
      <motion.ul
        className={styles.dropdown}
        variants={{
          open: {
            clipPath: "inset(0% 0% 0% 0% round 10px)",
          },
          closed: {
            clipPath: "inset(10% 50% 90% 50% round 10px)",
          },
        }}
        onClick={(e: MouseEvent<HTMLUListElement>) => {
          e.stopPropagation();
          setIsDropdownOpen(!isDropdownOpen);
        }}
        style={{ pointerEvents: isDropdownOpen ? "auto" : "none" }}
      >
        <motion.li
          variants={variants}
          data-status="completed"
          onClick={() => {
            statusHandle("completed");
          }}
        >
          Copleted
        </motion.li>
        <motion.li
          variants={variants}
          data-status="in-progress"
          onClick={() => statusHandle("in-progress")}
        >
          In progress
        </motion.li>
        <motion.li
          variants={variants}
          data-status="pending"
          onClick={() => statusHandle("pending")}
        >
          Pending
        </motion.li>
      </motion.ul>
    </motion.div>
  );
};
