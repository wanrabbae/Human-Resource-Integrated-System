import { ArrowBack, ArrowForward, ArrowLeft, ArrowLeftSharp, Check, GroupsSharp, RateReviewSharp, Summarize } from '@mui/icons-material'
import { ArrowArcLeft, ArrowLineLeft } from 'phosphor-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RunPayroll = () => {
    const navigation = useNavigate()
    const [index, setIndex] = useState(1)
    const handleNext = () => {
        if(index === 4) {
            navigation('/payroll')
        } else {
            setIndex(index+1)
        }
    }
    const handlePrev = () => {
        setIndex(index-1)
    }

    return (
        <div>
            <div className='py-9 flex flex-col gap-4'>
                <h1 className=''>Run Payroll</h1>
                <div className='px-28'>
                    <div className='flex items-center justify-between relative'>
                        <div className='w-20 h-20 rounded-full bg-[#CACACA] z-50 flex items-center justify-center'>
                            <div className={`${index >= 1 ? 'h-20 w-20' : 'h-0 w-0'} bg-[#780000] rounded-full flex items-center justify-center transition-all ease-in-out duration-500`}>
                                {index > 1 ? 
                                <Check className={`text-white`}/>
                                :
                                <GroupsSharp className={`text-white`}/>
                                }
                            </div>
                        </div>
                        <div className={`absolute w-1/2 bg-[#CACACA] h-1 left-0 overflow-hidden`}>
                            <div className={`absolute bg-[#780000] ${ index > 1 ? 'w-[500px]' : 'w-0'} h-1 left-0 transition-all ease-in-out duration-500`}/>
                        </div>
                        <div className='w-20 h-20 rounded-full bg-[#CACACA] z-50 flex items-center justify-center'>
                            <div className={`${index > 1 ? 'h-20 w-20' : 'h-0 w-0'} bg-[#780000] rounded-full flex items-center justify-center transition-all ease-in-out duration-500`}>
                                {index > 2 ?
                                <Check className={`text-white`}/>
                                :
                                <RateReviewSharp className={`text-white`}/>
                                }
                            </div>
                        </div>
                        <div className={`absolute w-1/2 bg-[#CACACA] h-1 right-0 overflow-hidden`}>
                            <div className={`absolute bg-[#780000] ${ index > 2 ? 'w-[500px]' : 'w-0'} h-1 right-0 transition-all ease-in-out duration-500`}/>
                        </div>
                        <div className='w-20 h-20 rounded-full bg-[#CACACA] z-50 flex items-center justify-center'>
                            <div className={`${index > 2 ? 'h-20 w-20' : 'h-0 w-0'} bg-[#780000] rounded-full flex items-center justify-center transition-all ease-in-out duration-500`}>
                                {index > 3 ?
                                <Check className={`text-white`}/>
                                :
                                <Summarize className={`text-white`}/>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-white rounded-xl px-6 py-9'>
                {index}
            </div>
            <div className='px-6 py-9 flex gap-3 items-center justify-end'>
                <button className={`bg-[#E2E2E2] flex items-center gap-2 rounded-md px-4 w-44 text-xs justify-center py-2 text-[#003049] font-bold ${index === 1 ? 'hidden' : index === 4 ? 'hidden' : 'block'}`} onClick={handlePrev} disabled={ index === 1 ? true : false }>
                    <ArrowBack fontSize='10'/>
                    Back
                </button>
                <button className='bg-[#0E5073] text-white flex items-center gap-2 rounded-md px-4 w-44 text-xs justify-center py-2 font-bold' onClick={handleNext}>
                    { index === 3 ? 
                    <h1>Finish</h1>
                    :
                    index < 3 ?
                    <div className='flex items-center gap-2'>
                        Continue
                        <ArrowForward fontSize='10'/>
                    </div>
                    :
                    <h1>Back To Dashboard</h1>
                    }
                </button>
            </div>
        </div>
    )
}

export default RunPayroll