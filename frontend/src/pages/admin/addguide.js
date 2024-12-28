import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery'; 
import Swal from 'sweetalert2'
import { getMethod ,uploadSingleFile, postMethodPayload} from '../../services/request';
import { Editor } from '@tinymce/tinymce-react';
import React, { useRef } from 'react';


var linkbanner = '';
var description = '';
async function saveGuide(event) {
    event.preventDefault();
    document.getElementById("loading").style.display = 'block'
    var uls = new URL(document.URL)
    var id = uls.searchParams.get("id");
    var ims = await uploadSingleFile(document.getElementById("imgbanner"))
    if(ims != null){
        linkbanner = ims
    }
    var payload = {
        "id": id,
        "fullName": event.target.elements.fullName.value,
        "dob": event.target.elements.dob.value,
        "description": description,
        "avatar": linkbanner,
    }
    const response = await postMethodPayload('/api/guide/admin/create', payload)
    var result = await response.json();
    console.log(result)
    if (response.status < 300) {
        Swal.fire({
            title: "Thông báo",
            text: "Thêm/cập nhật thành công!",
            preConfirm: () => {
                window.location.href = 'guide'
            }
        });
    } else {
        toast.error("Thêm/ sửa hướng dẫn viên thất bại");
        document.getElementById("loading").style.display = 'none'
    }
}


const AdminAddGuide = ()=>{
    const editorRef = useRef(null);
    const [item, setItem] = useState(null);
    useEffect(()=>{
        const getItem= async() =>{
            var uls = new URL(document.URL)
            var id = uls.searchParams.get("id");
            if(id != null){
                var response = await getMethod('/api/guide/admin/findById?id=' + id);
                var result = await response.json();
                setItem(result)
                linkbanner = result.avatar
                description = result.description;
            }
        };
        getItem();
    }, []);
    
    function handleEditorChange(content, editor) {
        description = content;
    }

    return (
        <>
            <div class="col-sm-12 header-sps">
                <div class="title-add-admin">
                    <h4>Thêm/ cập nhật hướng dẫn viên</h4>
                </div>
            </div>
            <div class="col-sm-12">
                <div class="form-add">
                    <form class="row" onSubmit={saveGuide} method='post'>
                        <div class="col-md-4 col-sm-12 col-12">
                            <label class="lb-form">Tên hướng dẫn viên</label>
                            <input defaultValue={item==null?'':item.fullName} name="fullName" type="text" class="form-control"/>
                            <label class="lb-form">Ngày sinh</label>
                            <input defaultValue={item?.dob} name="dob" type="date" class="form-control"/>
                            <label class="lb-form">Ảnh</label>
                            <input id="imgbanner" type="file" class="form-control"/>
                            <img src={item == null ? '': item.avatar}/><br/>
                            <img id="imgpreview" className='imgadmin'/>
                            <div id="loading">
                                <div class="bar1 bar"></div>
                            </div>
                            <br/><br/><button class="btn btn-primary form-control">Thêm/ cập nhật</button>
                        </div>
                        <div class="col-md-8 col-sm-12 col-12">
                            <label class="lb-form lbmotadv">Giới thiệu hướng dẫn viên</label>
                            <Editor name='editor' tinymceScriptSrc={'https://cdn.tiny.cloud/1/mcvdwnvee5gbrtksfafzj5cvgml51to5o3u7pfvnjhjtd2v1/tinymce/6/tinymce.min.js'}
                                    onInit={(evt, editor) => editorRef.current = editor} 
                                    initialValue={item==null?'':item.description}
                                    onEditorChange={handleEditorChange}/>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AdminAddGuide;