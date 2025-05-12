import './bootstrap';
import axios from 'axios'; // ⬅️ این رو اضافه کردیم
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import UserLayout from './Pages/Layout/UserLayout';
import Layout from './Pages/Layout/Layout';

// ✅ تنظیم CSRF برای همه درخواست‌های Axios
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const token = document.querySelector('meta[name="csrf-token"]');
if (token) {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
  console.error('❌ CSRF token not found in meta tag!');
}

// ✅ ساخت و اجرای برنامه با لایوت‌های متفاوت
createInertiaApp({
  initialPage: JSON.parse(document.getElementById('app').dataset.page),
  resolve: (name) => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
    const page = pages[`./Pages/${name}.jsx`];

    if (name.startsWith("Admin/")) {
      page.default.layout = (page) => <Layout>{page}</Layout>;
    } else {
      page.default.layout = (page) => <UserLayout>{page}</UserLayout>;
    }

    return page;
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
  title: (title) => `صرافی درخت پول ${title}`,
});
