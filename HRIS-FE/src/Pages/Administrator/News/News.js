import { Add, DeleteOutline, EditOutlined, ImportExport, VisibilityOutlined } from '@mui/icons-material';
import { Button, Table } from '@mui/material';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ModalDelete } from '../../../Components/Modals';
import { DeleteNews, GetNews } from '../../../Repository/NewsRepository';

function News() {
    const navigate = useNavigate()
    const [dataNews, setDataNews] = useState([])
    const [isDelete, setDelete] = useState(false);
    const [id, setId] = useState('')

    const inAwait = async () => {
        var news = await GetNews();
        console.log("ini news", news.data);
        setDataNews(news.data.sort((a, b) => b.id-a.id));
    };

    useEffect(() => {
        inAwait();
    }, []);
    return (
        <div>
            <h1 className='text-lg font-semibold mb-2'>Company News</h1>
            <hr></hr>
            <div className='space-y-2 my-4'>
                <h2 className='font-semibold'>Current News</h2>
                <p className='text-sm text-gray-400'>The latest news about the company</p>
            </div>

            <div className="grid grid-cols-3 gap-2 items-center justify-center gap-5">
                {dataNews.length > 0 ?
                    dataNews.slice(0, 3).map((val, index) => (
<<<<<<< HEAD
                        <Link key={index} to={"/finance/reimburstment"} className="relative">
=======
                        <Link key={index} to={`/news/detail/${val.id}`} className="relative">
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
                            {val.image ?
                                // <div className="brightness-75 transition-all duration-500 ease-in-out hover:brightness-50 h-[150px] w-full rounded-xl bg-no-repeat bg-center bg-cover" style={{backgroundImage: `url(${val.image})`}}></div>
                                <img className="brightness-75 transition-all duration-500 ease-in-out hover:brightness-50 h-[150px] w-full rounded-xl bg-no-repeat bg-center bg-cover" crossOrigin="anonymous" src={val.image} />
                                :
                                <div className="brightness-75 transition-all duration-500 ease-in-out hover:brightness-50 bg-gray-400 h-[150px] rounded-xl"></div>
                            }
                            <div className="absolute bottom-5 left-5 text-white">
                                <p className="font-semibold">{val.title}</p>
                                <p className="font-thin text-xs">{moment(val.createdAt).format("ll")}</p>
                            </div>
                        </Link>
                    ))
                    : <div className="bg-gray-100 rounded-lg h-[200px] text-center col-span-3">No Data</div>}
            </div>
            <div className="bg-white p-3 mt-5 rounded-lg space-y-3">
                <div className='flex justify-between'>
                    <div>
                        <h5>
<<<<<<< HEAD
                            <b>Reimbursment</b>
                        </h5>
                        <p>
                            <small>list of reimbursment</small>
=======
                            <b>News</b>
                        </h5>
                        <p>
                            <small>list of News</small>
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
                        </p>
                    </div>
                    <div className="flex">
                        {/* <TextFieldSearch /> */}
                        <div className="flex flex-row rounded-lg bg-gray-50 border border-gray-300 mt-1">
                            <div className="flex items-center pl-3 pointer-events-none">
                                <svg
                                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="table-search"
                                className="text-sm appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none focus:ring-transparent"
                                placeholder="Search ..."
                            // onChange={(e) => searchData(e.target.value)}
                            />
                        </div>
                        <div className="mx-2"></div>
                        <Button
                            onClick={() => {
                                navigate("/news/add")
                            }}
                            style={{
                                color: "#FFFFFF",
                                borderRadius: "7px",
                                backgroundColor: "#0E5073",
                            }}
                            variant="contained"
                            startIcon={<Add />}
                        >
                            Add New POst
                        </Button>
                    </div>

                </div>
                <br></br>
                <Table borderless responsive style={{ color: "#00000070" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#EBF7FF" }}>
                            <th onClick={() => { }} className="p-2 truncate">
                                Date <ImportExport fontSize="2px" />
                            </th>
                            <th onClick={() => { }} className="p-2 truncate">
                                Photo <ImportExport fontSize="2px" />
                            </th>
                            <th onClick={() => { }} className="p-2 truncate">
                                Title <ImportExport fontSize="2px" />
                            </th>
                            <th onClick={() => { }} className="p-2 truncate">
                                Description <ImportExport fontSize="2px" />
                            </th>
                            {/* {employee?.role == "admin" || employee?.role == "subsdiary" || employee?.role == "subadmin" ? ( */}
                            <th onClick={() => { }} className="p-2 truncate text-center">
                                Action
                            </th>
                            {/* : null} */}
                        </tr>
                    </thead>
                    <tbody>
                        {dataNews.length > 0 ? (
                            dataNews.map((val, index) => (
                                <tr key={index}>
                                    <td className="p-2">{moment(val.createdAt).format('L')}</td>
                                    <td className="p-2">
                                        <img src={val.image} className="h-10 w-10 rounded-lg" />
                                    </td>
                                    <td className="p-2">{val.title}</td>
                                    <td className="p-2 text-ellipsis overflow-hidden">{val.desc.slice(0, 50)} ...</td>
                                    {/* {employee?.role == "admin" || employee?.role == "subsdiary" || employee?.role == "subadmin" ? ( */}
                                    <td className="p-2 flex items-center justify-center">
                                        <button
                                            onClick={() => {
                                                navigate(`/news/detail/${val.id}`);
                                            }}
                                            className="btn btn-sm mx-1"
                                            style={{
                                                backgroundColor: "#CEDFEA",
                                                borderRadius: "8px",
                                            }}
                                        >
                                            <VisibilityOutlined fontSize="10px" />
                                        </button>
                                        <button
                                            onClick={() => {
                                                navigate(`/news/edit/${val.id}`);
                                            }}
                                            className="btn btn-sm mx-1"
                                            style={{
                                                backgroundColor: "#CEDFEA",
                                                borderRadius: "8px",
                                            }}
                                        >
                                            <EditOutlined fontSize="10px" />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setId(val.id);
                                                setDelete(true);
                                            }}
                                            className="btn btn-sm mx-1"
                                            style={{
                                                backgroundColor: "#CEDFEA",
                                                borderRadius: "8px",
                                            }}
                                        >
                                            <DeleteOutline fontSize="10px" />
                                        </button>
                                    </td>
                                    {/* ) : null} */}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7}>
                                    <div className="d-flex justify-content-center align-middle text-center">
                                        No Data
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            <ModalDelete
                close={() => {
                    setDelete(false);
                }}
                submit={() => {
                    DeleteNews(id);
                    inAwait();
                    setDelete(false);
                }}
                active={isDelete}
            />
        </div>
    )
}

export default News