import { useContext } from "react"
import { NotificationContext } from "../contexts/NotificationContext";




export function useNotification() {

  const {add, remove} = useContext(NotificationContext);

  const makeNotification = (type) => {
    return (props) => add({...props, type});
  };

  return {
    add, remove,
    success: makeNotification("success"),
    error: makeNotification("error"),
    warning: makeNotification("warning"),
  };
}