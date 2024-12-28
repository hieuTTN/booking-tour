import styles from './header.scss';
import logo from '../../../assest/images/logo.svg';
import {getMethod} from '../../../services/request';
import { useState, useEffect } from 'react'
import Select from 'react-select';

function logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.replace('/login')
}

function Header (){
    const [danhmuc, setDanhMuc] = useState([]);
    useEffect(()=>{
        const getCategory = async() =>{
            var response = await getMethod('/api/category/public/find-all-quantity')
            var result = await response.json();
            setDanhMuc(result)
        };
        getCategory();
    }, []);
    var token = localStorage.getItem('token');
    var authen = <a href="login" class="pointermenu gvs menulink"><i class="fa fa-user"></i> Đăng ký/ Đăng nhập</a>
    if(token != null){
        authen = <span class="nav-item dropdown pointermenu gvs menulink">
                    <span class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-user"></i> Tài khoản</span>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="account">Tài khoản</a></li>
                        <li onClick={()=>logout()}><a class="dropdown-item" href="#">Đăng xuất</a></li>
                    </ul>
                </span>
    }
    return(
        <div id='menu'>
           <nav class="navbar navbar-expand-lg">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <a class="navbar-brand navbar-toggler" href="index"><img class="imglogo" src={logo}/></a>
                    <span>
                        <i data-bs-toggle="modal" data-bs-target="#modalsearch" class="fa fa-search navbar-toggler"></i>
                        <i class="fa fa-shopping-bag navbar-toggler"> <span class="slcartmenusm">0</span></i>
                    </span>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item"><a class="linktop" href='index'><img class="imglogo" src={logo}/></a></li>
                        <li class="nav-item"><a class="nav-link menulink" href="index">Trang chủ</a></li>
                        <li class="nav-item"><a class="nav-link menulink" href="booking-room">Giới thiệu</a></li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle menulink" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Tour du lịch
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                {danhmuc.map((item=>{
                                    return <li><a class="dropdown-item" href={'tim-tour?category='+item.id}>{item.name}</a></li>
                                }))}
                            </ul>
                        </li>
                    </ul>
                    <div class="d-flex right10p">
                        {authen}
                    </div>
                    <div class="d-flex right10p">
                        <a href="tel:1900%201833" class="phonemenu"><i class="fa fa-phone"></i> 1900 1833</a>
                    </div>
                    <div class="d-flex">
                        <a target='_blank' href="https://www.facebook.com/profile.php?id=100010580581303" class="linkidmenu"><i class="fab fa-facebook icmenu pointer"></i></a>
                        <a href="" class="linkidmenu"><i class="fab fa-youtube icmenu pointer"></i></a>
                        <a href="" class="linkidmenu"><i class="fab fa-instagram pointer"></i></a>
                    </div>
                    </div>
                </div>
            </nav>
        </div>
    );

    
}

export default Header;