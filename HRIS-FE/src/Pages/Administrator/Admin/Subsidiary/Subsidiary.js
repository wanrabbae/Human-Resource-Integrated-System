import React, { useEffect, useState } from 'react'
import { ArrowDropDown, Close, EditOutlined, ImportExport, KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowRight, KeyboardArrowUp, Search } from '@mui/icons-material'
import { Eye, FileArrowUp, Plus, Trash } from 'phosphor-react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../../../Resourse/img/logo-h.png'
import { DeleteSubsidiary, GetSubsidiary } from '../../../../Repository/SubsidiaryRepository'
import { ModalDelete, SwalSuccess } from '../../../../Components/Modals'
const Subsidiary = () => {
    const navigation = useNavigate()
    const [Active, setActive] = useState(false)
    const [subsi, setSubsi] = useState([])
    const [Current, setCurrent] = useState(0)
    const [isdelete, setDelete] = useState(false);
    const [id, setId] = useState();
    const [editActive, setEditActive] = useState(false)
    
    const inAwait = async () => {
        var data = await GetSubsidiary();
        setSubsi(data.data);
    };
    
    useEffect(() => {
        inAwait();
    }, []);

    const handleCollapse = (id) => {
        if(id){
        setCurrent(id)
        setActive(!Active)
        }
    }

    const onDetail =  (dt) => {
        const params = {
            fullname: dt.fullname,
            unique_id: dt?.user?.unique_id
        }
        navigation('/admin/subsidiary/detail',{
            state: params
        })
    }

    const onEdit = (data) => {
        const params = {
            id: data.id,
            logo: data.logo,
            fullname: data.fullname,
            register_number: data.register_number,
            tax_id: data.tax_id,
            fax: data.fax,
            phone: data.phone,
            address_1: data.address1,
            address_2: data.address2,
            city: data.city,
            province: data.province,
            postal_code: data.postal_code,
            country: data.country,
            notes: data.notes,
            username: data?.user?.username,
            email: data?.user?.email,
            status: data?.user?.status,
        };
        navigation(`/admin/subsidiary/edit`,{
            state: params,
        });
        // navigate("/profile-employee", {
        //   state: params,
        // });
      };

    return (
        <>
        <div>
            <h1 className='text-black font-bold mb-6 text-[20px]'>PT. Powerkerto Wahyu Keprabon</h1>
            <div className='bg-white rounded-xl'>
                <div className='px-6 py-9 '>
                    <div className='flex justify-between items-center'>
                        <div>
                            <h1 className='text-black'>Subsidairy</h1>
                            <h1 className='text-xs text-[#737373]'>List of Subsidairy</h1>
                        </div>
                    </div>
                    <div className='flex justify-between items-center mt-10'>
                        <Link to={''} style={{ borderRadius: "6px", border: "1px solid #A9A9A9", color: "#0E5073", fontSize: "14px", fontWeight: "500", backgroundColor: "#ffff", }} className="me-3 btn d-flex align-items-center">
                            <FileArrowUp className="me-2" color="#0E5073" size={16} weight="bold" />
                                Export
                        </Link>
                        <div className='flex items-center gap-2'>
                            <div className='relative'>
                                <Search className='absolute top-2 left-2 text-[#A8A8A8]'/>
                                <input type="text" id="table-search" className="text-sm rounded-md pl-10 border-[#A8A8A8] text-[#A8A8A8] focus:ring-0" placeholder="Search..." />
                            </div>
                            <Link to={'/admin/subsidiary/add'} style={{ borderRadius: "6px", border: "1px solid #A9A9A9", color: "#ffff", fontSize: "14px", fontWeight: "500", backgroundColor: "#0E5073", }} className="me-3 btn d-flex align-items-center">
                            <Plus className="me-2" color="#ffff" size={16} weight="bold" />
                                Add Subsidairy
                            </Link>
                        </div>
                    </div>
                    <div className='table-responsive'>
                        <div className='mt-10 relative'>
                            <div className='w-full bg-[#EBF7FF] px-4 py-2 flex items-center gap-3 rounded-md  '>
                                <div className='min-w-[250px] max-w-[250px]'>
                                <div className='w-full flex items-center gap-2'>
                                    <h1 className='text-[#737373] text-xs'>Subsidairy Name</h1>
                                    <ImportExport fontSize="2px" className='mt-0.5 text-[#737373]'/></div>
                                </div>
                                <div className='min-w-[160px] max-w-[160px]'>
                                <div className='w-full flex items-center gap-2'>
                                    <h1 className='text-[#737373] text-xs'>Username</h1>
                                    <ImportExport fontSize="2px" className='mt-0.5 text-[#737373]'/></div>
                                </div>
                                <div className='min-w-[160px] max-w-[160px]'>
                                <div className='w-full flex items-center gap-2'>
                                    <h1 className='text-[#737373] text-xs'>Registration Number</h1>
                                    <ImportExport fontSize="2px" className='mt-0.5 text-[#737373]'/></div>
                                </div>
                                <div className='min-w-[160px] max-w-[160px]'>
                                <div className='w-full flex items-center gap-2'>
                                    <h1 className='text-[#737373] text-xs'>Status</h1>
                                    <ImportExport fontSize="2px" className='mt-0.5 text-[#737373]'/></div>
                                </div>
                                <div className='min-w-[100px] max-w-[100px]'>
                                <div className='w-full flex items-center justify-center gap-2'>
                                    <h1 className='text-[#737373] text-xs'>Action</h1>
                                </div>
                                </div>
                                <div className='min-w-[50px] max-w-[50px]'>
                                    <div className='w-full  flex items-center gap-2'></div>
                                </div>
                            </div>
                            {
                                subsi.length > 0 ? (
                                    subsi.map((x) => {
                                        return (
                                        <div>
                                            <div className={`px-4 py-2 mt-2 flex items-center gap-3 border ${ x.id === Current && !Active ? 'rounded-t-md' : 'rounded-md' } w-full`}>
                                                <div className= 'min-w-[250px] max-w-[250px] pr-2 flex items-center gap-2'>
                                                    <img 
                                                        crossorigin="anonymous"
                                                        src={
                                                            // "https://cdn.discordapp.com/attachments/990841636386897971/1056795799570366464/Group_1000005990.png" ??
                                                            x.logo 
                                                        }
                                                        className='w-[34px] h-[34px] rounded-md border-[#EDEDED] border object-cover'/>
                                                    <h1 className='text-xs truncate text-[#737373]'>{x.fullname}</h1>
                                                </div>
                                                <div className= 'min-w-[160px] max-w-[160px]'>
                                                    <h1 className='text-xs truncate text-[#737373]'>{x?.user?.username}</h1>
                                                </div>
                                                <div className= 'min-w-[160px] max-w-[160px]'>
                                                    <h1 className='text-xs truncate text-[#737373]'>{x.register_number}</h1>
                                                </div>
                                                <div className= 'min-w-[160px] max-w-[160px]'>
                                                    <h1 className='text-xs truncate text-[#737373]'>{x?.user?.status}</h1>
                                                </div>
                                                <div className= 'min-w-[100px] max-w-[100px] items-center justify-center flex gap-2'>
                                                    <button className='flex items-center justify-center bg-[#CEDFEA] rounded-md w-8 h-8'  onClick={ () => onDetail(x)}>
                                                        <Eye fontSize="14px" />
                                                    </button>
                                                    <button className='flex items-center justify-center bg-[#CEDFEA] rounded-md w-8 h-8' onClick={ () => onEdit(x)}>
                                                        <EditOutlined fontSize="10px" />
                                                    </button>
                                                    <button className='flex items-center justify-center bg-[#CEDFEA] rounded-md w-8 h-8' 
                                                        onClick={ () => {
                                                            setDelete(true);
                                                            setId(x.id);
                                                        }}
                                                    >
                                                        <Trash fontSize="14px" />
                                                    </button>
                                                </div>
                                                <div className='min-w-[50px] max-w-[50px] flex items-center justify-end'>
                                                    <button onClick={ () => handleCollapse(x.id)}>
                                                    { x.id === Current && !Active ?
                                                        <KeyboardArrowUp/>
                                                        :
                                                        <KeyboardArrowDown/>
                                                    }
                                                    </button>
                                                </div>
                                            </div>
                                            <div className={`w-full rounded-b-md bg-[#F9F9F9] transition-all ease-in-out duration-500 overflow-hidden ${ x.id === Current && !Active ? 'h-52' : 'h-0' }`}>
                                                <div className='grid grid-cols-12 gap-5 px-4 py-4'>
                                                    <div className='flex flex-col gap-3 col-span-2'>
                                                        <h1 className='text-[#A8A8A8] text-[10px] font-[500]'>Tax ID</h1>
                                                        <h1 className='text-[#A8A8A8] text-[10px] font-[500]'>Phone Number</h1>
                                                        <h1 className='text-[#A8A8A8] text-[10px] font-[500]'>Fax</h1>
                                                        <h1 className='text-[#A8A8A8] text-[10px] font-[500]'>Email</h1>
                                                        <h1 className='text-[#A8A8A8] text-[10px] font-[500]'>Address 1</h1>
                                                        <h1 className='text-[#A8A8A8] text-[10px] font-[500]'>Address 2</h1>
                                                    </div>
                                                    <div className='flex flex-col gap-3 col-span-1'>
                                                        <h1 className='text-[#A8A8A8] text-[10px] font-[500]'>:</h1>
                                                        <h1 className='text-[#A8A8A8] text-[10px] font-[500]'>:</h1>
                                                        <h1 className='text-[#A8A8A8] text-[10px] font-[500]'>:</h1>
                                                        <h1 className='text-[#A8A8A8] text-[10px] font-[500]'>:</h1>
                                                        <h1 className='text-[#A8A8A8] text-[10px] font-[500]'>:</h1>
                                                        <h1 className='text-[#A8A8A8] text-[10px] font-[500]'>:</h1>
                                                    </div>
                                                    <div className='flex flex-col gap-3 col-span-3'>
                                                        <h1 className='text-[#A8A8A8] text-[10px] font-[500] line-clamp-1'>{x.tax_id}</h1>
                                                        <h1 className='text-[#A8A8A8] text-[10px] font-[500] line-clamp-1'>{x.phone}</h1>
                                                        <h1 className='text-[#A8A8A8] text-[10px] font-[500] line-clamp-1'>{x.fax}</h1>
                                                        <h1 className='text-[#A8A8A8] text-[10px] font-[500] line-clamp-1'>{x?.user?.email}</h1>
                                                        <h1 className='text-[#A8A8A8] text-[10px] font-[500] line-clamp-1'>{x.address1}</h1>
                                                        <h1 className='text-[#A8A8A8] text-[10px] font-[500] line-clamp-1'>{x.address2}</h1>
                                                    </div>
                                                    <div className='flex flex-col gap-3 col-span-2'>
                                                        <h1 className='text-[#A8A8A8] text-[10px] font-[500]'>City</h1>
                                                        <h1 className='text-[#A8A8A8] text-[10px] font-[500]'>Province</h1>
                                                        <h1 className='text-[#A8A8A8] text-[10px] font-[500]'>Postal Code</h1>
                                                        <h1 className='text-[#A8A8A8] text-[10px] font-[500]'>Country</h1>
                                                        <h1 className='text-[#A8A8A8] text-[10px] font-[500]'>Notes</h1>
                                                    </div>
                                                    <div className='flex flex-col gap-3 col-span-1'>
                                                        <h1 className='text-[#A8A8A8] text-[10px] font-[500]'>:</h1>
                                                        <h1 className='text-[#A8A8A8] text-[10px] font-[500]'>:</h1>
                                                        <h1 className='text-[#A8A8A8] text-[10px] font-[500]'>:</h1>
                                                        <h1 className='text-[#A8A8A8] text-[10px] font-[500]'>:</h1>
                                                        <h1 className='text-[#A8A8A8] text-[10px] font-[500]'>:</h1>
                                                    </div>
                                                
                                                    <div className='flex flex-col gap-3 col-span-3'>
                                                        <h1 className='text-[#A8A8A8] text-[10px] font-[500] line-clamp-1'>{x.city}</h1>
                                                        <h1 className='text-[#A8A8A8] text-[10px] font-[500] line-clamp-1'>{x.province}</h1>
                                                        <h1 className='text-[#A8A8A8] text-[10px] font-[500] line-clamp-1'>{x.postal_code}</h1>
                                                        <h1 className='text-[#A8A8A8] text-[10px] font-[500] line-clamp-1'>{x.country}</h1>
                                                        <h1 className='text-[#A8A8A8] text-[10px] font-[500] line-clamp-4'>{x.notes}</h1>
    
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        );
                                    })
                                ) : (
                                    <div className="flex justify-center text-[#A8A8A8] font-[400]"> 
                                            No data
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
                <div className='w-full rounded-b-xl bg-[#FBFBFB] h-16 px-6 justify-between items-center flex'>
                    <div>
                        <h1 className='text-[10px] text-[#A098AE]'>Showing 1-5 from 100 data</h1>
                    </div>
                    <div className='flex items-center gap-2'>
                        <KeyboardArrowLeft/>
                        <button className='bg-[#780000] bg-opacity-10 rounded-md w-6 h-6 flex items-center justify-center text-[10px] text-[#780000]'>1</button>
                        <button className='bg-[#780000] rounded-md w-6 h-6 flex items-center justify-center text-[10px] text-white'>2</button>
                        <button className='bg-[#780000] bg-opacity-10 rounded-md w-6 h-6 flex items-center justify-center text-[10px] text-[#780000]'>3</button>
                        <KeyboardArrowRight/>
                    </div>
                </div>
            </div>
        </div>
        <ModalDelete
            close={() => {
            setDelete(false);
            }}
            submit={async() => {
            await DeleteSubsidiary(id);
            inAwait();
            setDelete(false);
            SwalSuccess({ message: "Success delete Subsidiary" });
            }}
            active={isdelete}
        />
      </>
    )
}

export default Subsidiary