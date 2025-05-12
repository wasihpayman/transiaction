import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const Profile = ({ profile }) => {
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!profile) return <div>در حال بارگذاری اطلاعات پروفایل...</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
  
    Inertia.visit('/profile', {
      method: 'post',
      data: formData,
      preserveScroll: true,
      onSuccess: () => {
        setErrorMessage('');
        // پیام موفقیت رو فقط وقتی onSuccess فراخوانی شد نمایش بده
        setMessage('پروفایل با موفقیت به‌روزرسانی شد');
      },
      onError: (errors) => {
        setMessage('');
        if (errors?.username) {
          setErrorMessage('یوزرنیم قبلاً گرفته شده است.');
        } else {
          setErrorMessage('خطای دیگری رخ داده است.');
        }
      },
      onFinish: () => {
        // می‌تونی برای بررسی نهایی اینجا لاگ بزاری یا spinner رو ببندی
      }
    });
    
  };
  

  return (
    <div className="profile-container">
      <h1 className="profile-title">پروفایل</h1>
      <div className="profile-message">
        {message && <p>{message}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
      <div className="profile-card">
        <div className="profile-photo">
          <img src={profile.profile_photo || '/default-profile.png'} alt="Profile" />
        </div>
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>نام کاربری</label>
            <input type="text" name="username" defaultValue={profile.username} required />
          </div>
          <div className="form-group">
            <label>تاریخ انقضا</label>
            <input type="date" value={profile.expiry_date} disabled />
          </div>
          <div className="form-group">
            <label>شماره تماس</label>
            <input type="text" name="phone" defaultValue={profile.phone} required />
          </div>
          <div className="form-group">
            <label>آدرس</label>
            <textarea name="address" defaultValue={profile.address} required></textarea>
          </div>
          <div className="form-group">
            <label>تصویر پروفایل</label>
            <input type="file" name="profile_photo" />
          </div>
          <button type="submit" className="submit-btn">به‌روزرسانی پروفایل</button>
        </form>
      </div>

      <style>{`
        /* Ensures the body takes full height */
        html, body {
          height: 100%;
          margin: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #f8f9fa;
        }

        .profile-container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          background-color: #f8f9fa;
          width: 100%;
          height: 100%;
          padding: 20px;
        }

        .profile-title {
          font-size: 2rem;
          color: #333;
          margin-bottom: 20px;
        }

        .profile-card {
          background-color: white;
          border-radius: 8px;
          padding: 30px;
          width: 100%;
          max-width: 600px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
          box-sizing: border-box;
        }

        .profile-photo {
          margin-bottom: 20px;
        }

        .profile-photo img {
          border-radius: 50%;
          width: 100px;
          height: 100px;
          object-fit: cover;
        }

        .form-group {
          margin-bottom: 15px;
          width: 100%;
        }

        .form-group label {
          font-size: 1rem;
          color: #555;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 10px;
          margin-top: 5px;
          border-radius: 5px;
          border: 1px solid #ddd;
          font-size: 1rem;
        }

        .form-group textarea {
          resize: vertical;
          height: 100px;
        }

        .submit-btn {
          padding: 10px 20px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
          margin-top: 20px;
        }

        .submit-btn:hover {
          background-color: #45a049;
        }

        .profile-message {
          margin-bottom: 20px;
          font-size: 1rem;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default Profile;
