import { useState, useEffect} from 'react'

import { useSelector, useDispatch } from 'react-redux'


import { getMassages } from './../../methods/index'
import { changeReservation } from './../../actions/index'

import { Ring } from '@uiball/loaders'
import { scroller } from "react-scroll";


export const SelectMassage = () => {

    const [massages, setMassages] = useState([])

    const reservation = useSelector(state => state.reservation)

    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            setMassages(await getMassages())
        })()
        // WHY THIS?: https://ultimatecourses.com/blog/using-async-await-inside-react-use-effect-hook#:~:text=Why%3F,function%20will%20never%20get%20called.
    }, [])
    
    useEffect(() => {
        let scrollToReserve = JSON.parse(localStorage.getItem('scrollToReserve'))
        if(massages.length > 0 && scrollToReserve) {
            scroller.scrollTo("reservation", {
                duration: 800,
                delay: 0,
                smooth: "easeInOutQuart"
              });
        }
        return(() => {
            if(scrollToReserve) {
                setTimeout(() => {
                    localStorage.setItem('scrollToReserve', false)
                  }, 1000) // Delay setting to false for 1 second so it can scroll before
            }
        })
    }, [massages])

    function handleReservation(value){
        dispatch(changeReservation({...reservation, massage: value}))
    }

  return (
    <>
        {reservation.massage === 'default' &&
            <>
                <p className='w-max mx-auto p-1 border-b-blue border-b-1 text-blue text-xs font-thin'>Select the type of massage</p>
                <div className='flex flex-wrap justify-center gap-4 my-8 w-[60vw] mx-auto'>
                    { massages.length > 0 ?
                        massages.map((m, i) => 
                            <button className='h-full w-[220px] text-center bg-black text-white p-2 rounded hover:shadow-xl duration-200' onClick={(e) => handleReservation(e.target.innerHTML)} key={i}>{m.type}</button>
                        )
                    :
                        <Ring size={35} color="#030303" />
                    }
                </div>
            </>
        }
    </>
  )
}
