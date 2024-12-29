
import {getMethod, postMethod} from '../../services/request'
import {formatMoney} from '../../services/money'
import { useState, useEffect } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Swal from 'sweetalert2'
import {toast } from 'react-toastify';

function Detail(){
    const [item, setItem] = useState({});
    const [images, setImages] = useState([]);
    const [image, setImage] = useState(null);
    const [soNguoiLon, setSoNguoiLon] = useState(1);
    const [soTreCon, setSoTreCon] = useState(0);
    const settings = {
        dots: true, 
        infinite: true, 
        speed: 500, // Tốc độ chuyển đổi
        slidesToShow: 8, // Số slide hiển thị
        slidesToScroll: 1, // Số slide cuộn mỗi lần
        autoplaySpeed: 2000, // Tốc độ tự chạy
        responsive: [
          {
            breakpoint: 600, // Với màn hình nhỏ hơn 600px
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 1000, 
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
            },
          },
        ],
      };
    useEffect(()=>{
        const getItem= async() =>{
            var uls = new URL(document.URL)
            var id = uls.searchParams.get("id");
            if(id != null){
                var response = await getMethod('/api/tour/public/findById?id=' + id);
                var result = await response.json();
                setItem(result)
                setImage(result.image)
                setImages(result.imageTours)
            }
        };
        getItem();
    }, []);

    function tangGiamNguoiLon(val){
        var giaTri = Number(val) + Number(soNguoiLon);
        if(giaTri == 0){
            return;
        }
        setSoNguoiLon(giaTri);
    }

    function tangGiamTreCon(val){
        var giaTri = Number(val) + Number(soTreCon);
        if(giaTri < 0){
            return;
        }
        setSoTreCon(giaTri);
    }

    async function datLich() {
        var con = window.confirm("Xác nhận đặt lịch");
        if(con == false){
            return;
        }
        var uls = new URL(document.URL)
        var id = uls.searchParams.get("id");
        const response = await postMethod('/api/booking/user/create?numChild='+soTreCon+'&numAudit='+soNguoiLon+'&tourId='+id)
        var result = await response.json();
        if (response.status < 300) {
            Swal.fire({
                title: "Thông báo",
                text: "Đặt tour thành công!",
                preConfirm: () => {
                    window.location.href = 'tourdadat'
                }
            });
        } 
        if(response.status == 417) {
            toast.error(result.defaultMessage);
        }
    }
    

    return(
        <div class="contentmain container">
            <div className='contentdetailpage'>
                <span className='linkdetailpage'><i className='fa fa-home'></i> Trang chủ / <a href=''>{item?.category?.name}</a></span>
                <h1 className='namedetail'>{item?.name}</h1>
                <div className='row'>
                <div className='col-sm-8'>
                    <img src={image} className='imagedetail'/>
                    <div className="listdmindex owl-2-style">
                        <Slider {...settings} className="owl-2">
                            <div onClick={()=>setImage(item?.image)}  className="media-29101">
                                <img src={item?.image} className="img-fluid" />
                            </div>
                            {images.map((img) => (
                                <div onClick={()=>setImage(img.image)} className="media-29101">
                                    <img src={img.image} className="img-fluid" />
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <div className='sectiondetail'>
                        <p><i class="fa fa-map-marker-alt" aria-hidden="true"></i> {item?.address}</p>
                        <p><i class="fa fa-calendar"></i> {item?.startDate} đến {item?.endDate}</p>
                        <p>Ngày hết hạn đăng ký: {item?.regisExpirationDate}</p>
                        <p><i class="fa fa-users"></i> Số người đã đăng ký: {item?.numRegistered} / {item?.maxParticipants}</p>
                    </div>
                    <div className='sectiondetail'>
                        <h3 className='lbsectiondetail'>Danh Sách Hướng Dẫn Viên</h3>
                        <div className='row'>
                        {item?.tourGuides?.map((tourGuide, index)=>{
                            return <div className='col-sm-3'>
                                <div className='singlehdv'>
                                    <img src={tourGuide.guide.avatar} className='imghdv'/>
                                    <p className='tenhdv'>{tourGuide.guide.fullName}</p>
                                </div>
                            </div>
                        })}
                        </div>
                    </div>
                    <div className='sectiondetail'>
                        <h3 className='lbsectiondetail'>Mô Tả Tour</h3>
                        <div id='motatour'>
                            <div dangerouslySetInnerHTML={{__html: item?.content}}></div>
                        </div>
                    </div>
                </div>
                <div className='col-sm-4'>
                    <div className='blockdangky'>
                        <p className='titlelichtrinh'>Lịch Trình và Giá Tour</p>
                        <p className='chonsove'>Chọn Số Vé và Xem Giá:</p>
                        <div className='blockchonnguoi'>
                            <div className='row'>
                                <div className='col-sm-4'>
                                    <span>Người lớn</span>
                                    <span className='sotuoive'> <span dangerouslySetInnerHTML={{__html:'>'}}></span> 10 tuổi</span>
                                </div>
                                <div className='col-sm-4'>
                                    <span className='giave'>{formatMoney(item?.priceAdults)}</span>
                                </div>
                                <div className='col-sm-4'>
                                    <div className='d-flex'>
                                        <button onClick={()=>tangGiamNguoiLon(-1)} className='btnactionsl'>-</button>
                                        <input className='inputslve' value={soNguoiLon} readOnly={true} />
                                        <button onClick={()=>tangGiamNguoiLon(1)} className='btnactionsl'>+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='blockchonnguoi'>
                            <div className='row'>
                                <div className='col-sm-4'>
                                    <span>Trẻ con</span>
                                    <span className='sotuoive'> <span dangerouslySetInnerHTML={{__html:'<'}}></span> 10 tuổi</span>
                                </div>
                                <div className='col-sm-4'>
                                    <span className='giave'>{formatMoney(item?.priceChildren)}</span>
                                </div>
                                <div className='col-sm-4'>
                                    <div className='d-flex'>
                                        <button onClick={()=>tangGiamTreCon(-1)} className='btnactionsl'>-</button>
                                        <input className='inputslve' value={soTreCon} readOnly={true}/>
                                        <button onClick={()=>tangGiamTreCon(1)} className='btnactionsl'>+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <table className='table tabletongtien'>
                            <tr>
                                <td>Tổng Giá Tour</td>
                                <td className='tongtientt'>{formatMoney(soNguoiLon * item?.priceAdults + soTreCon * item?.priceChildren)}</td>
                            </tr>
                        </table>

                        <button onClick={()=>datLich()} className='btndattour'>Yêu cầu đặt</button>
                    </div>
                </div>
            </div>
            </div>
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
export default Detail;
