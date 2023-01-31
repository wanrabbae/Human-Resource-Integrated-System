import React, { useState } from 'react'
import Bonus from './Component/Bonus'
import EmployeeResign from './Component/EmployeeResign'
import PPH21 from './Component/PPH21'
import THP from './Component/THP'
import THR from './Component/THR'

const PayrollSettingTemplate = () => {

    const [index, setIndex] = useState(0)

    return (
        <div>
            <div className='flex flex-col gap-1 mb-4'>
                <h1 className='text-[#272B30]'>Payroll Setting</h1>
                <h1 className='text-xs text-[#737373]'>Setting Menu for Payroll</h1>
            </div>
            <div className='rounded-xl bg-white grid grid-cols-12'>
                <div className='col-span-3 bg-white shadow-[2px_0_20px_rgba(0,0,0,0.15)] px-[18px] py-[25px] rounded-l-xl sticky top-0'>
                    <div className='flex items-center mb-3'>
                        <button onClick={ () => setIndex(0) } className={`${index === 0 ? 'bg-[#EFF9FF] text-[#219EBC]' : 'bg-transparent text-[#A8A8A8]'} h-[38px] px-[10px] rounded-l-md w-full text-start`}>
                            Take Home Pay
                        </button>
                        {index === 0 && <div className='w-[5px] h-[38px] bg-[#219EBC] rounded-r-md'/> }
                    </div>
                    <div className='flex items-center mb-3'>
                        <button onClick={ () => setIndex(1) } className={`${index === 1 ? 'bg-[#EFF9FF] text-[#219EBC]' : 'bg-transparent text-[#A8A8A8]'} h-[38px] px-[10px] rounded-l-md w-full text-start`}>
                            Bonus
                        </button>
                        {index === 1 && <div className='w-[5px] h-[38px] bg-[#219EBC] rounded-r-md'/> }
                    </div>
                    <div className='flex items-center mb-3'>
                        <button onClick={ () => setIndex(2) } className={`${index === 2 ? 'bg-[#EFF9FF] text-[#219EBC]' : 'bg-transparent text-[#A8A8A8]'} h-[38px] px-[10px] rounded-l-md w-full text-start`}>
                            THR
                        </button>
                        {index === 2 && <div className='w-[5px] h-[38px] bg-[#219EBC] rounded-r-md'/> }
                    </div>
                    <div className='flex items-center mb-3'>
                        <button onClick={ () => setIndex(3) } className={`${index === 3 ? 'bg-[#EFF9FF] text-[#219EBC]' : 'bg-transparent text-[#A8A8A8]'} h-[38px] px-[10px] rounded-l-md w-full text-start`}>
                            Employee Resign 
                        </button>
                        {index === 3 && <div className='w-[5px] h-[38px] bg-[#219EBC] rounded-r-md'/> }
                    </div>
                    <div className='flex items-center mb-3'>
                        <button onClick={ () => setIndex(4) } className={`${index === 4 ? 'bg-[#EFF9FF] text-[#219EBC]' : 'bg-transparent text-[#A8A8A8]'} h-[38px] px-[10px] rounded-l-md w-full text-start`}>
                            PPH 21
                        </button>
                        {index === 4 && <div className='w-[5px] h-[38px] bg-[#219EBC] rounded-r-md'/> }
                    </div>
                </div>
                <div className='col-span-9 px-[24px] py-[25px] h-[700px] overflow-y-auto scrollbar-hide'>
                    { index === 0 ? <THP/> : index === 1 ? <Bonus/> : index === 2 ?<THR/> : index === 3 ?<EmployeeResign/> : <PPH21/>}
                </div>
            </div>
        </div>
    )
}

export default PayrollSettingTemplate