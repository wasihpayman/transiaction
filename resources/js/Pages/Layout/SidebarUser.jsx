import React from 'react';
import { Link } from '@inertiajs/react';
import '../../../css/sidebars.css'; // Import your CSS file for styling

const SidebarUser = () => {
  return (
    <div
    className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
    style={{ width: 250, marginTop: '48px', height: 'calc(100vh - 60px)', overflowY: 'auto', borderRadius: '10px',}}
    >
      {/* قسمت محتوا */}
      <div className="flex-grow-1">
        <center>
          <h4 className="mb-4">Money Tree</h4>
        </center>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link
              href="/user/dashboard"
              className="btn btn-outline-light w-100"
              as="button"
            >
              DASHBOARD
            </Link>
          </li>
        </ul>
        <hr />
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link
              href="/remittances"
              className="btn btn-outline-light w-100"
              as="button"
            >
              Remittances
            </Link>
          </li>
        </ul>

      </div>
      <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link
              href="/profile"
              className="btn btn-outline-light w-100"
              as="button"
            >
              Profile
            </Link>
          </li>
        </ul>
      {/* قسمت دکمه Logout در پایین */}

      <div className="mt-auto mb-4">
  <a
    href="#"
    className="d-flex align-items-center text-white text-decoration-none"
  >
    <hr />
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
  );
};

export default SidebarUser;
