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


var size = 9
var url = '';
function Home(){
    const [items, setItems] = useState([]);
    const [pageCount, setpageCount] = useState(0);
    useEffect(()=>{
      getTour();
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

  return(
    <div class="contentmain container">
      <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <a href="#"><img src={banner} class="d-block w-100"/></a>
            </div>
            <div class="carousel-item">
                <a href="#"><img src={banner} class="d-block w-100"/></a>
            </div>
            <div class="carousel-item">
                <a href="#"><img src={banner} class="d-block w-100"/></a>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
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
export default Home;
