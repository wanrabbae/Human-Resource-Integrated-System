
import { useState,useEffect, useRef, } from "react";
import { Plus, Eye, FileText, DotsThreeOutline, MagnifyingGlass } from "phosphor-react";
import { Button, Modal, Table } from "react-bootstrap";
import { AddRecruitment, GetRecruitment } from "../../../Repository/RecruitmentRepository";
import { Editor } from '@tinymce/tinymce-react';
import axios from "axios";
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import FroalaEditorComponent from 'react-froala-wysiwyg';
import FroalaEditor from "react-froala-wysiwyg";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

function Recruitment() {
    const [modal, setModal] = useState(false);
    const [recruit, setRecruit] = useState([]);
    const editorRef = useRef(null);
    const inAwait = async () => {
        var rec = await GetRecruitment();
        setRecruit(rec['result']);
      }
    useEffect(() => {
        inAwait();
    }, []);
    return (
        <>
            <div className="d-flex justify-content-between">
                <div className="row">
                    <h3 style={{ fontSize: "20px", fontWeight: '600' }}>Requirment</h3>
                    <span style={{ fontSize: "10px", fontWeight: '400', color: "#737373" }}>list of recruitment form </span>
                </div>
                <div className="d-flex">
                    <div className="input-group me-3 align-items-center w-auto" style={{ borderRadius: '10px', border: '1.5px solid #CACACA', backgroundColor: 'transparent', color: "#0E5073", fontSize: "14px", fontWeight: '500' }}>
                        <div class="input-group-prepend">
                            <span class="transparent "><MagnifyingGlass size={20} className="mx-2 form-control-feedback" color="#CACACA" weight="bold" /></span>
                        </div>
                        <input style={{ border: '0', outline: 'none', backgroundColor: 'transparent', color: "#0E5073", fontSize: "14px", fontWeight: '500' }} onChange={(val) => { }} className="focus:ring-0 focus:ring-offset-0 focus:outline-0" type="search" placeholder=" Search Requirement" />
                    </div>
                    <button style={{ borderRadius: '10px', border: '1.5px solid #CACACA', color: "#0E5073", fontSize: "14px", fontWeight: '500' }} className="me-3 btn d-flex align-items-center" onClick={() => { window.location.href = '/recruitment/entry-application' }} type=""><Eye className="me-2" size={15} weight="bold" />Entry Application</button>
                    <button style={{ borderRadius: '10px', backgroundColor: "#0E5073", fontSize: "14px", fontWeight: '500' }} className="btn d-flex align-items-center text-white" onClick={() => setModal(true)} type=""><Plus size={15} className="me-2" weight="bold" />Create Recruitment</button>
                </div>
            </div>
            <div className="container-fluid">
                <div className="grid grid-cols-3 gap-4 mt-5 px-4 pt-4 pb-56" style={{ backgroundColor: '#F3F6FF', borderRadius: '10px' }}>
                    {
                        recruit.length > 0 ?
                            recruit.map((val) => {
                                return (
                                        <div className="p-3 d-flex align-items-center" style={{ boxShadow: '0px 0px 3px 0px rgba(179,179,179,1)', backgroundColor: 'white', color: '#003049', borderRadius: '10px' }}>
                                            <FileText className="me-3" size={35} weight="fill" />
                                            <div className="row">
                                                <h2 style={{ fontWeight: '600' }}>{val['title']}</h2>
                                                <span style={{ fontSize: '10px', color: '#A8A8A8', fontWeight: '400' }}>{val['publishDate']}</span>
                                            </div>
                                            <a href="" className="ms-auto">
                                                <DotsThreeOutline size={20} weight="fill" />
                                            </a>
                                        </div>
                                );
                            }) :
                            <div className="text-center grid-cols-1"> 
                                No Data
                            </div>
                    }
                </div>
            </div>
            <Modal show={modal} size="lg" onHide={() => setModal(false)}>
                <Modal.Header closeButton className="mx-4 mt-4"
                    style={{ borderBottomColor: "transparent", }}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create Recruitment
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="mx-4">
                    <div className="px-4 pb-4 mb-4 pt-2" style={{ borderRadius: '10px', border: '0', borderLeft: '15px solid #780000', boxShadow: '0px 0px 3px 0px rgba(179,179,179,1)' }}>
                        <input id="title" style={{ border: '0', outline: 'none', borderBottom: '1px solid #EDEDED', backgroundColor: 'transparent', fontSize: "20px", fontWeight: '500' }} onChange={(val) => { }} className="focus:ring-0 focus:ring-offset-0 me-3 w-50 " type="text" placeholder="Recruitment Title Title" />
                        <input id="description" style={{ border: '0', outline: 'none', borderBottom: '1px solid #EDEDED', backgroundColor: 'transparent', fontSize: "12px", fontWeight: '500' }} onChange={(val) => { }} className="focus:ring-0 focus:ring-offset-0 me-3 form-control" type="text" placeholder="Recruitment description" />
                    </div>
                    <input id="position" style={{ borderRadius: '10px', border: '1.5px solid #EDEDED', backgroundColor: 'transparent', fontSize: "12px", fontWeight: '500' }} onChange={(val) => { }} className="mb-3 focus:ring-0 focus:ring-offset-0 me-3 form-control" type="text" placeholder="Position" />
                    <input id="placement" style={{ borderRadius: '10px', border: '1.5px solid #EDEDED', backgroundColor: 'transparent', fontSize: "12px", fontWeight: '500' }} onChange={(val) => { }} className="mb-3 focus:ring-0 focus:ring-offset-0 me-3 form-control" type="text" placeholder="Placement" />
                    <textarea id="job_description" style={{ borderRadius: '10px', border: '1.5px solid #EDEDED', backgroundColor: 'transparent', fontSize: "12px", fontWeight: '500' }} className="mb-3 focus:ring-0 focus:ring-offset-0 me-3 form-control" rows="8" placeholder="Job Description"></textarea>
                    {/* <textarea  style={{ borderRadius: '10px', border: '1.5px solid #EDEDED', backgroundColor: 'transparent', fontSize: "12px", fontWeight: '500' }} className="mb-3 focus:ring-0 focus:ring-offset-0 me-3 form-control" rows="8" placeholder="Qualification"></textarea> */}
                    {/* <FroalaEditor
                    // model={this.state.content}
                    // onModelChange={this.handleModelChange}
                    />
                    <FroalaEditorView
                    // model={this.state.content}
                    /> */}
                    <Editor
                    //    onChange={(val) => {
                    //     setEditor(val.currentTarget.value)
                    //    }}
                        // id="qualification2"
                        onInit={(evt, editor) => editorRef.current = editor}
                        init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                        'a11ychecker','advlist','advcode','advtable','autolink','checklist','export',
                        'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks',
                        'powerpaste','fullscreen','formatpainter','insertdatetime','media','table','help','wordcount'
                        ],
                        toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' +
                        'alignleft aligncenter alignright alignjustify | ' +
                        'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help'
                        }}
                    />
                    <div className="mb-4">    
                        <label className="block text-gray-700 text-sm mt-3 mb-2" for="username">
                            Job Type
                        </label>
                        <select id="type" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
                            <option selected disabled className="py-3">Select Job Type</option>
                            <option value="Part Time" className="py-3">Part Time</option>
                            <option value="Full Time" className="py-3">Full Time</option>
                            <option value="Remote" className="py-3">Remote</option>
                        </select>
                    </div>
                    <div className="d-flex gap-4">
                        <div className="w-full">
                            <label className="block text-gray-700 text-sm mt-3 mb-2" for="username">
                                Start Date
                            </label>
                            <input id="publish_date" style={{ borderRadius: '10px', border: '1.5px solid #EDEDED', backgroundColor: 'transparent', fontSize: "12px", fontWeight: '500' }} onChange={(val) => { }} className="focus:ring-0 focus:ring-offset-0 me-3 form-control" type="date" placeholder="Recruitment description" />
                        </div>
                        <div className="w-full">
                            <label className="block text-gray-700 text-sm mt-3 mb-2" for="username">
                                End Date
                            </label>
                            <input id="expired_date" style={{ borderRadius: '10px', border: '1.5px solid #EDEDED', backgroundColor: 'transparent', fontSize: "12px", fontWeight: '500' }} onChange={(val) => { }} className="focus:ring-0 focus:ring-offset-0 me-3 form-control" type="date" placeholder="Recruitment description" />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="m-4">
                    <Button
                        style={{
                            border: 'none',
                            fontSize: '14px',
                            backgroundColor: "#ECECEC",
                            color: "#003049",
                        }}
                        className="px-3"
                        onClick={() => setModal(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        style={{
                            border: 'none',
                            fontSize: '14px',
                            backgroundColor: "#0E5073",
                            color: "#FFFFFF",
                        }}
                        className="px-3"
                        onClick={async () => {
                            var requestBody = {
                                title: document.getElementById("title").value,
                                description: document.getElementById("description").value,
                                position: document.getElementById("position").value,
                                placement: document.getElementById("placement").value,
                                type: document.getElementById("type").value,
                                jobDescription: document.getElementById("job_description").value,
                                qualification: editorRef.current.getContent(),
                                publishDate: document.getElementById("publish_date").value,
                                expiredDate: document.getElementById("expired_date").value,
                            };
                            console.log(requestBody)
                            var res = await AddRecruitment(requestBody);
                            setModal(false);
                            inAwait();
                        }}
                    >
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default Recruitment;