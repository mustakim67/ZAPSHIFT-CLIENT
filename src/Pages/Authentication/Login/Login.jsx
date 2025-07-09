import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import Social from '../SocialLogin/Social';
import useAuth from '../../../Hooks/useAuth';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';

    const onSubmit = data => {
        signIn(data.email, data.password)
            .then(res => {
                console.log("Sign-in success:", res);
                navigate(from);
            })
            .catch(error => {
                console.error("Sign-in failed:", error);
            });
    };

    return (
        <div className="flex justify-center items-center mt-10 rounded-xl">
            <div className="card w-full max-w-md border border-gray-300">
                <div className="card-body">
                    <h1 className="text-3xl font-bold text-center mb-4">Welcome Back!</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="label">Email</label>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                className="input input-bordered w-full"
                                placeholder="Email"
                            />
                            {errors.email?.type === 'required' && (
                                <span className="text-red-500 text-sm">Email is required</span>
                            )}
                        </div>
                        <div>
                            <label className="label">Password</label>
                            <input
                                type="password"
                                {...register("password", { required: true, minLength: 6 })}
                                className="input input-bordered w-full"
                                placeholder="Password"
                            />
                            {errors.password?.type === 'required' && (
                                <span className="text-red-500 text-sm">Password is required</span>
                            )}
                            {errors.password?.type === 'minLength' && (
                                <span className="text-red-500 text-sm">Password must be at least 6 characters</span>
                            )}
                        </div>
                        <div className="flex justify-between items-center">
                            <a className="link link-hover text-sm">Forgot password?</a>
                        </div>
                        <button type="submit" className="btn w-full bg-[#B6D63C] text-white hover:bg-[#a7c42c]">
                            Login
                        </button>
                        <p className="text-sm text-center">
                            Haven't account?{' '}
                            <Link to="/register" className="text-[#B6D63C] font-bold hover:underline">
                                Register
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

export default Login;
