import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import Navbar from "@/Pages/Layout/Navbar"; // وارد کردن کامپوننت Navbar

// تابع debounce برای جلوگیری از درخواست‌های زیاد در هر تایپ
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default function ADUsers() {
    const { users } = usePage().props;
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedQuery = useDebounce(searchQuery, 300);

    const filteredUsers = users.filter((user) => {
        const query = debouncedQuery.toLowerCase();
        const name = user.name?.toLowerCase() || "";
        const email = user.email?.toLowerCase() || "";
        const address = user.address?.toLowerCase() || "";
        const phone = user.phone?.toLowerCase() || "";

        return (
            name.includes(query) ||
            email.includes(query) ||
            address.includes(query) ||
            phone.includes(query)
        );
    });

    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar با دکمه بازگشت به داشبورد */}

            {/* بدنه اصلی: محتوا بدون سایدبار */}
            <div className="flex flex-1 h-[calc(100vh-64px)] overflow-y-auto p-4">
                <h2 className="text-center text-xl font-bold mb-4">جستجوی کاربران</h2>

                {/* سرچ */}
                <div className="mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="جستجو بر اساس نام، ایمیل یا شماره تماس"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* جدول کاربران */}
                <div className="overflow-x-auto">
                    <table className="table table-bordered table-striped w-full">
                        <thead>
                            <tr>
                                <th>نام کامل</th>
                                <th>ایمیل</th>
                                <th>آدرس</th>
                                <th>شماره تماس</th>
                                <th>تاریخ شروع</th>
                                <th>تاریخ انقضا</th>
                                <th>نام صرافی</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.address}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.start_date || "ندارد"}</td>
                                        <td>{user.expiry_date || "ندارد"}</td>
                                        <td>{user.exchange_name || "نامشخص"}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">
                                        کاربری یافت نشد
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
