import { Eye, EyeClosed, EyeSlash } from 'phosphor-react'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { SwalSuccess } from '../../../../Components/Modals'
import { getCityProvince, getCountries, getProvince } from '../../../../Repository/AdminRepository'
import { AddSubsidiary } from '../../../../Repository/SubsidiaryRepository'

const SubsidiaryAdd = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [confirmShowPassword, setConfirmShowPassword] = useState(false)
    const [password, setPassword] = useState('password')
    const [confirmPassword, setConfirmPassword] = useState('password')
    const [province, setProvince] = useState([]);
    const [cprovince, setCityProvince] = useState([]);
    const [countries, SetCountries] = useState([]);
    const [idProvince, setIdProvince] = useState(0);
    const [datacity, setDataCity] = useState({});
    const navigate = useNavigate();
    const [controller, setController] = useState({});

    const inAwait = async () => {
        var prov = await getProvince();
        setProvince(prov["provinsi"]);
        var con = await getCountries();
        SetCountries(con);

        setController({
            logo: "",
            fullname: "",
            register_number: "",
            tax_id: "",
            fax: "",
            phone: "",
            address_1: "",
            address_2: "",
            city: "",
            province: "",
            postal_code: "",
            country: "",
            notes: "",
            username: "",
            email: "",
            password: "",
            password_confirm: "",
            status: "",
        });
    };

    useEffect(() => {
        inAwait();
    }, []);

    const handlePassword = () => {
        setShowPassword(!showPassword)
        if(password === 'password') {
            setPassword('text')
        } else {
            setPassword('password')
        }
    }

    const handleConfirmPassword = () => {
        setConfirmShowPassword(!confirmShowPassword)
        if(confirmPassword === 'password') {
            setConfirmPassword('text')
        } else {
            setConfirmPassword('password')
        }
    }

    return (
        <div className='bg-white rounded-xl'>
            <div className='px-6 py-9 '>
                <form 
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const getProvinceId = await getProvince(idProvince);
                        var formData = new FormData();
                        formData.append("logo", controller.logo)
                        formData.append("fullname", controller.fullname)
                        formData.append("register_number", controller.register_number)
                        formData.append("tax_id", controller.tax_id)
                        formData.append("phone", controller.phone)
                        formData.append("fax", controller.fax)
                        formData.append("address_1", controller.address_1)
                        formData.append("address_2", controller.address_2)
                        formData.append("city", controller.city)
                        formData.append("province", getProvinceId?.nama)
                        formData.append("country", controller.country)
                        formData.append("postal_code", controller.postal_code)
                        formData.append("notes", controller.notes)
                        formData.append("username", controller.username)
                        formData.append("email", controller.email)
                        formData.append("status", controller.status)
                        formData.append("password", controller.password)
                        formData.append("password_confirm", controller.password_confirm)
                        var res = await AddSubsidiary(formData);
                        console.log(res);
                        SwalSuccess({ message: "Success add Subsidiary" });
                        navigate("/admin/subsidiary");
                        inAwait();
                    }}
                >
                    <h1 className='text-[#454545] font-semibold mb-6 text-[20px]'>Add Subsidairy</h1>
                    <div className='flex flex-col gap-3 border-b-2 border-[#737373]'>
                        <h1 className='text-[#454545] font-semibold mb-[20px] text-[15px]'>Subsidairy Data</h1>
                        <div className='flex gap-5 mb-[20px]'>
                            <h1 className='text-[11px] text-[#737373] font-[500]'>Subsidairy Logo</h1>
                            <label className="cursor-pointer" for="Clogo">
                                <input id="Clogo" type="file" className='hidden' 
                                    onChange={(val) => {
                                        setController({
                                          ...controller,
                                          logo: val.currentTarget.files[0],
                                        });
                                    }}
                                />
                                <img for="Clogo" src={'https://cdn.discordapp.com/attachments/990841636386897971/1056795799570366464/Group_1000005990.png'} alt="Company Logo" style={{ maxWidth: "150px" }} />
                            </label>
                        </div>
                        <div className='flex flex-col gap-2 mb-[20px]'>
                            <h1 className='text-[11px] text-[#737373] font-[500]'>Subsidairy Name <span className='text-[#780000]'>*</span></h1>
                            <input
                                onChange={(val) => {
                                    setController({
                                      ...controller,
                                      fullname: val.target.value,
                                    });
                                }} 
                                id='name'
                                className='border border-[#CACACA] rounded-md pl-4 py-[10px] text-xs focus:ring-[#780000] outline-[#780000] focus:border-[#780000]' placeholder='Subsidiary Name...' />
                        </div>
                        <div className='flex flex-col gap-2 mb-[20px]'>
                            <h1 className='text-[11px] text-[#737373] font-[500]'>Registration Number <span className='text-[#780000]'>*</span></h1>
                            <input 
                                onChange={(val) => {
                                    setController({
                                      ...controller,
                                      register_number: val.target.value,
                                    });
                                }}
                                id='regisNum' 
                                className='border border-[#CACACA] rounded-md pl-4 py-[10px] text-xs focus:ring-[#780000] outline-[#780000] focus:border-[#780000]' placeholder='Registration Number...' />
                        </div>
                        <div className='flex items-center gap-9'>
                            <div className='flex flex-col gap-2 mb-[20px] w-full'>
                                <h1 className='text-[11px] text-[#737373] font-[500]'>Tax ID <span className='text-[#780000]'>*</span></h1>
                                <input 
                                    onChange={(val) => {
                                        setController({
                                          ...controller,
                                          tax_id: val.target.value,
                                        });
                                    }}
                                    id='tax' 
                                    className='border border-[#CACACA] rounded-md pl-4 py-[10px] text-xs focus:ring-[#780000] outline-[#780000] focus:border-[#780000]' placeholder='123-345-5678' />
                            </div>
                            <div className='flex flex-col gap-2 mb-[20px] w-full'>
                                <h1 className='text-[11px] text-[#737373] font-[500]'>Phone Number <span className='text-[#780000]'>*</span></h1>
                                <input
                                    onChange={(val) => {
                                        setController({
                                        ...controller,
                                        phone: val.target.value,
                                        });
                                    }}
                                    id='phone' 
                                    className='border border-[#CACACA] rounded-md pl-4 py-[10px] text-xs focus:ring-[#780000] outline-[#780000] focus:border-[#780000]' placeholder='0281-xxx-xxx' />
                            </div>
                        </div>
                        <div className='flex items-center gap-9'>
                            <div className='flex flex-col gap-2 mb-[20px] w-full'>
                                <h1 className='text-[11px] text-[#737373] font-[500]'>Fax <span className='text-[#780000]'>*</span></h1>
                                <input
                                    onChange={(val) => {
                                        setController({
                                        ...controller,
                                        fax: val.target.value,
                                        });
                                    }} 
                                    id='fax' 
                                    className='border border-[#CACACA] rounded-md pl-4 py-[10px] text-xs focus:ring-[#780000] outline-[#780000] focus:border-[#780000]' placeholder='123-345-5678' />
                            </div>
                            <div className='d-transparent flex flex-col gap-2 mb-[20px] bg-white w-full'>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 mb-[20px]'>
                            <h1 className='text-[11px] text-[#737373] font-[500]'>Address 1 <span className='text-[#780000]'>*</span></h1>
                            <textarea 
                                onChange={(val) => {
                                    setController({
                                    ...controller,
                                    address_1: val.target.value,
                                    });
                                }} 
                                id='address1' 
                                className='border border-[#CACACA] rounded-md pl-4 py-[10px] text-xs focus:ring-[#780000] outline-[#780000] focus:border-[#780000]' rows={5} placeholder='Your Address...' />
                        </div>
                        <div className='flex flex-col gap-2 mb-[20px]'>
                            <h1 className='text-[11px] text-[#737373] font-[500]'>Address 2</h1>
                            <textarea
                                onChange={(val) => {
                                    setController({
                                    ...controller,
                                    address_2: val.target.value,
                                    });
                                }} 
                                id='address2' 
                                className='border border-[#CACACA] rounded-md pl-4 py-[10px] text-xs focus:ring-[#780000] outline-[#780000] focus:border-[#780000]' rows={5} placeholder='Your Address...' />
                        </div>
                        <div className='flex items-center gap-9'>
                            <div className='flex flex-col gap-2 mb-[20px] w-full'>
                                <h1 className='text-[11px] text-[#737373] font-[500]'>Province <span className='text-[#780000]'>*</span></h1>
                                <select
                                    required
                                    onChange={async (e) => {
                                        var Cprov = await getCityProvince(e.target.value);
                                        setIdProvince(e.target.value);
                                        setCityProvince(Cprov["kota_kabupaten"]);
                                        // setController({
                                        //     ...controller,
                                        //     province: getProvinceId?.nama,
                                        // });
                                    }} 
                                    className='border border-[#CACACA] rounded-md pl-4 py-[10px] text-xs focus:ring-[#780000] outline-[#780000] focus:border-[#780000]'>
                                    <option value="" disabled selected>Select Province</option>
                                    {province.map((val) => {
                                        return <option value={val.id}>{val.nama}</option>;
                                    })}
                                </select>
                            </div>
                            <div className='flex flex-col gap-2 mb-[20px] w-full'>
                                <h1 className='text-[11px] text-[#737373] font-[500]'>City <span className='text-[#780000]'>*</span></h1>
                                <select 
                                required
                                    onChange={(e) => {
                                        setController({
                                            ...controller,
                                            city: e.target.value,
                                        });
                                    }}
                                    className='border border-[#CACACA] rounded-md pl-4 py-[10px] text-xs focus:ring-[#780000] outline-[#780000] focus:border-[#780000]'>
                                    <option value="" disabled selected>Select City</option>
                                    {cprovince.map((val) => {
                                        return <option value={val.nama}>{val.nama}</option>;
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className='flex items-center gap-9'>
                            <div className='flex flex-col gap-2 mb-[20px] w-full'>
                                <h1 className='text-[11px] text-[#737373] font-[500]'>Country <span className='text-[#780000]'>*</span></h1>
                                <select
                                    onChange={(val) => {
                                        setController({
                                        ...controller,
                                        country: val.target.value,
                                        });
                                    }}  
                                    required id='country' className='border border-[#CACACA] rounded-md pl-4 py-[10px] text-xs focus:ring-[#780000] outline-[#780000] focus:border-[#780000]'>
                                    <option value="" disabled selected>Select Country</option>
                                    {countries.map((val) => (
                                        <option className="py-3" value={val.name}>
                                            {val.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='flex flex-col gap-2 mb-[20px] w-full'>
                                <h1 className='text-[11px] text-[#737373] font-[500]'>Postal Code <span className='text-[#780000]'>*</span></h1>
                                <input
                                    onChange={(val) => {
                                        setController({
                                        ...controller,
                                        postal_code: val.target.value,
                                        });
                                    }}  
                                    id='postalcode' className='border border-[#CACACA] rounded-md pl-4 py-[10px] text-xs focus:ring-[#780000] outline-[#780000] focus:border-[#780000]' placeholder='Postal Code...' />
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 mb-[20px]'>
                            <h1 className='text-[11px] text-[#737373] font-[500]'>Note</h1>
                            <textarea
                                onChange={(val) => {
                                    setController({
                                    ...controller,
                                    notes: val.target.value,
                                    });
                                }}   
                                id='note' className='border border-[#CACACA] rounded-md pl-4 py-[10px] text-xs focus:ring-[#780000] outline-[#780000] focus:border-[#780000]' rows={5} placeholder='Notes...' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <h1 className='text-[#454545] font-semibold mb-6 text-[15px] py-6'>User Login Data</h1>
                        <div className='flex items-center gap-9'>
                            <div className='flex flex-col gap-2 mb-[20px] w-full'>
                                <h1 className='text-[11px] text-[#737373] font-[500]'>Username <span className='text-[#780000]'>*</span></h1>
                                <input
                                    onChange={(val) => {
                                        setController({
                                        ...controller,
                                        username: val.target.value,
                                        });
                                    }}    
                                    id='username' className='border border-[#CACACA] rounded-md pl-4 py-[10px] text-xs focus:ring-[#780000] outline-[#780000] focus:border-[#780000]' placeholder='Username...' />
                            </div>
                            <div className='flex flex-col gap-2 mb-[20px] w-full'>
                                <h1 className='text-[11px] text-[#737373] font-[500]'>Status <span className='text-[#780000]'>*</span></h1>
                                <select
                                    onChange={(val) => {
                                        setController({
                                        ...controller,
                                        status: val.target.value,
                                        });
                                    }}  
                                    id='status' className='border border-[#CACACA] rounded-md pl-4 py-[10px] text-xs focus:ring-[#780000] outline-[#780000] focus:border-[#780000]'>
                                    <option value="" disabled selected>Select Status</option>
                                    <option value="Enable">Enable</option>
                                    <option value="Disable">Disable</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 mb-[20px] w-full'>
                            <h1 className='text-[11px] text-[#737373] font-[500]'>Email <span className='text-[#780000]'>*</span></h1>
                            <input
                                onChange={(val) => {
                                    setController({
                                    ...controller,
                                    email: val.target.value,
                                    });
                                }}    
                                id='email' className='border border-[#CACACA] rounded-md pl-4 py-[10px] text-xs focus:ring-[#780000] outline-[#780000] focus:border-[#780000]' placeholder='email@example.com' />
                        </div>
                        <div className='flex items-center gap-9'>
                            <div className='flex flex-col gap-2 mb-[20px] w-full'>
                                <h1 className='text-[11px] text-[#737373] font-[500]'>Password <span className='text-[#780000]'>*</span></h1>
                                <div className='relative w-full'>
                                    <input
                                        onChange={(val) => {
                                            setController({
                                            ...controller,
                                            password: val.target.value,
                                            });
                                        }}  
                                        id='password' className='w-full border border-[#CACACA] rounded-md pl-4 py-[10px] text-xs focus:ring-[#780000] outline-[#780000] focus:border-[#780000]' type={password} placeholder='Your Password...' />
                                    <button className='right-5 top-2 absolute' onClick={ handlePassword }>
                                        {!showPassword ? 
                                        <EyeSlash className='text-[#A8A8A8] text-xl'/>
                                        :
                                        <Eye className='text-[#A8A8A8] text-xl'/>
                                        }
                                    </button>
                                </div>
                            </div>
                            <div className='flex flex-col gap-2 mb-[20px] w-full'>
                                <div className='relative'>
                                <h1 className='text-[11px] text-[#737373] font-[500]'>Confirm Password <span className='text-[#780000]'>*</span></h1>
                                    <input
                                        onChange={(val) => {
                                            setController({
                                            ...controller,
                                            password_confirm: val.target.value,
                                            });
                                        }}   
                                        id='confirmpass' className='w-full border border-[#CACACA] rounded-md pl-4 py-[10px] text-xs focus:ring-[#780000] outline-[#780000] focus:border-[#780000]' type={confirmPassword} placeholder='Confirm Password...' />
                                    <button className='right-5 top-2 absolute' onClick={ handleConfirmPassword }>
                                        {!confirmShowPassword ? 
                                        <EyeSlash className='text-[#A8A8A8] text-xl'/>
                                        :
                                        <Eye className='text-[#A8A8A8] text-xl'/>
                                    }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center gap-2 justify-end my-3 '>
                        <button type='button' className={`bg-[#E2E2E2] flex items-center gap-2 rounded-md px-4 w-[100px] text-xs justify-center py-2 text-[#003049] font-bold`} onClick={ () => navigate('/admin/subsidiary')}>
                            Cancel
                        </button>
                        <button type='submit' className='bg-[#0E5073] text-white flex items-center gap-2 rounded-md px-4 w-[100px] text-xs justify-center py-2 font-bold' >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SubsidiaryAdd