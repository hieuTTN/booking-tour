import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery'; 
import Swal from 'sweetalert2'
import { getMethod ,uploadSingleFile, postMethodPayload, uploadMultipleFile, deleteMethod} from '../../services/request';
import { Editor } from '@tinymce/tinymce-react';
import React, { useRef } from 'react';
import Select from 'react-select';


const listFile = [];
var linkbanner = '';
var description = '';


const AdminAddTour = ()=>{
    const editorRef = useRef(null);
    const [item, setItem] = useState(null);
    const [guide, setGuide] = useState([]);
    const [category, setCategory] = useState([]);
    const [selectGuide, setSelectGuide] = useState([]);
    const [selectcategory, setselectcategory] = useState(null);

    useEffect(()=>{
        const getItem= async() =>{
            var uls = new URL(document.URL)
            var id = uls.searchParams.get("id");
            if(id != null){
                var response = await getMethod('/api/tour/admin/findById?id=' + id);
                var result = await response.json();
                setItem(result)
                linkbanner = result.image
                description = result.content;
                setselectcategory(result.category)
                var arr = [];
                result.tourGuides.forEach((item) => {
                    arr.push(item.guide)
                });
                setSelectGuide(arr)
                document.getElementById("anhdathem").style.display = 'block'
            }
        };
        getItem();
        const getSelect= async() =>{
            var response = await getMethod('/api/category/public/find-all');
            var result = await response.json();
            setCategory(result)
            var response = await getMethod('/api/guide/admin/find-all-list');
            var result = await response.json();
            setGuide(result)
        };
        getSelect();
    }, []);
    
    function handleEditorChange(content, editor) {
        description = content;
    }

    function openChonAnh(){
        document.getElementById("choosefile").click();
    }

    async function deleteImage(id) {
        var con = window.confirm("Bạn muốn xóa ảnh này?");
        if (con == false) {
            return;
        }
        const response = await deleteMethod('http://localhost:8080/api/room-image/admin/delete?id=' + id)
        if (response.status < 300) {
            toast.success("xóa ảnh thành công!");
            document.getElementById("imgdathem" + id).style.display = 'none';
        }
        if (response.status == 417) {
            var result = await response.json()
            toast.warning(result.defaultMessage);
        }
    }


    async function saveTour(event) {
        event.preventDefault();
        document.getElementById("loading").style.display = 'block'
        var uls = new URL(document.URL)
        var id = uls.searchParams.get("id");
        var listLinkImg = await uploadMultipleFile(listFile);
        var ims = await uploadSingleFile(document.getElementById("imgbanner"))
        if(ims != null){
            linkbanner = ims
        }
        var arr = [];
        selectGuide.forEach((p)=>{
            arr.push(p.id);
        })
        var payload = {
            "id": id,
            "name": event.target.elements.tentour.value,
            "image": linkbanner,
            "content": description,
            "description": event.target.elements.description.value,
            "priceAdults": event.target.elements.priceAdults.value,
            "priceChildren": event.target.elements.priceChildren.value,
            "regisExpirationDate": event.target.elements.regisExpirationDate.value,
            "startDate": event.target.elements.startDate.value,
            "endDate": event.target.elements.endDate.value,
            "maxParticipants": event.target.elements.maxParticipants.value,
            "category": selectcategory,
            "images":listLinkImg,
            "guides":arr,
        }
        const response = await postMethodPayload('/api/tour/admin/create', payload)
        var result = await response.json();
        console.log(result)
        if (response.status < 300) {
            Swal.fire({
                title: "Thông báo",
                text: "Thêm tour thành công!",
                preConfirm: () => {
                    window.location.href = 'tour'
                }
            });
        } else {
            toast.error("Thêm thất bại");
            document.getElementById("loading").style.display = 'none'
        }
    }

    return (
        <>
            <div class="col-sm-12 header-sps">
                <div class="title-add-admin">
                    <h4>Thêm/ cập nhật tour</h4>
                </div>
            </div>
            <div class="col-sm-12">
                <div class="form-add">
                    <form class="row" onSubmit={saveTour} method='post'>
                        <div class="col-md-4 col-sm-12 col-12">
                            <label class="lb-form">Tên tour</label>
                            <input defaultValue={item?.name} name="tentour" class="form-control"/>
                            <label class="lb-form">Giá vé người lớn</label>
                            <input defaultValue={item?.priceAdults} name="priceAdults" class="form-control"/>
                            <label class="lb-form">Giá vé trẻ em</label>
                            <input defaultValue={item?.priceChildren} name="priceChildren" class="form-control"/>
                            <label class="lb-form">Ngày hết hạn đăng ký</label>
                            <input defaultValue={item?.regisExpirationDate} name="regisExpirationDate" type='date' class="form-control"/>
                            <label class="lb-form">Ngày bắt đầu</label>
                            <input defaultValue={item?.startDate} name="startDate" type='date' class="form-control"/>
                            <label class="lb-form">Ngày kết thúc</label>
                            <input defaultValue={item?.endDate} name="endDate" type='date' class="form-control"/>
                            <label class="lb-form">Số người giới hạn</label>
                            <input defaultValue={item?.maxParticipants} name="maxParticipants" class="form-control"/>
                            <label class="lb-form">Mô tả ngắn cho tour</label>
                            <textarea defaultValue={item?.description} name="description" class="form-control"></textarea>
                            <div id="loading">
                                <div class="bar1 bar"></div>
                            </div>
                            <br/><br/><button class="btn btn-primary form-control">Thêm/ cập nhật</button>
                        </div>
                        <div class="col-md-8 col-sm-12 col-12">
                        <label class="lb-form">Danh mục tour du lịch</label>
                            <Select
                                className="select-container" 
                                onChange={setselectcategory}
                                options={category}
                                value={selectcategory}
                                getOptionLabel={(option) => option.name} 
                                getOptionValue={(option) => option.id}    
                                closeMenuOnSelect={false}
                                name='category'
                                placeholder="Chọn danh mục"
                            />
                            <label class="lb-form">Hướng dẫn viên</label>
                            <Select
                                isMulti
                                className="select-container" 
                                onChange={setSelectGuide}
                                options={guide}
                                value={selectGuide}
                                getOptionLabel={(option) => option.fullName +", ngày sinh: "+option.dob} 
                                getOptionValue={(option) => option.id}    
                                closeMenuOnSelect={false}
                                name='guide'
                                placeholder="Chọn các hướng dẫn viên cho tour"
                            />
                            <label class="lb-form">Ảnh nền</label>
                            <input id="imgbanner" type="file" class="form-control"/>
                            <img src={item?.image} id="imgpreproduct" className='imgadmin'/>
                            <input accept="image/*" onChange={()=>previewImages()} id="choosefile" multiple type="file" className='hidden'/>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="row" id="preview">
                                        <div class="col-md-3" id="chon-anhs">
                                            <div id="choose-image" class="choose-image" onClick={()=>openChonAnh()}>
                                                <p><i class="fas fa-camera" id="camera"></i></p>
                                                <p id="numimage">Chọn thêm nhiều ảnh</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="row" id="anhdathem" >
                                    <div class="col-sm-12">
                                        <h4 className='lbanhdathem'>Ảnh đã thêm</h4>
                                    </div>
                                    <div id="listanhdathem" class="row">
                                        {item==null?'': 
                                        item.imageTours.map((item=>{
                                            return <div id={"imgdathem"+item.id} class="col-md-3 col-sm-4 col-4">
                                            <img  src={item.image} class="image-upload"/>
                                            <button type='button' onClick={()=>deleteImage(item.id)} class="btn btn-danger form-control">Xóa ảnh</button>
                                        </div>
                                        })) }
                                    </div>
                                </div>
                            </div> <br/>  
                            <label class="lb-form lbmotadv">Nội dung tour</label>
                            <Editor name='editor' class="editortext" tinymceScriptSrc={'https://cdn.tiny.cloud/1/mcvdwnvee5gbrtksfafzj5cvgml51to5o3u7pfvnjhjtd2v1/tinymce/6/tinymce.min.js'}
                                    onInit={(evt, editor) => editorRef.current = editor} 
                                    initialValue={item==null?'':item.content}
                                    onEditorChange={handleEditorChange}/>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

function previewImages() {
    var files = document.getElementById("choosefile").files;
    for (var i = 0; i < files.length; i++) {
        listFile.push(files[i]);
    }

    var preview = document.querySelector('#preview');

    for (i = 0; i < files.length; i++) {
        readAndPreview(files[i]);
    }

    function readAndPreview(file) {

        var reader = new FileReader(file);

        reader.addEventListener("load", function() {
            document.getElementById("chon-anhs").className = 'col-sm-3';
            document.getElementById("chon-anhs").style.height = '100px';
            document.getElementById("chon-anhs").style.marginTop = '5px';
            document.getElementById("choose-image").style.height = '120px';
            document.getElementById("numimage").innerHTML = '';
            document.getElementById("camera").style.fontSize = '20px';
            document.getElementById("camera").style.marginTop = '40px';
            document.getElementById("camera").className = 'fas fa-camera';
            document.getElementById("choose-image").style.width = '90%';

            var div = document.createElement('div');
            div.className = 'col-md-3 col-sm-6 col-6';
            div.style.height = '120px';
            div.style.paddingTop = '5px';
            div.marginTop = '100px';
            preview.appendChild(div);

            var img = document.createElement('img');
            img.src = this.result;
            img.style.height = '85px';
            img.style.width = '90%';
            img.className = 'image-upload';
            img.style.marginTop = '5px';
            div.appendChild(img);

            var button = document.createElement('button');
            button.style.height = '30px';
            button.style.width = '90%';
            button.innerHTML = 'xóa'
            button.className = 'btn btn-warning';
            div.appendChild(button);

            button.addEventListener("click", function() {
                div.remove();
                console.log(listFile.length)
                for (i = 0; i < listFile.length; i++) {
                    if (listFile[i] === file) {
                        listFile.splice(i, 1);
                    }
                }
                console.log(listFile.length)
            });
        });

        reader.readAsDataURL(file);

    }

}
export default AdminAddTour;