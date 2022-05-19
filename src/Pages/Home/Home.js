import React, { useState } from 'react';
import img from "../../../src/assests/images/note-taking-removebg-preview.png"
import { HiPlus } from 'react-icons/hi'
import { toast } from 'react-toastify';
import Notes from './Notes';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import auth from '../../firebaseinit';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
const Home = () => {
    const [user] = useAuthState(auth)
    const email = user?.email;
    const url = `https://my-todo-list-app-server.herokuapp.com/notes/${email}`
    const { isLoading, data: notes, refetch } = useQuery('notes', () =>
        fetch(url).then(res =>
            res.json()
        )
    )
    if (isLoading) {
        return <Loading type="spokes" color="red"></Loading>
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const title = e.target.title.value;
        const description = e.target.description.value;
        const note = {
            title,
            description,
            email,
        }
        const url = `https://my-todo-list-app-server.herokuapp.com/notes`
        fetch(url, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(note)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    toast.success("Your have successfully added Your Task")
                    e.target.reset()
                    refetch()
                }

            })
    }
    return (
        <div className='text-right'>
            <button onClick={() => signOut(auth)} className="btn btn-primary relative top-4 right-6 bg-red-500 border-none rounded-md">Sign Out</button>
            <div className='flex items-center justify-center flex-col min-h-screen'>

                <figure>
                    <img width="180px" height="180px" src={img} alt="" />
                    <figcaption className='text-center'>Add Your Task Here ✌</figcaption>
                </figure>

                <div className={`add_item-container transition ease-in-out delay-15 duration-500 `}>
                    <div className='flex items-center justify-center'>
                        <form className='flex items-center justify-center flex-col' onSubmit={handleSubmit}>
                            <input name="title" type="text" placeholder="✍ Add Title..." className="input text-slate-900  bg-white rounded-sm  w-[400px] max-w-lg focus:outline-none mt-12  " />
                            <textarea name='description' className="textarea mt-4 bg-white border-none textarea-accent text-slate-900 rounded-sm w-[400px] focus:outline-none" placeholder="Task Description "></textarea>
                            <button type='submit'><HiPlus title='Add Items' className="relative top-1 right-6 text-slate-800" /></button>
                            <button className="btn mt-2 transition ease-in-out delay-15 bg-white rounded-none text-slate-900 hover:bg-blue-600 hover:text-white duration-500">Add Task</button>
                        </form>
                    </div>

                    <div>
                        <Notes
                            notes={notes}
                            refetch={refetch}
                        ></Notes>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;