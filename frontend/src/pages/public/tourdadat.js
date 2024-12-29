
import {getMethod, postMethod} from '../../services/request'
import {formatMoney} from '../../services/money'
import { useState, useEffect } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Swal from 'sweetalert2'
import {toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';

var url = '';
var size = 10;
function TourDaDat(){
    const [items, setItems] = useState([]);
    const [pageCount, setpageCount] = useState(0);
    useEffect(()=>{
        getItem();
    }, []);

    const getItem= async() =>{
        var uls = '/api/booking/user/my-booking?&size='+size+'&sort=id,desc'
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

    async function cancel(id){
        var con = window.confirm("Bạn chắc chắn muốn hủy tour du lịch này?");
        if (con == false) {
            return;
        }
        var response = await postMethod('/api/booking/user/cancel?id='+id)
        if (response.status < 300) {
            toast.success("Hủy thành công")
            getItem();
        }
        if (response.status == 417) {
            var result = await response.json()
            toast.warning(result.defaultMessage);
        }
    }
    

    return(
        <div class="contentmain container">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Ảnh</th>
                        <th>Tên</th>
                        <th>Loại</th>
                        <th>Ngày đăng ký</th>
                        <th>Ngày bắt đầu</th>
                        <th>Ngày kết thúc</th>
                        <th>Giá vé</th>
                        <th>Số lượng vé</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item=>{
                        return  <tr>
                            <td><img src={item.tour.image} class='imgtable'/></td>
                            <td><a target='_blank' href={'tourdetail?id='+item.tour.id} className='taga'>{item.tour.name}</a></td>
                            <td>{item.tour.category.name}</td>
                            <td>{item.createdDate}</td>
                            <td>{item.tour.startDate}</td>
                            <td>{item.tour.endDate}</td>
                            <td>Người lớn: {formatMoney(item.tour.priceAdults)}<br/>Trẻ con: {formatMoney(item.tour.priceChildren)}</td>
                            <td>Vé người lớn: <strong>{item.numAdults}</strong><br/>Vé trẻ con: <strong>{item.numChildren}</strong></td>
                            <td>{formatMoney(item.totalPrice)}</td>
                            <td>{item.payStatus}</td>
                            <td class="sticky-col">
                                {item.payStatus != 'CHUA_THANH_TOAN'?'':<button onClick={()=>cancel(item.id)} class="delete-btn">hủy</button>}
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
        );
    }


function calBwDate(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2 - d1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
export default TourDaDat;
