import React from 'react';
import Login from '../Pages/Authentication/Login/Login';
import { Outlet } from 'react-router';
import AuthImage from '../assets/authImage.png';
import ProfastLogo from '../ProfastLogo/ProfastLogo';
const AuthLayout = () => {
    return (
        <div className="px-[10%] bg-base-200 min-h-dvh">
            <div className='py-5'>
                <ProfastLogo></ProfastLogo>
            </div>
            <div className="hero-content flex items-center justify-between flex-col lg:flex-row-reverse">
                <div className='flex-1 place-items-center'>
                    <img
                        src={AuthImage}
                        className="max-w-sm md:max-w-2xl rounded-lg"
                    />
                </div>
                <div className='flex-1 '>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout; 