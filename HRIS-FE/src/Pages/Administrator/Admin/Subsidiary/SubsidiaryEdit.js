import { Eye, EyeClosed, EyeSlash } from 'phosphor-react'
import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { SwalSuccess } from '../../../../Components/Modals'
import { getCityProvince, getCountries, getProvince } from '../../../../Repository/AdminRepository'
import { AddSubsidiary } from '../../../../Repository/SubsidiaryRepository'


const SubsidiaryEdit = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [confirmShowPassword, setConfirmShowPassword] = useState(false)
    const [password, setPassword] = useState('password')
    const [changePassword, setCPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('password')
    const [province, setProvince] = useState([]);
    const [cprovince, setCityProvince] = useState([]);
    const [editsub, setEditSub] = useState([]);
    const [countries, SetCountries] = useState([]);
    const [idProvince, setIdProvince] = useState({});
    const [datacity, setDataCity] = useState({});
    const navigate = useNavigate();
    const [controller, setController] = useState({});
    const location = useLocation();
    const editVal = location.state;

    const [evlogo, setEVlogo] = useState([]);
    const [evfullname, setEVfullname] = useState([]);
    const [evregisnum, setEVregisnum] = useState([]);
    const [evtaxid, setEVtaxid] = useState([]);
    const [evfax, setEVfax] = useState([]);
    const [evphone, setEVphone] = useState([]);
    const [evaddres1, setEVaddres1] = useState([]);
    const [evaddres2, setEVaddres2] = useState([]);
    const [evcity, setEVcity] = useState([]);
    const [evprov, setEVprovince] = useState([]);
    const [evpostalcode, setEVpostalcode] = useState([]);
    const [evcountry, setEVcountry] = useState([]);
    const [evnotes, setEVnotes] = useState([]);
    const [evusername, setEVusername] = useState([]);
    const [evemail, setEVemail] = useState([]);
    const [evpassword, setEVpassword] = useState([]);
    const [evconfirmpass, setEVconfirmpass] = useState([]);
    const [evstatus, setEVstatus] = useState([]);

    const inAwait = async () => {
        var prov = await getProvince();
        setProvince(prov["provinsi"]);
        var con = await getCountries();
        SetCountries(con);
        setEditSub(editVal);
        setEVlogo(editVal.logo);
        setEVfullname(editVal.fullname);
        setEVregisnum(editVal.register_number);
        setEVtaxid(editVal.tax_id);
        setEVfax(editVal.fax);
        setEVphone(editVal.phone);
        setEVaddres1(editVal.address_1);
        setEVaddres2(editVal.address_2);
        setEVcity(editVal.city);
        setEVprovince(editVal.province);
        setEVpostalcode(editVal.postal_code);
        setEVcountry(editVal.country);
        setEVnotes(editVal.notes);
        setEVusername(editVal.username);
        setEVemail(editVal.email);
        setEVstatus(editVal.status);

        // const idprov = () => {
        //     prov.map((val) => {
        //         if (evprov == val.name) {
        //             setIdProvince(val.id)
        //         }
        //     })
        // }

        // idprov();

        var idProvin;
        for (var i =0;i < prov['provinsi'].length;i++) {
            var data = prov['provinsi'][i];
            if (editVal.province == data['nama']) {
                idProvin = data['id'];
            }
        }
        var Cprov = await getCityProvince(idProvin);
        setCityProvince(Cprov["kota_kabupaten"]);
        // setController({
        //     logo: "",
        //     fullname: "",
        //     register_number: "",
        //     tax_id: "",
        //     fax: "",
        //     phone: "",
        //     address_1: "",
        //     address_2: "",
        //     city: "",
        //     province: "",
        //     postal_code: "",
        //     country: "",
        //     notes: "",
        //     username: "",
        //     email: "",
        //     password: "",
        //     password_confirm: "",
        //     status: "",
        // });
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
                        const getProvinceId = await getProvince(evprov.id);
                        var formData = new FormData();
                        formData.append("logo", evlogo)
                        formData.append("fullname", evfullname)
                        formData.append("register_number", evregisnum)
                        formData.append("tax_id", evtaxid)
                        formData.append("phone", evphone)
                        formData.append("fax", evfax)
                        formData.append("address_1", evaddres1)
                        formData.append("address_2", evaddres2)
                        formData.append("city", evcity)
                        formData.append("province", getProvinceId?.nama)
                        formData.append("country", evcountry)
                        formData.append("postal_code", evpostalcode)
                        formData.append("notes", evnotes)
                        formData.append("username", evusername)
                        formData.append("email", evemail)
                        formData.append("status", evstatus)
                        if (changePassword) {
                            formData.append("password", evpassword)
                            formData.append("password_confirm", evconfirmpass)
                        }
                        var res = await AddSubsidiary(formData);
                        console.log(res);
                        SwalSuccess({ message: "Success Edit Subsidiary" });
                        navigate("/admin/subsidiary");
                        inAwait();
                    }}
                >
                    <h1 className='text-[#454545] font-semibold mb-6 text-[20px]'>Edit Subsidairy</h1>
                    <div className='flex flex-col gap-3 border-b-2 border-[#737373]'>
                        <h1 className='text-[#454545] font-semibold mb-[20px] text-[15px]'>Subsidairy Data</h1>
                        <div className='flex gap-5 mb-[20px]'>
                            <h1 className='text-[11px] text-[#737373] font-[500]'>Subsidairy Logo</h1>
                            <label className="cursor-pointer" for="Clogo">
                                <input id="Clogo" type="file" className='hidden'
                                    // onChange={(val) => {
                                    //     setController({
                                    //     ...controller,
                                    //     logo: val.currentTarget.files[0],
                                    //     });
                                    // }}
                                    onChange={(val) => {
                                        setEVlogo(val.currentTarget.files[0]);
                                    }} 
                                />
                                <img for="Clogo" src={evlogo ?? "https://cdn.discordapp.com/attachments/990841636386897971/1056795799570366464/Group_1000005990.png"} alt="Company Logo" style={{ maxWidth: "150px" }} />
                            </label>
                        </div>
                        <div className='flex flex-col gap-2 mb-[20px]'>
                            <h1 className='text-[11px] text-[#737373] font-[500]'>Subsidairy Name <span className='text-[#780000]'>*</span></h1>
                            <input 
                                className='border border-[#CACACA] rounded-md pl-4 py-[10px] text-xs focus:ring-[#780000] outline-[#780000] focus:border-[#780000]' 
                                placeholder='Subsidiary Name...' 
                                value={evfullname}
                                onChange={(val) => {
                                    setEVfullname(val.target.value);
                                }} 
                                />
                        </div>
                        <div className='flex flex-col gap-2 mb-[20px]'>
                            <h1 className='text-[11px] text-[#737373] font-[500]'>Registration Number <span className='text-[#780000]'>*</span></h1>
                            <input
                                value={evregisnum}
                                onChange={(val) => {
                                    setEVregisnum(val.target.value);
                                }}  
                                className='border border-[#CACACA] rounded-md pl-4 py-[10px] text-xs focus:ring-[#780000] outline-[#780000] focus:border-[#780000]' placeholder='Registration Number...' />
                        </div>
                        <div className='flex items-center gap-9'>
                            <div className='flex flex-col gap-2 mb-[20px] w-full'>
                                <h1 className='text-[11px] text-[#737373] font-[500]'>Tax ID <span className='text-[#780000]'>*</span></h1>
                                <input 
                                    value={evtaxid}
                                    onChange={(val) => {
                                        setEVtaxid(val.target.value);
                                    }} 
                                    className='border border-[#CACACA] rounded-md pl-4 py-[10px] text-xs focus:ring-[#780000] outline-[#780000] focus:border-[#780000]' placeholder='123-345-5678' />
                            </div>
                            <div className='flex flex-col gap-2 mb-[20px] w-full'>
                                <h1 className='text-[11px] text-[#737373] font-[500]'>Phone Number <span className='text-[#780000]'>*</span></h1>
                                <input
                                    value={evphone}
                                    onChange={(val) => {
                                        setEVphone(val.target.value);
                                    }}  
                                    className='border border-[#CACACA] rounded-md pl-4 py-[10px] text-xs focus:ring-[#780000] outline-[#780000] focus:border-[#780000]' placeholder='0281-xxx-xxx' />
                            </div>
                        </div>
                        <div className='flex items-center gap-9'>
                            <div className='flex flex-col gap-2 mb-[20px] w-full'>
                                <h1 className='text-[11px] text-[#737373] font-[500]'>Fax <span className='text-[#780000]'>*</span></h1>
                                <input
                                    value={evfax}
                                    onChange={(val) => {
                                        setEVfax(val.target.value);
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
                                value={evaddres1}
                                onChange={(val) => {
                                    setEVaddres1(val.target.value);
                                }}  
                                className='border border-[#CACACA] rounded-md pl-4 py-[10px] text-xs focus:ring-[#780000] outline-[#780000] focus:border-[#780000]' rows={5} placeholder='Your Address...' />
                        </div>
                        <div className='flex flex-col gap-2 mb-[20px]'>
                            <h1 className='text-[11px] text-[#737373] font-[500]'>Address 2</h1>
                            <textarea
                                value={evaddres2}
                                onChange={(val) => {
                                    setEVaddres2(val.target.value);
                                }}     
                                className='border border-[#CACACA] rounded-md pl-4 py-[10px] text-xs focus:ring-[#780000] outline-[#780000] focus:border-[#780000]' rows={5} placeholder='Your Address...' />
                        </div>
                        <div className='flex items-center gap-9'>
                                <div className='flex flex-col gap-2 mb-[20px] w-full'>
                                    <h1 className='text-[11px] text-[#737373] font-[500]'>Province <span className='text-[#780000]'>*</span></h1>
                                    <select
                                        // value={evprov.nama}
                                        onChange={async (e) => {
                                            var Cprov = await getCityProvince(e.target.value);
                                            setEVprovince(e.target.value);
                                            setCityProvince(Cprov["kota_kabupaten"]);
                                            // setController({
                                                //     ...controller,
                                                //     province: getProvinceId?.nama,
                                                // });
                                            }} 
                                        className='border border-[#CACACA] rounded-md pl-4 py-[10px] text-xs focus:ring-[#780000] outline-[#780000] focus:border-[#780000]'>
                                        <option value="" disabled selected>Select Province</option>
                                        {province.map((val) => {
                                            return <option selected={evprov == val.nama ? true : false } value={val.id}>{val.nama}</option>;
                                        })}
                                    </select>
                                </div>
                                <div className='flex flex-col gap-2 mb-[20px] w-full'>
                                    <h1 className='text-[11px] text-[#737373] font-[500]'>City <span className='text-[#780000]'>*</span></h1>
                                    <select 
                                        value={evcity}
                                        onChange={(val) => {
                                            setEVcity(val.target.value);
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
                                    value={evcountry}
                                    onChange={(val) => {
                                        setEVcountry(val.target.value);
                                    }}
                                    className='border border-[#CACACA] rounded-md pl-4 py-[10px] text-xs focus:ring-[#780000] outline-[#780000] focus:border-[#780000]'>
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
                                    value={evpostalcode}
                                    onChange={(val) => {
                                        setEVpostalcode(val.target.value);
                                    }}
                                    className='border border-[#CACACA] rounded-md pl-4 py-[10px] text-xs focus:ring-[#780000] outline-[#780000] focus:border-[#780000]' placeholder='Postal Code...' />
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 mb-[20px]'>
                            <h1 className='text-[11px] text-[#737373] font-[500]'>Note</h1>
                            <textarea
                                value={evnotes}
                                onChange={(val) => {
                                    setEVnotes(val.target.value);
                                }} 
                                className='border border-[#CACACA] rounded-md pl-4 py-[10px] text-xs focus:ring-[#780000] outline-[#780000] focus:border-[#780000]' rows={5} placeholder='Notes...' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <h1 className='text-[#454545] font-semibold mb-6 text-[15px] py-6'>User Login Data</h1>
                        <div className='flex items-center gap-9'>
                            <div className='flex flex-col gap-2 mb-[20px] w-full'>
                                <h1 className='text-[11px] text-[#737373] font-[500]'>Username <span className='text-[#780000]'>*</span></h1>
                                <input
                                    value={evusername}
                                    onChange={(val) => {
                                        setEVusername(val.target.value);
                                    }} 
                                    className='border border-[#CACACA] rounded-md pl-4 py-[10px] text-xs focus:ring-[#780000] outline-[#780000] focus:border-[#780000]' placeholder='Username...' />
                            </div>
                            <div className='flex flex-col gap-2 mb-[20px] w-full'>
                                <h1 className='text-[11px] text-[#737373] font-[500]'>Status <span className='text-[#780000]'>*</span></h1>
                                <select
                                    value={evstatus}
                                    onChange={(val) => {
                                        setEVstatus(val.target.value);
                                    }} 
                                    className='border border-[#CACACA] rounded-md pl-4 py-[10px] text-xs focus:ring-[#780000] outline-[#780000] focus:border-[#780000]'>
                                    <option disabled selected>Select Status</option>
                                    <option value="Enable">Enable</option>
                                    <option value="Disable">Disable</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 mb-[20px] w-full'>
                            <h1 className='text-[11px] text-[#737373] font-[500]'>Email <span className='text-[#780000]'>*</span></h1>
                            <input
                                value={evemail}
                                onChange={(val) => {
                                    setEVemail(val.target.value);
                                }} 
                                className='border border-[#CACACA] rounded-md pl-4 py-[10px] text-xs focus:ring-[#780000] outline-[#780000] focus:border-[#780000]' placeholder='email@example.com' />
                        </div>
                        <div className='flex flex-col gap-2 mb-[20px] w-full'>
                            <label>
                                <small>Change Password?</small>
                            </label>
                            <div className="form-check">
                                <input
                                onChange={(val) => {
                                    setCPassword(!changePassword);
                                }}
                                type="checkbox"
                                value={changePassword}
                                className="form-check-input"
                                />
                                <label className="form-check-label">Yes</label>
                            </div>
                        </div>
                        {
                            changePassword ? (
                                <>
                                    <div className='flex items-center gap-9'>
                                        <div className='flex flex-col gap-2 mb-[20px] w-full'>
                                            <h1 className='text-[11px] text-[#737373] font-[500]'>Password <span className='text-[#780000]'>*</span></h1>
                                            <div className='relative w-full'>
                                                <input
                                                    onChange={(val) => {
                                                        setEVpassword(val.target.value);
                                                    }}  
                                                    className='w-full border border-[#CACACA] rounded-md pl-4 py-[10px] text-xs focus:ring-[#780000] outline-[#780000] focus:border-[#780000]' type={password} placeholder='Your Password...' />
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
                                            <h1 className='text-[11px] text-[#737373] font-[500]'>Confirm Password <span className='text-[#780000]'>*</span></h1>
                                            <div className='relative'>
                                                <input
                                                    onChange={(val) => {
                                                        setEVconfirmpass(val.target.value);
                                                    }}  
                                                    className='w-full border border-[#CACACA] rounded-md pl-4 py-[10px] text-xs focus:ring-[#780000] outline-[#780000] focus:border-[#780000]' type={confirmPassword} placeholder='Confirm Password...' />
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
                                </>
                            ) : (
                                <></>
                                )
                            }
                    </div>
                    <div className='flex items-center gap-2 justify-end my-3 '>
                        <button type='button' className={`bg-[#E2E2E2] flex items-center gap-2 rounded-md px-4 w-[100px] text-xs justify-center py-2 text-[#003049] font-bold`} onClick={ () => navigate('/admin/subsidiary')}>
                            Cancel
                        </button>
                        <button type='submit' className='bg-[#0E5073] text-white flex items-center gap-2 rounded-md px-4 w-[100px] text-xs justify-center py-2 font-bold' >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SubsidiaryEdit