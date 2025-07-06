import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, } from 'react-router';
import Social from '../SocialLogin/Social';
import useAuth from '../../../Hooks/useAuth';

const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn } = useAuth();
    const onSubmit = data => {
        signIn(data.email, data.password)
            .then(res => {
                console.log("Sign-in success:", res);
                navigate('/'); 
            })
            .catch(error => {
                console.error("Sign-in failed:", error);
            });
    }
    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0">
            <div className="card-body bg-base-200">
                <h1 className="text-4xl font-bold">Welcome Back !</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">
                        <label className="label">Email</label>
                        <input type="email" {...register("email", { required: true })} className="input " placeholder="Email" />
                        {errors.email?.type === 'required' && <span>Email is required</span>}
                        <label className="label">Password</label>
                        <input type="password" {...register("password", { required: true, minLength: 6 })} className="input" placeholder="Password" />
                        {errors.password && <span>Enter valid password</span>}
                        {errors.password?.type === 'minLength' && <span>Password should be in length 6</span>}
                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn bg-[#B6D63C] mt-4">Login</button>
                        <p>Haven't account? <span className='font-bold text-[#B6D63C] btn btn-link '><Link to={'/register'}>Register</Link></span></p>
                    </fieldset>
                </form>
                <Social></Social>
            </div>
        </div>
    );
};

export default Login;