import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

const SecurityLog = () => {
  const { auth, logs } = usePage().props;
  console.log(auth); // بررسی مقدار auth
  console.log(logs); // بررسی مقدار logs

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Auth:', auth);  // مقدار auth را بررسی کن
    console.log('Logs:', logs);  // مقدار logs را بررسی کن
    if (auth && auth.user && logs && logs.data && logs.data.length > 0) {
      setLoading(false);
    }
  }, [auth, logs]); // تغییرات auth و logs باعث به‌روزرسانی می‌شود

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Security Log</h1>
      <p>User: {auth.user.name}</p>
      <div className="min-h-screen bg-gray-100 p-6">
        <h2 className="text-3xl font-bold text-center mb-6">سابقه امنیتی</h2>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">نام کاربر</th>
              <th className="border px-4 py-2">نوع عمل</th>
              <th className="border px-4 py-2">آدرس IP</th>
              <th className="border px-4 py-2">زمان</th>
              <th className="border px-4 py-2">جزئیات</th>
            </tr>
          </thead>
          <tbody>
            {logs && logs.data && logs.data.length > 0 ? (
              logs.data.map((log) => (
                <tr key={log.id}>
                  <td className="border px-4 py-2">{log.user ? log.user.name : 'ناشناس'}</td>
                  <td className="border px-4 py-2">{log.action_type}</td>
                  <td className="border px-4 py-2">{log.ip_address}</td>
                  <td className="border px-4 py-2">{new Date(log.created_at).toLocaleString()}</td>
                  <td className="border px-4 py-2">{log.details}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border px-4 py-2 text-center">هیچ داده‌ای وجود ندارد</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );  
};

export default SecurityLog;
