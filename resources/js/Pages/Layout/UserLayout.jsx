import React from 'react';
import { usePage } from "@inertiajs/react";
import UserNavbar from './UserNavbar';
import Sidebar from './SidebarUser';

const Layout = ({ children }) => {
  const { auth } = usePage().props;

  if (!auth) {
    return <div>{children}</div>;
  }

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* --- سایدبار سمت چپ --- */}
      <aside style={{ 
        width: '250px',  // عرض سایدبار کوچکتر
        background: '#f8f9fa', 
        height: '100vh',  // ارتفاع کامل صفحه
        position: 'fixed',  // سایدبار ثابت در سمت چپ
        top: 0, 
        left: 0,
        borderRadius: '5px',
        zIndex: 1000,
        padding: '5px',  // فضای داخلی بیشتر برای دکمه‌ها
      }}>
        <Sidebar />
      </aside>

      {/* --- بخش اصلی --- */}
      <div style={{ 
        marginLeft: '250px',  // فاصله از سایدبار
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
        {/* --- ناوبار بالای صفحه --- */}
        <header style={{
          background: '#fff',
          borderBottom: '1px solid #dee2e6',
          position: 'fixed', 
          left: 0, // ناوبار چسبیده به بالای صفحه
          top: 0,
          width: '100٪',  // عرض ناوبار باید تا کنار سایدبار باشد
          marginLeft: '250px',  // موقعیت ناوبار در کنار سایدبار
          zIndex: 1000, // جلوگیری از تداخل ناوبار و سایدبار
        }}>
          <UserNavbar />
        </header>

        {/* --- محتوای اصلی --- */}
        <main style={{ 
          marginTop: '60px',  // فاصله از ناوبار
          flexGrow: 1, 
          padding: '20px',
          backgroundColor: '#f1f3f5',
        }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
