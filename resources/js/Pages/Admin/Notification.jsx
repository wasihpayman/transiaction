import { useForm, usePage } from '@inertiajs/react';

export default function Index({ users, notifications }) {
  const { data, setData, post, reset } = useForm({
    user_id: '',
    title: '',
    message: '',
    type: 'info',
    sendToAll: false,
  });

  const { props } = usePage();
  const successMessage = props.flash?.success;

  const submit = (e) => {
    e.preventDefault();
    const endpoint = data.sendToAll
      ? '/admin/admin/notification/send-to-all'
      : '/admin/admin/notification';

    post(endpoint, {
      onSuccess: () => reset(),
    });
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '30px',
      backgroundColor: '#fdfdfd',
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      borderRadius: '12px',
      fontFamily: 'Tahoma, sans-serif',
    },
    header: {
      textAlign: 'center',
      fontSize: '22px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#333',
    },
    label: {
      display: 'block',
      fontWeight: 'bold',
      color: '#444',
      marginBottom: '6px',
    },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      marginBottom: '15px',
      fontSize: '15px',
    },
    textarea: {
      width: '100%',
      padding: '10px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      marginBottom: '15px',
      fontSize: '15px',
      resize: 'vertical',
      minHeight: '100px',
    },
    button: {
      backgroundColor: '#007bff',
      color: 'white',
      padding: '12px 20px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    notificationList: {
      marginTop: '30px',
    },
    success: {
      color: 'green',
      marginBottom: '15px',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>ارسال نوتیفیکیشن</h2>

      {successMessage && <div style={styles.success}>{successMessage}</div>}

      <form onSubmit={submit}>
        <label style={styles.label}>ارسال به همه کاربران؟</label>
        <input
          type="checkbox"
          checked={data.sendToAll}
          onChange={() => setData('sendToAll', !data.sendToAll)}
          style={{ marginBottom: '15px' }}
        />
        <span style={{ marginRight: '10px' }}>ارسال به همه</span>

        {!data.sendToAll && (
          <div>
            <label style={styles.label}>انتخاب کاربر</label>
            <select
              value={data.user_id}
              onChange={(e) => setData('user_id', e.target.value)}
              required
              style={styles.input}
            >
              <option value="">-- انتخاب کاربر --</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>
        )}

        <label style={styles.label}>عنوان</label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => setData('title', e.target.value)}
          required
          placeholder="مثلاً اطلاعیه جدید..."
          style={styles.input}
        />

        <label style={styles.label}>پیام</label>
        <textarea
          value={data.message}
          onChange={(e) => setData('message', e.target.value)}
          required
          placeholder="متن پیام را وارد کنید"
          style={styles.textarea}
        />

        <label style={styles.label}>نوع نوتیفیکیشن</label>
        <select
          value={data.type}
          onChange={(e) => setData('type', e.target.value)}
          style={styles.input}
        >
          <option value="info">اطلاعیه</option>
          <option value="warning">هشدار</option>
          <option value="license_expiry">انقضای لایسنس</option>
        </select>

        <button type="submit" style={styles.button}>
          ارسال
        </button>
      </form>

      {/* لیست نوتیفیکیشن‌ها */}
      <div style={styles.container}>
        <style >{`
          .notification-item {
            padding: 15px;
            border-bottom: 1px solid #ddd;
            margin-bottom: 10px;
            background-color: #f9f9f9;
            border-radius: 8px;
          }
          .user-info {
            margin-top: 15px;
            padding-top: 10px;
            padding-bottom: 10px;
            background-color: #f1f1f1;
            border-radius: 8px;
          }
          .user-detail {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
        `}</style>

        <h3>لیست نوتیفیکیشن‌ها</h3>
        <ul>
          {notifications.data.map((notif) => (
            <li key={notif.id} className="notification-item">
              <strong>{notif.title}</strong>: {notif.message} ({notif.type})
              {notif.user && (
                <div className="user-info">
                  <h4>اطلاعات کاربر:</h4>
                  <div className="user-detail">
                    <span><strong>نام:</strong> {notif.user.name}</span>
                    <span><strong>شماره تماس:</strong> {notif.user.phone}</span>
                    <span><strong>نام صرافی:</strong> {notif.user.exchange_name}</span>
                    <span><strong>آدرس:</strong> {notif.user.address}</span>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
