import { createContext, useState } from "react";
import { Notification } from "../components/Notification"


export const NotificationContext = createContext({
  add: (_notification) => "",
  remove: (_id) => {}
});

const makeHash = () => Math.random().toString(36).slice(2, 10);

export const NotificationProvider = ({children}) => {
  const [notifications, setNotifications] = useState([])
  
  const add = (notification) => {
    const id = makeHash();
    setNotifications((notifications) => [{id, ...notification}, ...notifications]);
    return id;
  }
  
  const remove = (id) => {
    setNotifications(notifications => notifications.filter(item => item.id !== id))
  }
  const value = {
    add,
    remove
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <div className="notifications">
        {notifications.map(noti => <Notification key={noti.id} {...noti} onClose={() => remove(noti.id)}/>)}
      </div>
    </NotificationContext.Provider>
  )
}


