import Image from 'next/image';
import React, { ReactNode } from 'react';
import crying from '../../public/images/crying.jpg';
import { FiMenu } from 'react-icons/fi';

export default function Header() {
  return (
    <div className="w-full">
      <div className="navbar bg-base-100 justify-between shadow-sm px-40">
        <div className="flex justify-start w-1/5">
          <div className="flex-none">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <FiMenu className="w-6 h-6 m-2" />
            </label>
          </div>
          <a className="btn btn-ghost normal-case text-xl">StreamWave</a>
        </div>
        <div className="grow w-3/5">
          <div className="form-control grow">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered md:w-4/5 m-auto max-lg:hidden"
            />
          </div>
        </div>
        <div className="flex justify-end w-1/5">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Image src={crying} alt="profile" width={200} height={200} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
