import { useState } from 'react';
import Toast from '../Toast/Toast';
import './NotificationCenter.css';

function NotificationCenter() {
  const [visible, setVisible] = useState(false);
  const [shownCount, setShownCount] = useState(0);

  function showToast() {
    setVisible(true);
    setShownCount((count) => count + 1);
  }

  return (
    <div className="notification-center">
      <h1>Notifications</h1>
      <button type="button" onClick={showToast} disabled={visible}>
        Show Notification
      </button>
      <p>{`Toasts shown: ${shownCount}`}</p>
      {visible && <Toast onClose={() => setVisible(false)} />}
    </div>
  );
}

export default NotificationCenter;
