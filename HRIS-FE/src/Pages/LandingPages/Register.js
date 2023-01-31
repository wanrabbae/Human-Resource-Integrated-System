import { Check } from '@mui/icons-material'
import React, { useState } from 'react'
import logo from './../../Resourse/img/logo-humanusia.png'

const Register = () => {

    const [currentPage, setCurrentPage] = useState(0)

    return (
        <div className='grid grid-cols-12 w-full min-h-screen bg-[#ECEEF6]'>
            <div className='col-span-3 bg-white rounded-r-xl shadow-sm sticky top-0'>
                <div className='flex flex-col items-center justify-between h-full w-full py-[71px]'>
                    <div>
                        <img src={logo}/>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='flex items-center gap-2'>
                            <div className={`bg-[#669BBC] bg-opacity-10 w-[50px] h-[50px] rounded-full flex items-center justify-center`}>
                                <div className={`${currentPage >= 0 ? 'bg-[#F1C1C5] w-[50px] h-[50px]' : 'w-0 h-0'} rounded-full flex items-center justify-center transition-[height] transition- ease-in-out duration-500`}>
                                    <span className={`text-[18px] ${ currentPage === 0 ? 'text-[#C1121F]' : 'text-black'}`}>
                                        { currentPage === 0 ? 1 : currentPage >= 1 ? <Check className='text-[#C1121F]'/> : 1 }
                                    </span>
                                </div>
                                {/* { currentPage >= 0 ? null : 1 } */}
                            </div>
                            <div>
                                <h1 className='text-black'>Account Type</h1>
                                <h1 className='text-[#B5B5C3] text-[12px] font-[500]'>Choose your account type</h1>
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <div className={`bg-[#669BBC] bg-opacity-10 w-[50px] h-[50px] rounded-full flex items-center justify-center`}>
                                <div className={`${currentPage >= 1 ? 'bg-[#F1C1C5] w-[50px] h-[50px]' : 'w-0 h-0'} rounded-full flex items-center justify-center transition-[height] transition- ease-in-out duration-500`}>
                                    <span className={`text-[18px] ${ currentPage === 1 ? 'text-[#C1121F]' : 'text-black'}`}>
                                        { currentPage === 1 ? 2 : currentPage >= 2 ? <Check className='text-[#C1121F]'/> : 2 }
                                    </span>
                                </div>
                                {/* { currentPage >= 0 ? null : 1 } */}
                            </div>
                            <div>
                                <h1 className='text-black'>Account Info</h1>
                                <h1 className='text-[#B5B5C3] text-[12px] font-[500]'>Setup your account</h1>
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <div className={`bg-[#669BBC] bg-opacity-10 w-[50px] h-[50px] rounded-full flex items-center justify-center`}>
                                <div className={`${currentPage >= 2 ? 'bg-[#F1C1C5] w-[50px] h-[50px]' : 'w-0 h-0'} rounded-full flex items-center justify-center transition-[height] transition- ease-in-out duration-500`}>
                                    <span className={`text-[18px] ${ currentPage === 2 ? 'text-[#C1121F]' : 'text-black'}`}>
                                        { currentPage === 2 ? 3 : currentPage >= 3 ? <Check className='text-[#C1121F]'/> : 3 }
                                    </span>
                                </div>
                                {/* { currentPage >= 0 ? null : 1 } */}
                            </div>
                            <div>
                                <h1 className='text-black'>Company Info</h1>
                                <h1 className='text-[#B5B5C3] text-[12px] font-[500]'>Complete your company info</h1>
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <div className={`bg-[#669BBC] bg-opacity-10 w-[50px] h-[50px] rounded-full flex items-center justify-center`}>
                                <div className={`${currentPage >= 3 ? 'bg-[#F1C1C5] w-[50px] h-[50px]' : 'w-0 h-0'} rounded-full flex items-center justify-center transition-[height] transition- ease-in-out duration-500`}>
                                    <span className={`text-[18px] ${ currentPage === 3 ? 'text-[#C1121F]' : 'text-black'}`}>
                                        { currentPage === 3 ? 4 : currentPage >= 4 ? <Check className='text-[#C1121F]'/> : 4 }
                                    </span>
                                </div>
                                {/* { currentPage >= 0 ? null : 1 } */}
                            </div>
                            <div>
                                <h1 className='text-black'>Make Payment</h1>
                                <h1 className='text-[#B5B5C3] text-[12px] font-[500]'>Pay to finish your account</h1>
                            </div>
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
            <div className='col-span-9 py-[50px] px-[82px] '>
                <div className='bg-white rounded-xl w-full h-[630px] py-[76px] px-[102px] mb-4 overflow-scroll scrollbar-hide'>
                    { currentPage === 0 ?
                        <div className='flex flex-col gap-5'>
                            <div className='flex flex-col gap-2'>
                                <h1 className='text-[28px] text-black'>Create Your Account Type</h1>
                                <h1 className='text-sm text-[#A7A8BB] font-[500]'>If you need more info, please check out <span className='text-[#219EBC]'>help page</span></h1>
                            </div>
                            <div className='flex flex-wrap items-center justify-center gap-4'>
                                <div>
                                    <input type='radio' id='option_one' name='option' value='option_one' className='hidden peer'/>
                                    <label for='option_one' className='flex flex-col px-7 py-4 w-[335px] text-gray-500 rounded-xl border-dashed border-1 border-[#CACACA] cursor-pointer peer-checked:bg-[#669BBC59] peer-checked:bg-opacity-30 hover:text-gray-600 hover:bg-gray-100'>                           
                                        <h1 className='text-[18px] text-black font-semibold mb-2'>Starter</h1>
                                        <h1 className='text-[12px] text-[#A8A8A8] mb-6'>Subscription for 6 month</h1>
                                        <h1 className='text-[18px] text-black font-semibold mb-6'>Rp.500.<span className='text-xs'>000</span> /Month</h1>
                                    </label>
                                </div>
                                <div>
                                    <input type='radio' id='option-two' name='option' value='option-two' className='hidden peer'/>
                                    <label for='option-two' className='flex flex-col px-7 py-4 w-[335px] text-gray-500 rounded-xl border-dashed border-1 border-[#CACACA] cursor-pointer peer-checked:bg-[#669BBC59] peer-checked:bg-opacity-30 hover:text-gray-600 hover:bg-gray-100'>                           
                                        <h1 className='text-[18px] text-black font-semibold mb-2'>Starter</h1>
                                        <h1 className='text-[12px] text-[#A8A8A8] mb-6'>Subscription for 6 month</h1>
                                        <h1 className='text-[18px] text-black font-semibold mb-6'>Rp.500.<span className='text-xs'>000</span> /Month</h1>
                                    </label>
                                </div>
                                <div>
                                    <input type='radio' id='option-third' name='option' value='option-third' className='hidden peer'/>
                                    <label for='option-third' className='flex flex-col px-7 py-4 w-[335px] text-gray-500 rounded-xl border-dashed border-1 border-[#CACACA] cursor-pointer peer-checked:bg-[#669BBC59] peer-checked:bg-opacity-30 hover:text-gray-600 hover:bg-gray-100'>                           
                                        <h1 className='text-[18px] text-black font-semibold mb-2'>Starter</h1>
                                        <h1 className='text-[12px] text-[#A8A8A8] mb-6'>Subscription for 6 month</h1>
                                        <h1 className='text-[18px] text-black font-semibold mb-6'>Rp.500.<span className='text-xs'>000</span> /Month</h1>
                                    </label>
                                </div>
                                <div>
                                    <input type='radio' id='option-four' name='option' value='option-four' className='hidden peer'/>
                                    <label for='option-four' className='flex flex-col px-7 py-4 w-[335px] text-gray-500 rounded-xl border-dashed border-1 border-[#CACACA] cursor-pointer peer-checked:bg-[#669BBC59] peer-checked:bg-opacity-30 hover:text-gray-600 hover:bg-gray-100'>                           
                                        <h1 className='text-[18px] text-black font-semibold mb-2'>Starter</h1>
                                        <h1 className='text-[12px] text-[#A8A8A8] mb-6'>Subscription for 6 month</h1>
                                        <h1 className='text-[18px] text-black font-semibold mb-6'>Rp.500.<span className='text-xs'>000</span> /Month</h1>
                                    </label>
                                </div>
                            </div>
                        </div>
                    : currentPage === 1 ?
                        <div className='flex flex-col gap-5'>
                            <div className='flex flex-col gap-2'>
                                <h1 className='text-[28px] text-black'>Setup Your Account</h1>
                                <h1 className='text-sm text-[#A7A8BB] font-[500]'>If you need more info, please check out <span className='text-[#219EBC]'>help page</span></h1>
                            </div>
                            <div className='flex flex-col gap-5'>
                                <div className='flex flex-col gap-2'>
                                    <label></label>
                                    <input/>
                                </div>
                            </div>
                        </div>
                    : currentPage === 2 ?
                        <div className='flex flex-col gap-5'>
                            <div className='flex flex-col gap-2'>
                                <h1 className='text-[28px] text-black'>Complate Your Company Info</h1>
                                <h1 className='text-sm text-[#A7A8BB] font-[500]'>If you need more info, please check out <span className='text-[#219EBC]'>help page</span></h1>
                            </div>
                            
                        </div>
                    : currentPage === 3 ?
                        <div className='flex flex-col gap-5'>
                            <div className='flex flex-col gap-2'>
                                <h1 className='text-[28px] text-black'>Your Account Almost Done!</h1>
                                <h1 className='text-sm text-[#A7A8BB] font-[500]'>Please finish payment to activate account </h1>
                            </div>
                            
                        </div>
                    : null
                    }
                </div>
                <div className='flex items-center justify-end gap-2'>
                    <button className={`w-[104px] bg-[#ECECEC] text-[#003049] rounded-md text-center py-2 ${currentPage === 0 ? 'hidden' : 'block'}`} onClick={ () => setCurrentPage(currentPage - 1) }>Back</button>
                    <button className='w-[104px] bg-[#0E5073] text-white rounded-md text-center py-2' onClick={ () => setCurrentPage(currentPage + 1) }>Continue</button>
                </div>
            </div>
        </div>
    )
}

export default Register