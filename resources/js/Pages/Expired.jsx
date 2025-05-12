import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

// استایل‌ها
const styles = {
    expiredPage: {
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        margin: 0,
        padding: 0,
        background: "#f3f4f6",
    },
    container: {
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #6EE7B7, #3B82F6)',
    },
    
    content: {
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '30px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        width: '100%',
        textAlign: 'center',
    },
    logo: {
        height: '80px',
        marginBottom: '20px',
    },
    title: {
        fontSize: '36px',
        fontWeight: '700',
        color: '#2D6A4F',
        marginBottom: '20px',
        textTransform: 'uppercase',
    },
    message: {
        fontSize: '18px',
        color: '#4B5563',
        marginBottom: '30px',
    },

    contactSection: {
        marginBottom: '30px',
    },
    list: {
        listStyleType: 'none',  // حذف نقاط
        paddingLeft: '0',  // حذف فاصله سمت چپ
        margin: '0',  // حذف فاصله‌های اضافی
    },
    listItem: {
        marginBottom: '10px',  // فاصله بین آیتم‌ها
        fontSize: '16px',  // اندازه فونت
        color: '#4B5563',  // رنگ متن
        display: 'inline-flex',  // قرار دادن آیکن و متن در یک خط
        alignItems: 'center',  // وسط‌چین کردن آیکن و متن
    },
    link: {
        textDecoration: 'none',
        display: 'block',
        backgroundColor: '#34D399',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '10px',
        margin: '10px 0',
        transition: 'background-color 0.3s ease, transform 0.3s ease',
    },
    linkHover: {
        backgroundColor: '#059669',
        transform: 'translateY(-2px)',
    },
    footer: {
        fontSize: '14px',
        color: '#D1D5DB',
        marginTop: '10px',
    },
    phone: {
        backgroundColor: '#FFDD57',
        color: '#2D6A4F',
        padding: '10px 15px',
        borderRadius: '8px',
        margin: '5px 0',
        fontSize: '16px',
        fontWeight: '600',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        display: 'flex',
        justifyContent: 'flex-end',  // انتقال به سمت راست
    },
    phoneHover: {
        backgroundColor: '#F59E0B',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    },
    logo: {
        height: '300px',
        width: 'auto', // به طور خودکار پهنای لوگو را متناسب با ارتفاع تنظیم می‌کند
        marginBottom: '10px',
    },
};

export default function Expired({ message, contactInfo }) {
    const [hovered, setHovered] = useState(null);

    useEffect(() => {
        // پس از بارگذاری کامپوننت، عملیات لاگ‌اوت را انجام می‌دهیم
        Inertia.post('/logout');

        // رفرش کردن صفحه برای بازگشت به صفحه لاگین پس از یک دقیقه
        setTimeout(() => {
            window.location.href = '/login';
        }, 60000);  // 60,000 میلی‌ثانیه یعنی یک دقیقه
    }, []);

    return (
        <div style={styles.expiredPage}>
            <div style={styles.container}>
                <div style={styles.content}>
                    <div className="flex justify-center mb-6">
                        <img 
                            src="/logo.png" 
                            alt="Logo"
                            style={styles.logo}
                        />
                    </div>
                    <h1 style={styles.title}>اشتراک شما منقضی شده است</h1>
                    <p style={styles.message}>{message}</p>

                    <div style={styles.contactSection}>
                        <ul style={styles.list}>
                            <li style={styles.listItem}>
                                <i className="fab fa-whatsapp" style={{ marginRight: '10px' }}></i>
                                <a 
                                    href={`https://wa.me/${contactInfo.whatsapp}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    style={hovered === 'whatsapp' ? { ...styles.link, ...styles.linkHover } : styles.link}
                                    onMouseEnter={() => setHovered('whatsapp')}
                                    onMouseLeave={() => setHovered(null)}
                                >
                                    واتساپ ما
                                </a>
                            </li>
                            <li style={styles.listItem}>
                                <i className="fab fa-telegram" style={{ marginRight: '10px' }}></i>
                                <a 
                                    href={`https://t.me/${contactInfo.telegram}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    style={hovered === 'telegram' ? { ...styles.link, ...styles.linkHover } : styles.link}
                                    onMouseEnter={() => setHovered('telegram')}
                                    onMouseLeave={() => setHovered(null)}
                                >
                                    تلگرام ما
                                </a>
                            </li>
                            <li style={styles.listItem}>
                                <i className="fas fa-envelope" style={{ marginRight: '10px' }}></i>
                                <a 
                                    href={`mailto:${contactInfo.email}`} 
                                    style={hovered === 'email' ? { ...styles.link, ...styles.linkHover } : styles.link}
                                    onMouseEnter={() => setHovered('email')}
                                    onMouseLeave={() => setHovered(null)}
                                >
                                    {contactInfo.email}
                                </a>
                            </li>
                            {/* شماره‌های تماس با استایل جدید */}
                            <li style={styles.phone} onMouseEnter={() => setHovered('phone1')} onMouseLeave={() => setHovered(null)}>
                                <i className="fas fa-phone" style={{ marginRight: '10px' }}></i>
                                شماره تماس اول: {contactInfo.phone1}
                            </li>
                            <li style={styles.phone} onMouseEnter={() => setHovered('phone2')} onMouseLeave={() => setHovered(null)}>
                                <i className="fas fa-phone" style={{ marginRight: '10px' }}></i>
                                شماره تماس دوم: {contactInfo.phone2}
                            </li>
                            <li style={styles.phone} onMouseEnter={() => setHovered('phone3')} onMouseLeave={() => setHovered(null)}>
                                <i className="fas fa-phone" style={{ marginRight: '10px' }}></i>
                                شماره تماس سوم: {contactInfo.phone3}
                            </li>
                        </ul>
                    </div>

                    <div style={{ fontSize: '20px', color: '#2D6A4F' }}>
                        این صحفه بعد از یک دقیق به صورت خودکار بسته می شود و به صفحه لاگین منتقل می شوید. این برای امنیت خود شما است
                    </div>
                </div>
            </div>
        </div>
    );
}
