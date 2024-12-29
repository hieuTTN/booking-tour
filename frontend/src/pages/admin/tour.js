import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery'; 
import Swal from 'sweetalert2'
import {getMethod,postMethodPayload, deleteMethod} from '../../services/request';
import {formatMoney} from '../../services/money';


var token = localStorage.getItem("token");



var size = 10
var url = '';
const AdminTour = ()=>{
    const [items, setItems] = useState([]);
    const [pageCount, setpageCount] = useState(0);
    useEffect(()=>{
        getTour();
    }, []);

    const getTour = async() =>{
        var uls = '/api/tour/public/find-all?&size='+size+'&sort=id,desc'
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

    async function deleteData(id){
        var con = window.confirm("Bạn chắc chắn muốn xóa tour du lịch này?");
        if (con == false) {
            return;
        }
        var response = await deleteMethod('/api/tour/admin/delete?id='+id)
        if (response.status < 300) {
            toast.success("Xóa thành công")
            getTour();
        }
        if (response.status == 417) {
            var result = await response.json()
            toast.warning(result.defaultMessage);
        }
    }
    
    
    return (
        <>
            <div class="headerpageadmin d-flex justify-content-between align-items-center p-3 bg-light border">
                <strong class="text-left"><i className='fa fa-users'></i> Quản Lý Tour Du Lịch</strong>
                <div class="search-wrapper d-flex align-items-center">
                    <div class="search-container">
                    </div>
                    <a href='add-tour' class="btn btn-primary ms-2"><i className='fa fa-plus'></i></a>
                </div>
            </div>
            <div class="tablediv">
                <div class="headertable">
                    <span class="lbtable">Danh sách tour</span>
                </div>
                <div class="divcontenttable">
                    <table id="example" class="table table-bordered">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Ảnh</th>
                                <th>Tên</th>
                                <th>Loại</th>
                                <th>Ngày tạo</th>
                                <th>Ngày bắt đầu</th>
                                <th>Ngày kết thúc</th>
                                <th>Ngày hết hạn đăng ký</th>
                                <th>Giá vé</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item=>{
                                return  <tr>
                                    <td>{item.id}</td>
                                    <td><img src={item.image} class='imgtable'/></td>
                                    <td>{item.name}</td>
                                    <td>{item.category.name}</td>
                                    <td>{item.createdDate}</td>
                                    <td>{item.startDate}</td>
                                    <td>{item.endDate}</td>
                                    <td>{item.regisExpirationDate}</td>
                                    <td>Người lớn: {formatMoney(item.priceAdults)}<br/>Trẻ con: {formatMoney(item.priceChildren)}</td>
                                    <td class="sticky-col">
                                        <a href={'add-tour?id='+item.id} class="edit-btn"><i className='fa fa-edit'></i></a>
                                        <button onClick={()=>deleteData(item.id)} class="delete-btn"><i className='fa fa-trash'></i></button>
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

        </>
    );
}

export default AdminTour;