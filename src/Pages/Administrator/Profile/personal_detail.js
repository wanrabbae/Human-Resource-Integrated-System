import { Button } from "react-bootstrap";
import Select from 'react-select'

function PersonalDetail() {
    const marital = [
        { value: 'single', label: 'Single' },
        { value: 'mariied', label: 'Married' },
      ]
    return(
        <>
            <div >
                <div  className="mb-4">
                    <span style={{fontWeight:'600'}}>Personal Detail</span>
                </div>
                <form>    
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm mb-2" for="username">
                            Employee Full Name *
                        </label>
                        <div className="row">
                            <div className="col">
                                <input value="Vina" className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="text" placeholder="Username"/>
                            </div>
                            <div className="col">
                                <input value="Afrilia" className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="text" placeholder="Username"/>
                            </div>
                        </div>
                    </div>
                    <hr style={{backgroundColor:'#CACACA'}} className="mb-4"></hr>
                    <div className="row mb-4">
                        <div className='col'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                                Employee ID
                            </label>
                            <input disabled value="001" className=" appearance-none border rounded w-full py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="text" placeholder="Username"/>
                        </div>
                        <div className='col'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                                Other ID
                            </label>
                            <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="text"/>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className='col'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Driver's License Number
                            </label>
                            <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="text"/>
                        </div>
                        <div className='col'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            License Expiry Date
                            </label>
                            <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="date"/>
                        </div>
                    </div>
                    <hr style={{backgroundColor:'#CACACA'}} className="mb-4"></hr>
                    <div className="row mb-4">
                        <div className='col'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Nationality
                            </label>
                            <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
                                <option className="py-3">Select</option>
                            </select>
                        </div>
                        <div className='col'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Marital Status

                            </label>
                            {/* <Select  options={marital} /> */}
                            <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
                                <option className="py-3">Select</option>
                                <option className="py-3">Single</option>
                                <option className="py-3">Married</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className='col'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Birth of Date
                            </label>
                            <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="date"/>
                        </div>
                        <div className='col'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Gender
                            </label>
                            <div className="row py-2">    
                                <div className="flex items-center col">
                                    <input id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label for="default-radio-1" className="ml-2 text-sm text-gray-900 dark:text-gray-300">Male</label>
                                </div>
                                <div className="flex items-center col">
                                    <input id="default-radio-2" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label for="default-radio-2" className="ml-2 text-sm text-gray-900 dark:text-gray-300">Female</label>
                                </div>
                            </div>
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
export default PersonalDetail;