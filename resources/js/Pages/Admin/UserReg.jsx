import { useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import css from'../../../css/UserReg.css';

const RegisterUser = () => {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    phone: '',
    email: '',
    exchange_name: '',
    start_date: '',
    expiry_date: '',
    address: '',
    password: '',
    confirm_password: '',
  });

  const { props } = usePage();
  const successMessage = props.flash?.success;

  const handleSubmit = (e) => {
    e.preventDefault();

    // چک کنیم رمز و تایید رمز برابر باشند
    if (data.password !== data.confirm_password) {
      toast.error('رمز عبور و تایید رمز عبور با هم مطابقت ندارند.');
      return;
    }

    post('/admin/register-user', {
      onSuccess: () => reset(),
    });
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-200 to-indigo-300 p-4">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 mb-10">
          ثبت‌نام کاربر جدید
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* نام کامل */}
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-700">نام کامل</label>
              <input
                id="name"
                type="text"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                placeholder="نام کامل خود را وارد کنید"
                className="input-field"
              />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </div>

            {/* شماره تلفن */}
            <div>
              <label htmlFor="phone" className="block text-sm font-bold text-gray-700">شماره تلفن</label>
              <input
                id="phone"
                type="text"
                value={data.phone}
                onChange={(e) => setData('phone', e.target.value)}
                placeholder="شماره تلفن خود را وارد کنید"
                className="input-field"
              />
              {errors.phone && <p className="error-text">{errors.phone}</p>}
            </div>

            {/* نام صرافی */}
            <div>
              <label htmlFor="exchange_name" className="block text-sm font-bold text-gray-700">نام صرافی</label>
              <input
                id="exchange_name"
                type="text"
                value={data.exchange_name}
                onChange={(e) => setData('exchange_name', e.target.value)}
                placeholder="نام صرافی را وارد کنید"
                className="input-field"
              />
              {errors.exchange_name && <p className="error-text">{errors.exchange_name}</p>}
            </div>

            {/* آدرس */}
            <div>
              <label htmlFor="address" className="block text-sm font-bold text-gray-700">آدرس</label>
              <textarea
                id="address"
                value={data.address}
                onChange={(e) => setData('address', e.target.value)}
                placeholder="آدرس خود را وارد کنید"
                rows="1"
                className="input-field resize-none"
              />
              {errors.address && <p className="error-text">{errors.address}</p>}
            </div>

            {/* تاریخ شروع */}
            <div>
              <label htmlFor="start_date" className="block text-sm font-bold text-gray-700">تاریخ شروع</label>
              <input
                id="start_date"
                type="date"
                value={data.start_date}
                onChange={(e) => setData('start_date', e.target.value)}
                className="input-field"
              />
              {errors.start_date && <p className="error-text">{errors.start_date}</p>}
            </div>

            {/* تاریخ انقضا */}
            <div>
              <label htmlFor="expiry_date" className="block text-sm font-bold text-gray-700">تاریخ انقضا</label>
              <input
                id="expiry_date"
                type="date"
                value={data.expiry_date}
                onChange={(e) => setData('expiry_date', e.target.value)}
                className="input-field"
              />
              {errors.expiry_date && <p className="error-text">{errors.expiry_date}</p>}
            </div>

            {/* ایمیل */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700">ایمیل</label>
              <input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                placeholder="ایمیل خود را وارد کنید"
                className="input-field"
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            {/* رمز عبور */}
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-700">رمز عبور</label>
              <input
                id="password"
                type="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                placeholder="رمز عبور خود را وارد کنید"
                className="input-field"
              />
              {errors.password && <p className="error-text">{errors.password}</p>}
            </div>

            {/* تایید رمز عبور */}
            <div>
              <label htmlFor="confirm_password" className="block text-sm font-bold text-gray-700">تایید رمز عبور</label>
              <input
                id="confirm_password"
                type="password"
                value={data.confirm_password}
                onChange={(e) => setData('confirm_password', e.target.value)}
                placeholder="رمز عبور را دوباره وارد کنید"
                className="input-field"
              />
            </div>
          </div>
              {/* دکمه ثبت نام */}
              <div className="pt-6">
  <button
    type="submit"
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
    {processing ? 'در حال ثبت‌نام...' : 'ثبت‌نام'}
  </button>
</div>

        </form>
      </div>
    </div>
  );
};

export default RegisterUser;
