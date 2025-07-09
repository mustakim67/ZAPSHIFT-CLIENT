import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import ProfastLogo from '../ProfastLogo/ProfastLogo';
import { FaHome, FaBox, FaMoneyCheckAlt, FaSearchLocation, FaUserEdit, FaUsers, FaHourglassHalf } from 'react-icons/fa';
import { MdAdminPanelSettings } from "react-icons/md";
import useUserRole from '../Hooks/useUserRole';
import { FaMotorcycle } from "react-icons/fa6";

const DashboardLayout = () => {
    const { role, roleLoading } = useUserRole();
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <div className="navbar bg-base-300 w-full lg:hidden">
                        <div className="flex-none ">
                            <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block h-6 w-6 stroke-current"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    ></path>
                                </svg>
                            </label>
                        </div>
                        <div className="mx-2 flex-1 px-2">DashBoard</div>
                    </div>
                    {/* Page content here */}
                    <div className='px-[2%] pt-10'>
                        <Outlet></Outlet>
                    </div>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>

                    <ul className="menu text-base-content min-h-full w-80 p-4 bg-gray-300">
                        <ProfastLogo />

                        <li className="mt-4">
                            <Link to="/" className="flex items-center gap-2">
                                <FaHome /> Home
                            </Link>
                        </li>

                        <li>
                            <NavLink to="/dashboard/myparcels" className="flex items-center gap-2">
                                <FaBox /> My Parcels
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/dashboard/payment-history" className="flex items-center gap-2">
                                <FaMoneyCheckAlt /> Payment History
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/dashboard/track" className="flex items-center gap-2">
                                <FaSearchLocation /> Track a Parcel
                            </NavLink>
                        </li>
                        {/* //admin links */}
                        {!roleLoading && role === 'admin' &&
                            <>
                                {/* Pending Rider Requests */}
                                <li>
                                    <NavLink to="/dashboard/pending-riders" className="flex items-center gap-2">
                                        <FaHourglassHalf /> Pending Rider Requests
                                    </NavLink>
                                </li>
                                {/* Active Riders */}
                                <li>
                                    <NavLink to="/dashboard/active-riders" className="flex items-center gap-2">
                                        <FaUsers /> Active Riders
                                    </NavLink>
                                </li>
                                {/* Assign Rider */}
                                <li>
                                    <NavLink to="/dashboard/assign-rider" className="flex items-center gap-2">
                                        <FaMotorcycle /> Assign Rider
                                    </NavLink>
                                </li>
                                {/* Admin MAnage */}
                                <li>
                                    <NavLink to="/dashboard/admin" className="flex items-center gap-2">
                                        <MdAdminPanelSettings /> Add New Admin
                                    </NavLink>
                                </li>
                            </>

                        }


                        <li>
                            <NavLink to="/dashboard/update-profile" className="flex items-center gap-2">
                                <FaUserEdit /> Update Profile
                            </NavLink>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;