import { useDispatch, useSelector } from "react-redux";
import { taskModel } from "@/entities/task";
import { RootState } from "@/app/store";
import { filtersList, getFilterById } from "../lib/config";
import styles from "./styles.module.scss";

export const TaskFilter = () => {
  const dispatch = useDispatch();

  const filterHandler = (filter: taskModel.FilterStatus) => {
    dispatch(taskModel.setFilterStatus(filter));
  };

  const currFilter = useSelector(
    (state: RootState) => state.tasks.filterStatus
  );

  return (
    <div className={styles["toggle-btn-wrapper"]}>
      <div className={styles.name}>Filter tasks:</div>
      <div className={styles["toggle-btn-group"]}>
        {filtersList.map(({ title, id, filterStatus }) => (
          <div
            key={id}
            data-active={
              currFilter === filterStatus
                ? `${filterStatus}-active`
                : filterStatus
            }
            className={styles["toggle-btn"]}
            onClick={() => {
              if (currFilter === filterStatus) {
                filterHandler(undefined);
              } else {
                filterHandler(getFilterById(id).filterStatus);
              }
            }}
          >
            {title}
          </div>
        ))}
      </div>
    </div>
  );
};
