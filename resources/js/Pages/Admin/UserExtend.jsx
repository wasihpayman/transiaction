import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Inertia } from '@inertiajs/inertia';
import styles from '../../../css/UserExtend.css';
import { usePage } from '@inertiajs/react';

const UserExtend = () => {
  const { props } = usePage();
  const { users = [], message } = props;

  const [processing, setProcessing] = useState(false);
  const [updatedUsers, setUpdatedUsers] = useState(users || []);
  const [searchQuery, setSearchQuery] = useState("");
  // نمایش پیام موفقیت در صورت دریافت آن
  useEffect(() => {
    if (message) {
      toast.success(message);
    }
  }, [message]);

  // تابع برای تمدید لایسنس
  const handleExtendLicense = async (userId, currentExpiryDate) => {
    if (processing) return;
    setProcessing(true);
  
    const newExpiryDate = new Date(currentExpiryDate);
    newExpiryDate.setFullYear(newExpiryDate.getFullYear() + 1);
  
    try {
      await Inertia.post('/admin/user-extend', { 
        id: userId, 
        new_expiry_date: newExpiryDate.toISOString()
      });
  
      setUpdatedUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? { ...user, expiry_date: newExpiryDate.toISOString() }
            : user
        )
      );
  
       refreshUserList();
  
      toast.success(`لیسنس برای کاربر ${userId} تمدید شد.`);
    } catch (error) {
      toast.error(error.response?.data?.errors?.user_not_found || 'مشکلی در تمدید لایسنس پیش آمد.');
    } finally {
      setProcessing(false);
    }
  };

  // تابع برای بارگذاری مجدد لیست کاربران
  const refreshUserList = async () => {
    try {
      Inertia.get('/admin/user-extend', { preserveState: true, preserveScroll: true });
    } catch (error) {
      toast.error('مشکلی در بارگذاری لیست کاربران پیش آمد.');
    }
  };

  // تبدیل تاریخ به فرمت مناسب
  const formatDate = (date) => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      return 'تاریخ نامعتبر';
    }
    return parsedDate.toLocaleDateString('en-US');
  };

  // فیلتر کاربران بر اساس جستجو
  const filteredUsers = (updatedUsers || []).filter(user => {
    if (!user) return false;
    const query = (searchQuery || "").toLowerCase();
    
    return ['name', 'phone', 'exchange_name'].some(field => 
      String(user[field] || '').toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-200 to-indigo-300 p-4">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 mb-10">
          صفحه تمدید و مدیریت کاربران
        </h2>

        {/* فیلد جستجو */}
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="جستجو بر اساس نام، شماره تماس یا نام صرافی"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold">کاربران موجود:</h3>
            {filteredUsers.length > 0 ? (
              <table className="min-w-full table-auto border-separate border-spacing-2 mt-4">
                <thead>
                  <tr>
                    <th className="border-b-2 border-gray-300 text-left px-4 py-2">نام کاربر</th>
                    <th className="border-b-2 border-gray-300 text-left px-4 py-2">تاریخ شروع</th>
                    <th className="border-b-2 border-gray-300 text-left px-4 py-2">تاریخ پایان</th>
                    <th className="border-b-2 border-gray-300 text-left px-4 py-2">نام صرافی</th>
                    <th className="border-b-2 border-gray-300 text-left px-4 py-2">شماره تماس</th>
                    <th className="border-b-2 border-gray-300 text-center px-4 py-2">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="odd:bg-gray-100 even:bg-gray-200">
                      <td className="border-b px-4 py-2">{user.name}</td>
                      <td className="border-b px-4 py-2">{formatDate(user.start_date)}</td>
                      <td className="border-b px-4 py-2">{formatDate(user.expiry_date)}</td>
                      <td className="border-b px-4 py-2">{user.exchange_name || 'نام صرافی در دسترس نیست'}</td>
                      <td className="border-b px-4 py-2">{user.phone || 'شماره تماس در دسترس نیست'}</td>
                      <td className="border-b text-center px-4 py-2">
                        <button
                          onClick={() => handleExtendLicense(user.id, user.expiry_date)}
                          disabled={processing}
    className="bg-black btn btn-outline-light w-100 marginetop-4"
    style={{
      backgroundColor: '#4B5563',
      color: 'white',
      padding: '10px 20px',
      marginTop: '20px',
      borderRadius: '5px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: processing ? 'not-allowed' : 'pointer',
      transition: 'background-color 0.3s ease, color 0.3s ease',
    }}
    onMouseEnter={(e) => {
      e.target.style.backgroundColor = 'white';
      e.target.style.color = 'black';
    }}
    onMouseLeave={(e) => {
      e.target.style.backgroundColor = '#4B5563';
      e.target.style.color = 'white';
    }}
                        >
                          {processing ? 'در حال تمدید...' : 'تمدید'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500 mt-2">کاربری موجود نیست.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserExtend;
