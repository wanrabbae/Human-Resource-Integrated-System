import { Button } from "react-bootstrap";

function Imigration() {
    return (
        <>
            <div >
                <div  className="mb-4">
                    <span style={{fontWeight:'600'}}>Imigration</span>
                </div>
                <form>    
                    <div className="row mb-4">
                        <div className='col-5'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Document
                            </label>
                            <div className="row py-2">    
                                <div className="flex items-center col">
                                    <input id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label for="default-radio-1" className="ml-2 text-sm text-gray-900 dark:text-gray-300">Passport</label>
                                </div>
                                <div className="flex items-center col">
                                    <input id="default-radio-2" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label for="default-radio-2" className="ml-2 text-sm text-gray-900 dark:text-gray-300">Visa</label>
                                </div>
                            </div>
                        </div>
                        <div className="w-100 mb-4">
                            
                        </div>
                        <div className='col'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Number
                            </label>
                            <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="text" placeholder="ex : 1234"/>
                        </div>
                        <div className='col'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Issued Date
                            </label>
                            <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="date"/>
                        </div>
                        <div className='col'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Expired Date
                            </label>
                            <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="date"/>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className='col'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Eligible Status
                            </label>
                            <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="text" placeholder=""/>
                        </div>
                        <div className='col'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Issued By
                            </label>
                            <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
                                <option className="py-3" hidden>Select</option>
                                <option className="py-3">Afganistan</option>
                                <option className="py-3">Albani</option>
                                <option className="py-3">Algeria</option>
                                <option className="py-3">Amerika Samoa</option>
                                <option className="py-3">Anddora</option>
                            </select>
                        </div>
                        <div className='col'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Eligible Review Date
                            </label>
                            <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="date"/>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-6">
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Comment
                            </label>
                            <textarea rows="4" className=" appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"></textarea>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end mt-4">
                        <Button
                            style={{
                                border:'none',
                                fontSize:'14px',
                                backgroundColor: "#0E5073",
                                color: "#FFFFFF",
                            }}
                            className="px-4"
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default Imigration;