import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { Link, } from 'react-router';
import Social from '../SocialLogin/Social';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {createUser}=useAuth();

    const onSubmit = data => {
        createUser(data.email,data.password)
        .then(res=>{
            console.log(res.user);
        })
        .catch(error=>{
            console.error(error);
        })
    }
    return (
        <div className="card bg-base-200 w-full max-w-sm shrink-0">
            <div className="card-body">
                <h1 className="text-4xl font-bold">Create an account</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">
                        <label className="label">Email</label>
                        <input type="email" {...register("email")} className="input" placeholder="Email" />
                        <label className="label">Password</label>
                        <input type="password" {...register("password")} className="input" placeholder="Password" />
                        {errors.password && <span>Enter valid password</span>}
                        {errors.password?.type === 'minLength' && <span>Password should be in length 6</span>}
                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn bg-[#B6D63C] mt-4">Register</button>
                        <p>Already have an account? <span className='font-bold text-[#B6D63C] btn btn-link '><Link to={'/login'}>Login</Link></span></p>
                    </fieldset>
                </form>
                <Social></Social>

            </div>
        </div>
    );
};

export default Register;