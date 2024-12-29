import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery'; 
import Swal from 'sweetalert2'
import {getMethod,postMethod, deleteMethod} from '../../services/request';
import {formatMoney} from '../../services/money';


var token = localStorage.getItem("token");



var size = 10
var url = '';
const AdminBooking = ()=>{
    const [items, setItems] = useState([]);
    const [booking, setBooking] = useState(null);
    const [trangThai, setTrangThai] = useState(null);
    const [pageCount, setpageCount] = useState(0);
    useEffect(()=>{
        getBooking();
    }, []);

    const getBooking = async() =>{
        var uls = '/api/booking/admin/all?&size='+size+'&sort=id,desc'
        uls += '&page=';
        url = uls
        var response = await getMethod(uls+0)
        var result = await response.json();
        setItems(result.content)
        setpageCount(result.totalPages)
    };

    const handlePageClick = async (data)=>{
        var currentPage = data.selected
        var response = await getMethod(url+currentPage)
        var result = await response.json();
        setItems(result.content)
        setpageCount(result.totalPages)
    }

    
    function getTrangThaiUp(item){
        setBooking(item)
        setTrangThai(item.payStatus)
    }

    async function updateStatus() {
        var tt = document.getElementById("trangthaiupdate").value
        var id = document.getElementById("iddonhangupdate").value
        var url = '/api/booking/admin/update-status?id=' + id + '&payStatus=' + tt;
        const res = await postMethod(url)
        if (res.status < 300) {
            toast.success("Cập nhật trạng thái thành công!");
            getBooking();
        }
        if (res.status == 417) {
            var result = await res.json()
            toast.warning(result.defaultMessage);
        }
    }


    
    return (
        <>
            <div class="headerpageadmin d-flex justify-content-between align-items-center p-3 bg-light border">
                <strong class="text-left"><i className='fa fa-users'></i> Quản Lý Đặt Tour</strong>
                <div class="search-wrapper d-flex align-items-center">
                    <div class="search-container">
                    </div>
                    <a href='add-tour' class="btn btn-primary ms-2"><i className='fa fa-plus'></i></a>
                </div>
            </div>
            <div class="tablediv">
                <div class="headertable">
                    <span class="lbtable">Danh sách đặt tour</span>
                </div>
                <div class="divcontenttable">
                    <table id="example" class="table table-bordered">
                        <thead>
                        <tr>
                            <th>Ảnh</th>
                            <th>Tên</th>
                            <th>Ngày đăng ký</th>
                            <th>Thời gian</th>
                            <th>Số lượng vé</th>
                            <th>Tổng tiền</th>
                            <th>Thông tin</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item=>{
                            return  <tr>
                                <td><img src={item.tour.image} class='imgtable'/></td>
                                <td><a target='_blank' href={'tourdetail?id='+item.tour.id} className='taga'>{item.tour.name}</a><br/>Loại: {item.tour.category.name}</td>
                                <td>{item.createdDate}</td>
                                <td>{item.tour.startDate} <br/> {item.tour.endDate}</td>
                                <td>Vé người lớn: <strong>{item.numAdults}</strong> x {formatMoney(item.tour.priceAdults)}<br/>Vé trẻ con: <strong>{item.numChildren} x {formatMoney(item.tour.priceChildren)}</strong></td>
                                <td>{formatMoney(item.totalPrice)}</td>
                                <td>Họ tên: {item.user.fullname}<br/>Email: {item.user.username}</td>
                                <td>{item.payStatus}</td>
                                <td class="sticky-col">
                                    <button className='edit-btn' onClick={()=>getTrangThaiUp(item)} data-bs-toggle="modal" data-bs-target="#capnhatdonhang"><i class="fa fa-edit"></i></button>
                                </td>
                            </tr>
                        }))}
                    </tbody>
                    </table>

                    <ReactPaginate 
                        marginPagesDisplayed={2} 
                        pageCount={pageCount} 
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'} 
                        pageClassName={'page-item'} 
                        pageLinkClassName={'page-link'}
                        previousClassName='page-item'
                        previousLinkClassName='page-link'
                        nextClassName='page-item'
                        nextLinkClassName='page-link'
                        breakClassName='page-item'
                        breakLinkClassName='page-link' 
                        previousLabel='Trang trước'
                        nextLabel='Trang sau'
                        activeClassName='active'/>
                </div>
            </div>

            <div class="modal fade" id="capnhatdonhang" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Cập nhật trạng thái đơn hàng</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
                        <div class="modal-body">
                            <input value={booking?.id} type="hidden" id="iddonhangupdate"/>
                            <select class="form-control" id="trangthaiupdate">
                                <option selected={trangThai == 'CHUA_THANH_TOAN'} value='CHUA_THANH_TOAN'>Chưa thanh toán</option>
                                <option selected={trangThai == 'DA_DAT_COC'} value='DA_DAT_COC'>Đã đặt cọc</option>
                                <option selected={trangThai == 'DA_THANH_TOAN'} value='DA_THANH_TOAN'>Đã thanh toán</option>
                            </select><br/><br/>
                            <button onClick={()=>updateStatus()} class="btn btn-primary form-control action-btn">Cập nhật</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminBooking;