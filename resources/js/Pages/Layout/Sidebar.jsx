import { Link, usePage } from "@inertiajs/react";  // افزودن usePage برای استفاده از مسیر فعلی
import React from "react";  // افزودن React برای JSX
import "../../../css/Sidebars.css";  // افزودن استایل‌های CSS برای Sidebar
export default function Sidebar() {
    const { url } = usePage();  // دریافت آدرس فعلی با usePage

    return (
        <>
            <h1 className="visually-hidden">Sidebars examples</h1>
            <div
                className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
                style={{ width: 280 }}
            >
                <a
                    href="/"
                    className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
                >
                    <svg className="bi me-2" width={40} height={32}></svg>
                    <span className="fs-4">Admin Panel</span>
                </a>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto text-light">
                    <li className="nav-item my-2">
                        <Link
                            href="/dashboard"
                            className={`btn btn-outline-light w-100 ${
                                url === "/dashboard" ? "active" : ""
                            }`}
                            aria-current="page"
                        >
                            Dashboard
                        </Link>
                        <ul>
                            <li className="nav-item my-3">
                                <Link href="/admin/users" className="btn btn-outline-light w-100">
                                    Users
                                </Link>
                            </li>
                        </ul>
                        <ul>
                            <li className="nav-item my-3">
                                <Link href="/admin/user-reg" className="btn btn-outline-light w-100">
                                    User Registration
                                </Link>
                            </li>
                        </ul>
                        <ul>
                            <li className="nav-item my-3">
                                <Link href="/admin/user-extend" className="btn btn-outline-light w-100">
                                    User EDIT EXTEND
                                </Link>
                            </li>
                        </ul>
                        <ul>
                            <li className="nav-item my-3">
                            <Link href="/login-attempts" className="btn btn-outline-light w-100">
                              Log In Logs
                            </Link>

                            </li>
                        </ul>

                        <ul>
                            <li className="nav-item my-3">
                            <Link href="/admin/admin/security-logs" className="btn btn-outline-light w-100">
                                 Security Logs
                            </Link>


                            </li>
                        </ul>
                        <ul>
                            <li className="nav-item my-3">
                            <Link href="/admin/admin/notification" className="btn btn-outline-light w-100">
                                 Notification Management
                            </Link>


                            </li>
                        </ul>
                    </li>
                </ul>
                <hr />
                <div className="">
                    <a
                        href="#"
                        className="d-flex align-items-center text-white text-decoration-none"
                    >
                        <Link
                            href="/logout"
                            method="post"
                            className="btn btn-outline-light w-100"
                            as="button"
                        >
                            Logout
                        </Link>
                    </a>
                </div>
            </div>
            <div className="b-example-divider" style={{ width: 0 }}></div>
        </>
    );
}
