import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import styles from "./styles.module.scss";
import { AddTaskModal } from "@/features/add-task";
import { TaskList } from "@/features/task-list";
import { TaskFilter } from "@/features/task-filter";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.main}>
      <div className={styles.banner}>
        <h2>Welcome back</h2>
        <p>Here's a list of your tasks!</p>
      </div>

      <div className={styles.dashboard}>
        <div className={styles["dashboard__header"]}>
          <TaskFilter />
          <button
            type="button"
            className={styles.btn}
            onClick={() => setIsOpen(true)}
          >
            Add todo
          </button>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <AddTaskModal
              layout
              key="modal"
              initial={{
                scale: 0.9,
                opacity: 0.7,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.9,
                opacity: 0.7,
                transition: {
                  duration: 0.1,
                },
              }}
              transition={{
                duration: 0.15,
              }}
              setIsOpen={setIsOpen}
            />
          ) : (
            <TaskList />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
