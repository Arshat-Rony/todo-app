import React from 'react';
import { ImFacebook } from "react-icons/im"
import { BsGoogle } from "react-icons/bs"
import { useForm } from "react-hook-form";
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../Loading';
import auth from '../../../firebaseinit';
const Login = () => {
    let navigate = useNavigate();
    let location = useLocation();
    const from = location.state?.from?.pathname || '/'

    const { register, formState: { errors }, handleSubmit } = useForm();


    const [signInWithEmailAndPassword, emailuser, emailLoading, emailerror,] = useSignInWithEmailAndPassword(auth);

    const [signInWithGoogle, guser, gloading, gerror] = useSignInWithGoogle(auth);

    let signError;

    if (gerror || emailerror) {
        signError = <p className='text-red-500 font-bold'>{emailerror.message || emailerror.message}</p>
    }

    if (guser || emailuser) {
        toast("Welcome to Take Note")
        navigate(from, { replace: true })
    }

    if (gloading || emailLoading) {
        return <Loading type="spokes" color="#EB4B98" ></Loading>
    }

    const onSubmit = data => {
        signInWithEmailAndPassword()
        console.log(data)
    };

    return (
        <div className='min-h-screen flex items-center'>
            <div className='bg-slate-700 shadow-md shadow-pink-300 max-w-sm  mx-auto  rounded-md text-white py-4 font-secondary text-center min-w-[400px]'>
                <h2 className='text-center font-bold text-2xl my-10'>Log in</h2>
                <div className='px-8 mb-8'> <hr className='' /></div>
                <form className='flex items-center justify-center flex-col' onSubmit={handleSubmit(onSubmit)}>
                    <div class="form-control w-full max-w-xs">
                        <label class="label">
                            <span class="label-text">Email</span>
                        </label>
                        <input
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "Email is required"
                                },
                                pattern: {
                                    value: /[A-Za-z]{3}/,
                                    message: 'Your email is not perfect'
                                }
                            })}
                            type="email" placeholder="Email here" class="input input-bordered bg-slate-800 w-full max-w-xs focus:outline-none" />
                        <label class="label">
                            {errors.email?.type === 'required' && <span class="label-text-alt text-red-500">{errors.email?.message}</span>}
                            {errors.email?.type === 'pattern' &&
                                <span class="label-text-alt text-red-500">{errors.email?.message}</span>}

                        </label>
                    </div>
                    <div class="form-control w-full max-w-xs">
                        <label class="label">
                            <span class="label-text">Password</span>
                        </label>
                        <input
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "Password is required"
                                },
                                minLength: {
                                    value: 6,
                                    message: 'Pasword should be 6 character'
                                }
                            })}
                            type="password" placeholder="Password here" class="input input-bordered bg-slate-800 w-full max-w-xs focus:outline-none" />
                        <label class="label">
                            {errors.password?.type === 'required' && <span class="label-text-alt text-red-500">{errors.password?.message}</span>}
                            {errors.password?.type === 'minLength' && <span class="label-text-alt text-red-500">{errors.password?.message}</span>}
                        </label>
                    </div>
                    {signError}
                    <input className='input bg-primary flex transition-all duration-500 items-center bg-gradient-to-r from-accent to-neutral shadow-lg shadow-zinc-700 justify-center gap-4  max-w-xs w-full  ' type="submit" />
                    <p className='mt-3'>New to Bitsy ? <Link className='text-blue-500 font-bold' to="/signup">Register First</Link></p>
                </form>
                <div class="divider py-4 px-8">OR</div>
                <div className='flex items-center justify-center gap-4 mb-6'>
                    <button onClick={() => signInWithGoogle()} type="text" placeholder="Type here" class="input  flex transition-all duration-500 items-center 
                    bg-gradient-to-r from-accent to-neutral justify-center gap-4 shadow-lg shadow-zinc-700  max-w-xs w-full focus:outline-none focus-visible:outline-none hover:bg-blue-300">
                        <BsGoogle />  Google
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Login;