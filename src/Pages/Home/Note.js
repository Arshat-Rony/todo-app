import { data } from 'autoprefixer';
import React, { useState } from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri'
import { toast } from 'react-toastify';
const Note = ({ note, refetch }) => {
    const { _id, title, description } = note;
    const [show, setShow] = useState(false)
    const handleDelete = (id) => {
        const url = `http://localhost:5000/notes/${id}`
        fetch(url, {
            method: "DELETE",
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast("Your item is Permanently Deleted")
                    refetch()
                }
            })
    }
    return (
        <div class="card w-96 bg-slate-200 shadow-xl">
            <div class="card-body">
                <div className="show_items flex  items-center justify-between rounded-sm">
                    <h3 className={`text-slate-900 font-bold ${show && "line-through"}`}>{title}</h3>
                    <span onClick={() => handleDelete(_id)} className='transition ease-in-out delay-15 hover:text-white duration-500'><RiDeleteBin5Line className='text-red-500 text-xl' title='Delete' /></span>
                </div>
                <p className={`text-slate-900 text-left  ${show && "line-through"}`}>{description}</p>
                <div class="card-actions justify-end mt-12">
                    <button onClick={() => { setShow(true) }} class="btn btn-primary btn-sm bg-slate-500 transition ease-in-out delay-15 hover:text-white hover:bg-blue-500 border-none rounded-md duration-500">Complete</button>
                </div>
            </div>
        </div>
    );
};

export default Note;