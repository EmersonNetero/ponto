import { useEffect, useState } from "react";


export function Notification({title, description, type = 'info', timeout = 5000, onClose}) {

  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (timeout) {
      const timeOutId = setTimeout(handleClose, timeout);
      return () => clearTimeout(timeOutId);
    }
  }, [])

  const handleClose = () => {
    setClosing(true);
  };
  
  const handleAnimationEnd = () => {
    if (closing) onClose?.()
  }

  const cn = `notification notification--${type} notification--${closing? "closing": "open"}`

  return (
    <div className={cn} onAnimationEnd={handleAnimationEnd}>
      <button className="notification__close-button" onClick={handleClose}>X</button>
      <h3 className="notification__title">{title}</h3>
      {description ? <p className="notification__description">{description}</p> : null}
    </div>
  )
}