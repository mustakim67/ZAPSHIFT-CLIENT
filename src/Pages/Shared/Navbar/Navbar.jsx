import React from 'react';
import { Link, NavLink } from 'react-router';
import ProfastLogo from '../../../ProfastLogo/ProfastLogo';
import useAuth from '../../../Hooks/useAuth';


const Navbar = () => {
    const { user, logOut } = useAuth();
    const handleSignOut = () => {
        logOut();
    }
    const navItems = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        {
            user &&
            <li><NavLink to={'/dashboard'}>Dashboard</NavLink></li>
        }
        <li><NavLink to={'/sendParcel'}>Send a Parcel</NavLink></li>
        <li><NavLink to="/be-rider" className="flex items-center gap-2">Be a Rider</NavLink></li>
        <li><NavLink to={'/coverage'}>Coverage</NavLink></li>
        <li><NavLink to={'/about'}>About</NavLink></li>

    </>
    return (
        <div className="navbar bg-white shadow-lg px-[10%] py-5 sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navItems}
                    </ul>
                </div>
                <ProfastLogo></ProfastLogo>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-lg">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <Link to={'/'} onClick={handleSignOut} className='btn bg-[#B6D63C] '>LogOut</Link> : <Link to={'/login'} className='btn bg-[#B6D63C] '>Login</Link>
                }

            </div>
        </div>
    );
};

export default Navbar;