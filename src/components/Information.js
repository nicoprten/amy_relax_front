import { useState, useEffect} from 'react'

import { getMassages } from './../methods/index'

import { Ring } from '@uiball/loaders'

export const Information = () =>{

    const [massages, setMassages] = useState([])
    const [readMore, setReadMore] = useState([])

    useEffect(() => {
        (async () => {
            const allMassages = await getMassages()
            allMassages.map(m => setReadMore((prevState) => [...prevState, 120]))
            setMassages(allMassages)
        })()
    }, [])

    function handleSeeMore(i, length){
        let seeMore = readMore.slice();
        seeMore[i] = length
        setReadMore(seeMore)
    }

    return (
        <div className='bg-brown rounded-3xl'>
        {massages.length > 0 ?
                <div className='w-[80vw] mx-auto py-10 flex flex-wrap justify-center gap-2'>
                    {massages.map((m, i) => 
                        <div className='relative bg-white0 w-[300px] min-h-[140px] h-max rounded-l-xl border-r-[5px] border-brown-dark my-4' key={i}>
                            {/* <img className='rounded-tl-xl w-full h-[150px] object-cover' src={m.image} alt={m.type} /> */}
                            <div className='absolute top-2 right-[0px] flex flex-col gap-2 text-xs items-end'>
                                {m.prices?.map((p,i) => 
                                    <p className='w-max bg-brown-dark text-white0 rounded-l p-1' key={i}>{p.duration}´ {p.price}€</p>    
                                )}
                            </div>
                            <h3 className='relative w-max rounded bg-gray0 font-bold text-md mx-2 p-2 mt-[-20px]'>{m.type}</h3>
                            <p className='text-sm p-2 pr-0 mr-[60px]'>{m.description.slice(0, readMore[i])}{m.description.length > readMore[i] && <button className='text-xs text-violet-light' onClick={() => handleSeeMore(i, m.description.length)}> ...read more</button>}</p>
                        </div>
                    )}
                </div>
            :
                <div className='flex justify-center p-4'>
                    <Ring size={35} color="#030303" />
                </div>
            }
        </div>
    )
}