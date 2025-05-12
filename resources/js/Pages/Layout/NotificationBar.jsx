import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NotificationBar = ({ notifications }) => {
  const [visibleNotes, setVisibleNotes] = useState([]);

  useEffect(() => {
    // فقط هشدارهای نخوانده را نمایش بده
    const unread = notifications.filter(note => !note.is_read);
    setVisibleNotes(unread);
  }, [notifications]);

  const handleClose = async (id) => {
    try {
      await axios.post(`/admin/admin/user/notification/read/{id}`);
      setVisibleNotes((prev) => prev.filter(note => note.id !== id));
    } catch (error) {
      console.error("خطا در ارسال درخواست به سرور", error);
    }
  };

  if (visibleNotes.length === 0) return null;

  return (
    <div style={styles.container}>
      {visibleNotes.map((note) => (
        <div
          key={note.id}
          style={styles.notification}
        >
          <div style={styles.notificationContent}>
            <div>
              <strong style={styles.title}>{note.title}</strong>
              <span style={styles.message}>{note.message}</span>
            </div>
            <button
              style={styles.closeButton}
              onClick={() => handleClose(note.id)}
            >
              ✖
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// CSS Styles inside the component
const styles = {
  container: {
    position: 'fixed',
    bottom: '0', // هشدار از پایین صفحه ظاهر می‌شود
    left: '50%',
    transform: 'translateX(-50%)', // برای مرکز قرار دادن هشدار در عرض صفحه
    width: '100%',
    zIndex: 50,
    display: 'flex',
    justifyContent: 'center', // برای نمایش در وسط صفحه
    alignItems: 'center', // برای مرکزیت
    flexDirection: 'column', // چندین هشدار را به صورت عمودی نمایش می‌دهد
  },
  notification: {
    backgroundColor: '#F8D7DA', // رنگ قرمز پس‌زمینه
    borderBottom: '1px solid #F5C6CB',
    color: '#721C24', // رنگ متن قرمز تیره
    padding: '12px 16px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    animation: 'slideUp 0.5s ease-out', // انیمیشن اسلاید آپ
    marginBottom: '10px', // فاصله بین هشدارها
    borderRadius: '5px', // گوشه‌های گرد
  },
  notificationContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    display: 'block',
    fontWeight: 'bold',
  },
  message: {
    display: 'block',
    fontSize: '14px',
  },
  closeButton: {
    fontSize: '20px',
    fontWeight: 'bold',
    padding: '8px',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#B03834',
    transition: 'color 0.3s',
  },

  // انیمیشن Slide Up
  '@keyframes slideUp': {
    '0%': { opacity: 0, transform: 'translateY(100%)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  },
};

export default NotificationBar;
