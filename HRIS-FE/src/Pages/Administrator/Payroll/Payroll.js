import React from 'react'
import { Link } from 'react-router-dom'
import PayrollComponent from '../../../Resourse/img/payroll/PayrollComponent.png'
import PayrollHistory from '../../../Resourse/img/payroll/PayrollHistory.png'
import PayrollSetting from '../../../Resourse/img/payroll/PayrollSetting.png'
import Upcoming from '../../../Resourse/img/Upcoming.png'

const Payroll = () => {
  return (
    // <div>
    //     <img src={Upcoming}/>
    // </div>
    <div className='bg-white rounded-xl px-6 py-9 '>
        <div className='flex justify-between'>
            <div>
                <h1 className='text-black'>Payroll</h1>
                <h1 className='text-xs text-[#737373]'>Payroll Setting</h1>
            </div>
            <Link to={''} className='px-3 py-1 bg-[#C1121F] rounded-xl flex items-center gap-2'>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.78 0L0 0.41V12.41L0.78 12.83L9.78 6.83V6L0.78 0ZM1 11.48V1.35L8.6 6.42L1 11.48Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4 12.6825L12.78 6.82948V5.99948L4 0.146484V1.34948L11.6 6.41948L4 11.4795V12.6825Z" fill="white"/>
                </svg>
                <Link to={'/payroll/run-payroll'} className='text-white text-sm'>Run Payroll</Link>
            </Link>
        </div>
        <div className='mt-10'>
            <div className='flex justify-center items-center gap-5'>
                <Link to={'/payroll/payroll-setting'} className='relative'>
                    <img className='brightness-75 transition-all duration-500 ease-in-out hover:brightness-50' src={PayrollSetting} />
                    <p className="absolute inset-0 top-32 text-center text-white text-xl font-semibold">Payroll Setting</p>
                </Link>
                <Link to={'/payroll/payroll-component'} className='relative'>
                    <img className='brightness-75 transition-all duration-500 ease-in-out hover:brightness-50' src={PayrollComponent} />
                    <p className="absolute inset-0 top-32 text-center text-white text-xl font-semibold">Payroll Component</p>
                </Link>
                <Link to={'/payroll/payroll-history'} className='relative'>
                    <img className='brightness-75 transition-all duration-500 ease-in-out hover:brightness-50' src={PayrollHistory} />
                    <p className="absolute inset-0 top-32 text-center text-white text-xl font-semibold">Payroll History</p>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Payroll