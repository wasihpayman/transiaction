import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';

const Remittances = () => {
  const { sent = [], received = [], pending = [], delivered = [], exchanges = [] } = usePage().props;

  const [activeTab, setActiveTab] = useState('sent');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    receiver_name: '',
    receiver_lastname: '',
    receiver_tazkira: '',
    code: '',
    amount: '',
    delivery_date: new Date().toISOString().slice(0, 10),
    receiver_phone: '', // شماره تلفن
    sender_username: '', // یوزرنیم صرافی
  });

  // تابع برای دریافت نام کاربری صرافی با شماره تلفن
  const fetchExchangeUsernameByPhone = async (phone) => {
    if (phone.length >= 3) {
      // ارسال درخواست به سرور برای دریافت نام کاربری صرافی با شماره تلفن
      const response = await fetch(`/exchangeusername?phone=${phone}`);
      const data = await response.json();
      if (data.username) {
        setFormData({ ...formData, sender_username: data.username });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'receiver_phone') {
      fetchExchangeUsernameByPhone(value);  // فراخوانی تابع برای دریافت یوزرنیم صرافی
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post('/remittances', formData, {
      onSuccess: () => {
        setShowModal(false);
        setFormData({
          receiver_name: '',
          receiver_lastname: '',
          receiver_tazkira: '',
          code: '',
          amount: '',
          delivery_date: new Date().toISOString().slice(0, 10),
          receiver_phone: '',
          sender_username: '',  // ریست کردن یوزرنیم
        });
      },
    });
  };

  const renderTable = (data) => (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>کد حواله</th>
          <th>گیرنده</th>
          <th>فرستنده</th>
          <th>مقدار</th>
          <th>تاریخ تحویل</th>
          <th>وضعیت</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item) => (
            <tr key={item.id}>
              <td>{item.code}</td>
              <td>{item.receiver_name} {item.receiver_lastname}</td>
              <td>{item.sender?.username}</td>
              <td>{item.amount}</td>
              <td>{item.delivery_date}</td>
              <td>{item.status}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center">هیچ داده‌ای موجود نیست</td>
          </tr>
        )}
      </tbody>
    </table>
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">داشبورد حواله‌ها</h2>

      <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        + ارسال حواله جدید
      </button>

      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'sent' ? 'active' : ''}`} onClick={() => setActiveTab('sent')}>ارسال‌شده</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'received' ? 'active' : ''}`} onClick={() => setActiveTab('received')}>دریافتی</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'pending' ? 'active' : ''}`} onClick={() => setActiveTab('pending')}>در انتظار</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'delivered' ? 'active' : ''}`} onClick={() => setActiveTab('delivered')}>تحویل‌شده</button>
        </li>
      </ul>

      {activeTab === 'sent' && renderTable(sent)}
      {activeTab === 'received' && renderTable(received)}
      {activeTab === 'pending' && renderTable(pending)}
      {activeTab === 'delivered' && renderTable(delivered)}

      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">ارسال حواله</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">شماره تلفن گیرنده</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="receiver_phone" 
                      value={formData.receiver_phone} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">نام گیرنده</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="receiver_name" 
                      value={formData.receiver_name} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">تخلص گیرنده</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="receiver_lastname" 
                      value={formData.receiver_lastname} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">شماره تذکره</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="receiver_tazkira" 
                      value={formData.receiver_tazkira} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">نام کاربری صرافی</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="sender_username" 
                      value={formData.sender_username} 
                      readOnly 
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">کد حواله</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="code" 
                      value={formData.code} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">مقدار</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      name="amount" 
                      value={formData.amount} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>بستن</button>
                  <button type="submit" className="btn btn-primary">ارسال</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Remittances;
