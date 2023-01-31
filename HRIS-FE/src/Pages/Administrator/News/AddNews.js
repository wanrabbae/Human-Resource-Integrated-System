import { Editor } from '@tinymce/tinymce-react'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CreateNews } from '../../../Repository/NewsRepository';

function AddNews() {
    const navigate = useNavigate()
    const editorRef = useRef(null);
    const [image, setImage] = useState()
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')


    const postData = async (e) => {
        e.preventDefault();

        var requestBody = {
            image: image,
            title: title,
            desc: editorRef.current.getContent()
        };
        console.log(requestBody);
        await CreateNews(requestBody)
          .then((response) => {
            console.log(response);
            navigate("/news");
          })
          .catch((e) => {
            console.log("error", e.response);
            // if (e.response) {
            //   setMsg(e.response.data.message);
            // }
          });
    };
    return (
        <div>
            <h1 className='text-lg font-semibold mb-2'>Company News</h1>
            <div className='space-y-2'>
                <div className="w-full">
                    <label className="text-xs">Photo</label>
                    <input
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <div className="w-full">
                    <label className="text-xs">Title</label>
                    <input
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        placeholder='ex: Kegiatan Outing bersama'
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="w-full">
                    <label className="text-xs">Title</label>
                    <Editor
                        //    onChange={(val) => {
                        //     setEditor(val.currentTarget.value)
                        //    }}
                        // id="qualification2"
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        init={{
                            height: 250,
                            menubar: false,
                            plugins: [
                                "a11ychecker",
                                "advlist",
                                "advcode",
                                "advtable",
                                "autolink",
                                "checklist",
                                "export",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "powerpaste",
                                "fullscreen",
                                "formatpainter",
                                "insertdatetime",
                                "media",
                                "table",
                                "help",
                                "wordcount",
                            ],
                            toolbar:
                                "undo redo | casechange blocks | bold italic backcolor | " +
                                "alignleft aligncenter alignright alignjustify | " +
                                "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help",
                        }}
                    />
                </div>
                <div className="flex justify-end gap-2 mt-5">
                    <button
                        type="button"
                        className="text-[#003049] bg-gray-300 hover:bg-gray-300 font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-gray-200 dark:hover:bg-gray-300 focus:outline-none"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={postData}
                        className="text-white bg-[#0E5073] hover:bg-[#003049] font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-[#0E5073] dark:hover:bg-[#003049] focus:outline-none"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddNews