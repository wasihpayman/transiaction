import React, { useEffect, useState } from 'react';

const LoginAttempts = ({ loginAttempts }) => {
    const [sortedAttempts, setSortedAttempts] = useState([]);

    useEffect(() => {
        console.log('Daten von Laravel:', loginAttempts); // بررسی داده‌ها در کنسول

        // تنظیم داده‌ها برای مرتب‌سازی
        if (Array.isArray(loginAttempts)) {
            setSortedAttempts([...loginAttempts]);
        }
    }, [loginAttempts]);

    const blockIp = (attemptId) => {
        console.log('مسدود کردن IP با ID:', attemptId);
    };

    // تابع برای مرتب‌سازی داده‌ها (براساس زمان تلاش یا آی‌پی)
    const sortByDate = () => {
        const sorted = [...sortedAttempts].sort((a, b) => new Date(b.attempted_at) - new Date(a.attempted_at));
        setSortedAttempts(sorted);
    };

    return (
        <div>
            <h1>تلاش‌های ناموفق ورود به سیستم</h1>
            <button onClick={sortByDate} className="btn btn-info mb-3">مرتب‌سازی براساس زمان تلاش</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>آدرس IP</th>
                        <th>زمان تلاش</th>
                        <th>پیام خطا</th>
                        <th>عملیات</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedAttempts.length > 0 ? (
                        sortedAttempts.map(attempt => (
                            <tr key={attempt.id}>
                                <td>{attempt.ip_address}</td>
                                <td>{attempt.attempted_at}</td>
                                <td>{attempt.error_message || 'بدون پیام خطا'}</td>
                                <td>
                                    <button onClick={() => blockIp(attempt.id)} className="btn btn-danger">
                                        مسدود کردن
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">هیچ داده‌ای برای نمایش وجود ندارد.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default LoginAttempts;
