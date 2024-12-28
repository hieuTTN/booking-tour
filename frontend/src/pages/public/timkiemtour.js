import Header from '../../layout/user/header/header'
import Footer from '../../layout/user/footer/footer'
import banner from '../../assest/images/banner.jpg'
import indeximg from '../../assest/images/index1.jpg'
import index2img from '../../assest/images/index2.jpg'
import {getMethod} from '../../services/request'
import {formatMoney} from '../../services/money'
import { useState, useEffect } from 'react'
import { Parser } from "html-to-react";
import ReactPaginate from 'react-paginate';
import Select from 'react-select';
import { Button, Card, Col, DatePicker, Input, Pagination, Row, Table } from "antd";

var size = 9
var url = '';
const { RangePicker } = DatePicker;
function TimKiemTour(){
    const [items, setItems] = useState([]);
    const [pageCount, setpageCount] = useState(0);
    const [danhmuc, setDanhMuc] = useState([]);
    const [selectDanhMuc, setselectDanhMuc] = useState([]);
    const [selectPrice, setSelectPrice] = useState(null);
    const [priceRange, setPriceRange] = useState([]);

    useEffect(()=>{
        getTour();
        const getCategory = async() =>{
            var response = await getMethod('/api/category/public/find-all-quantity')
            var result = await response.json();
            setDanhMuc(result)
            var uls = new URL(document.URL)
            var id = uls.searchParams.get("category");
            var arr = []
            result.forEach((p)=>{
                if(p.id == id){
                    arr.push(p)
                }
            })
            setselectDanhMuc(arr)
        };
        getCategory();

        setPriceRange(listGia)
  }, []);

  const getTour = async() =>{
      var uls = '/api/tour/public/find-all-by-user?&size='+size+'&sort=id,desc&page='
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

const changePrice = (selectedOptions) => {
    setSelectPrice(selectedOptions);
};

function onDateChange(dates, dateStrings){
    console.log(dates);
    console.log(dateStrings);
}

return(
    <div class="contentmain container">
        <div class="container custom-container-search">
        <form action="timkiem" class="searchmain col-sm-12">
            <div class="row" style={{paddingBottom:'20px'}}>
                <div className='col-sm-4'></div>
                <div className='col-sm-4'>
                <RangePicker
                    style={{ width: "100%" }}
                    format="YYYY-MM-DD"
                    placeholder={["Từ ngày", "Đến ngày"]}
                    onChange={onDateChange}
                />
                </div>
                <div className='col-sm-4'></div>
            </div>
            <div class="searchmain-bottom">
                <div class="row">
                    <div class="col-sm-3">
                        <Select
                            id='mucgia'
                            options={priceRange}
                            value={selectPrice}
                            onChange={changePrice}
                            getOptionLabel={(option) => option.name} 
                            getOptionValue={(option) => option.price}    
                            closeMenuOnSelect={false}
                            name='mucgia'
                            placeholder="Chọn mức giá"
                        />
                    </div>
                    <div class="col-sm-6"> 
                        <Select
                            className="select-container" 
                            isMulti
                            value={selectDanhMuc}
                            onChange={setselectDanhMuc}
                            options={danhmuc}
                            getOptionLabel={(option) => option.name} 
                            getOptionValue={(option) => option.id}    
                            closeMenuOnSelect={false}
                            name='category'
                            placeholder="Chọn loại tour"
                        />
                    </div>
                    <div class="col-sm-3">
                        <button class="sendem btnsearchtop form-control select-container">Tìm kiếm</button>
                    </div>
                </div>
            </div>
        </form>
    </div>

      <section>
        <p class="title-section"><span>TOUR DU LỊCH HẤP DẪN</span></p>
        <div class="row" id="listblogindex">
          
          {items.map((item, index)=>{
              return <div class="col-sm-4 singleblog">
                <div class="singletour">
                  <a href={"tourdetail?id="+item.id}>
                    <img src={item.image} class="imgtour"/>
                    <div class="contentbl">
                      <span href={"blogdetail?id="+item.id} class="titletour">{item.name}</span>
                      <span class="desblog"><i class="fa fa-quote-left" aria-hidden="true"></i> {item.description}</span>
                      <span class="blogdate"><i class="fa fa-map-marker-alt" aria-hidden="true"></i> {item.address}</span>
                    </div>
                    <div className='divgiatour'>
                      <span className='songay'>{calBwDate(item.startDate, item.endDate)}N</span>
                      <button className='btn-dang'>{formatMoney(item.priceAdults)}</button>
                    </div>
                  </a>
                </div>
            </div>
          })}
        </div>

        <div style={{marginTop:'30px'}}>
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
      </section>


      <section class="desindexs">
        <div class="row">
          <div class="col-sm-6 singimgsindex">
            <img src={indeximg} class="imgindex"/>
          </div>
          <div class="col-sm-6 singimgsindex">
            <img src={index2img} class="imgindex"/>
          </div>
        </div>
      </section>

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


var listGia = 
[
    {
        price:"0-100000000000000",
        name:"Tất cả khoảng giá"
    },
    {
        price:"0-999999",
        name:"Dưới 1 triệu"
    },
    {
        price:"1000000-2000000",
        name:"1 đến 1 triệu"
    },
    {
        price:"2000000-4000000",
        name:"2 đến 4 triệu"
    },
    {
        price:"4000000-8000000",
        name:"4 đến 8 triệu"
    },
    {
        price:"8000000-20000000",
        name:"8 đến 20 triệu"
    },
    {
        price:"20000000-30000000",
        name:"20 đến 30 triệu"
    },
    {
        price:"30000000-1000000000000",
        name:"Trên 30 triệu"
    },
]
export default TimKiemTour;
