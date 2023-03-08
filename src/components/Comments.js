import React, { useState, useEffect } from 'react';

import { getComments } from '../methods/index.js';

import { CaretDoubleDown } from 'phosphor-react';

export const Comments = ({ comment }) => {

    const [comments, setComments] = useState([]);
    const [totalComments, setTotalComments] = useState(3);

    useEffect(() =>{
        if(comment === ''){
            showComments()
        }
        console.log(comments)
    }, [comment])
    
    async function showComments(){
        setComments(await getComments());
    }

    return (
        <div className='flex flex-col gap-4 items-center w-[40vw] bg-gray0 mt-12'>
            {comments.length > 0 ?
                <>
                    {comments.filter((c, i) => i < totalComments).map((c, i) => 
                        <div className='flex w-full p-2' key={i}>
                            <img className='rounded-full w-[50px] h-[50px]' src={c.userImg ? c.userImg : ''} alt={`profile picture of ${c.userName}`} />
                            <div className='flex flex-col ml-4 gap-4'>
                                <div className='flex gap-2 items-center text-sm'>
                                    <p className='text-blue bg-brown p-2 rounded'>{c.userName}</p>
                                    <p className='text-violet'>{c.date}</p>
                                </div>
                                <p className='w-max p-2 border-b-1 border-gray text-blue text-sm'>{c.comment}</p>
                            </div>
                        </div>
                    )}
                    {/* BUTTON FOR SHOW MORE COMMENTS */}
                    {(comments.length > 2 && totalComments === 3) && 
                    <button className='flex flex-col items-center bg-gray0 border-1 border-gray p-2 rounded-full hover:bg-violet-light duration-200' onClick={() => setTotalComments(10)}>
                        {/* <span>Show more comments</span> */}
                        <CaretDoubleDown className='' size={25} />
                    </button>}
                </>
            :
                <p>No comments yet...</p>
            }
        </div>
    )
}
