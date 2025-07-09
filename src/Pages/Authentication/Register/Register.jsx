import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import Social from '../SocialLogin/Social';
import useAuth from '../../../Hooks/useAuth';
import axios from 'axios';
import useAxios from '../../../Hooks/useAxios';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const [profilePic, setProfilePic] = useState(' ');
    const axiosInstance= useAxios();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';

    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(async (res) => {
                const userProfile = {
                    displayName: data.name,
                    photoURL: profilePic
                };
                console.log(res)
                
                //update user info in the database
                const userInfo={
                    email: data.email,
                    role: 'user', //default role
                    created_at: new Date(),
                    last_log_in:new Date()
                }
                
                const userRes = await axiosInstance.post('/users',userInfo);
                console.log(userRes.data)

                //update profile with uploaded image
                updateUserProfile(userProfile)
                    .then(() => {
                        console.log('Profile name and picture updated');
                    })
                    .catch(error => {
                        console.error(error);
                    });
                navigate(from);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append('image', image);

        const res = await axios.post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_KEY}`,
            formData
        );
        setProfilePic(res.data.data.url);
    };

    return (
        <div className="flex justify-center items-center mt-10">
            <div className="card w-full max-w-md border border-gray-300 rounded-xl">
                <div className="card-body">
                    <h1 className="text-3xl font-bold text-center mb-4">Create an Account</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                        <div>
                            <label className="label">Name</label>
                            <input
                                type="text"
                                {...register("name")}
                                className="input input-bordered w-full"
                                placeholder="Your Name"
                            />
                        </div>
                        <div>
                            <label className="label">Choose a profile picture</label>
                            <input
                                type="file"
                                onChange={handleImageUpload}
                                className="file-input file-input-bordered w-full"
                                accept="image/*"
                            />
                        </div>
                        <div>
                            <label className="label">Email</label>
                            <input
                                type="email"
                                {...register("email")}
                                className="input input-bordered w-full"
                                placeholder="Email"
                            />
                        </div>
                        <div>
                            <label className="label">Password</label>
                            <input
                                type="password"
                                {...register("password", { required: true, minLength: 6 })}
                                className="input input-bordered w-full"
                                placeholder="Password"
                            />
                            {errors.password && (
                                <span className="text-red-500 text-sm">Password must be at least 6 characters</span>
                            )}
                        </div>
                        <div className="flex justify-between items-center">
                            <a className="link link-hover text-sm">Forgot password?</a>
                        </div>
                        <button type="submit" className="btn bg-[#B6D63C] w-full text-white hover:bg-[#a7c42c]">
                            Register
                        </button>
                        <p className="text-sm text-center mt-2">
                            Already have an account?{' '}
                            <Link to="/login" className="text-[#B6D63C] font-bold hover:underline">
                                Login
                            </Link>
                        </p>
                    </form>
                    <div className="divider">OR</div>
                    <Social />
                </div>
            </div>
        </div>
    );
};

export default Register;
