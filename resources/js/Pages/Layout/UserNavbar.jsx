import React from 'react';
import { Link, usePage } from "@inertiajs/react";

const UserNavbar = () => {
   const { auth } = usePage().props;

   // بررسی اینکه آیا اطلاعات کاربر موجود است یا خیر
   if (!auth) {
      return (
        <nav className="navbar navbar-light bg-light py-3 sticky-top">
          <div className="container d-flex justify-content-end">
            <span>Loading...</span> {/* یا می‌توانید یک پیغام دیگری نمایش دهید */}
          </div>
        </nav>
      );
   }

   return (
    <nav className="navbar navbar-light bg-light py-3 fixed-top">
         <div className="container d-flex justify-content-end">
            <img
               src="https://cdn.icon-icons.com/icons2/2468/PNG/512/user_icon_149329.png"
               height="25"
               alt=""
            />
            
            <h5 className="mb-0 ms-2">{auth.name}</h5>
         </div>
      </nav>
   );
};

export default UserNavbar;
