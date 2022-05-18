import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import Note from './Note';

const Notes = ({ notes, refetch }) => {
    return (
        <div className={`grid grid-cols-1 lg:grid-cols-3 mt-12 gap-5 ${notes.length > 0 ? "d-block" : "hidden"}`}>
            {notes.map(note => <Note
                key={note._id}
                note={note}
                refetch={refetch}
            ></Note>)}
        </div>
    );
};

export default Notes;