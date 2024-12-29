import lich from '../../assest/images/lich.png'
import avatar from '../../assest/images/user.svg'
import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getMethod, postMethod, urlGlobal } from '../../services/request';

function Header({ children }){
     // Ensure useLocation is called at the top level of the component
     const location = useLocation();

     // Function to check if the current path matches the given pathname
     const isActive = (pathname) => {
         for(var i=0; i<pathname.length; i++){
            if(location.pathname === pathname[i]){
                return 'activenavbar';
            }
         }
         return '';
     };
     
    const [isCssLoaded, setCssLoaded] = useState(false);
    useEffect(()=>{
        checkAdmin();
        import('../admin/layout.scss').then(() => setCssLoaded(true));
    }, []);
    if (!isCssLoaded) {
        return <></>
    }


    var user = window.localStorage.getItem("user")
    if(user != null){
        user = JSON.parse(user);
    }

    function openClose(){
        document.getElementById("sidebar").classList.toggle("toggled");
        document.getElementById("page-content-wrapper").classList.toggle("toggled");
        document.getElementById("navbarmain").classList.toggle("navbarmainrom");
    }

    return(
        <div class="d-flex" id="wrapper">
        <nav id="sidebar" class="bg-dark">
            <div class="sidebar-header p-3 text-white">
                <h3>Admin <i class="fa fa-bars pointer" id="iconbaradmin" onClick={openClose}></i></h3> 
            </div>
            <ul class="list-unstyled components">
                <li className={isActive("/admin/index")}>
                    <a href="/" class="text-white text-decoration-none">
                        <i class="fa fa-home"></i> Trang chủ
                    </a>
                </li>
                <li className={isActive(["/admin/user"])}>
                    <a href="#coltaikhoan" data-bs-toggle="collapse" aria-expanded="false" class="dropdown-toggle text-white text-decoration-none">
                        <i class="fa fa-user"></i> Tài khoản
                    </a>
                    <ul class="collapse list-unstyleds" id="coltaikhoan">
                        <li class="nav-item">
                            <a href="user" class="text-white text-decoration-none ps-4"><i class="fa fa-list"></i> Danh sách tài khoản</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="text-white text-decoration-none ps-4"><i class="fa fa-plus"></i> Thêm tài khoản</a>
                        </li>
                    </ul>
                </li>
                <li className={isActive(["/admin/category"])}>
                    <a href="category" class="text-white text-decoration-none">
                        <i class="fa fa-list"></i> Danh mục
                    </a>
                </li>
                <li className={isActive(["/admin/tour", "/admin/add-tour"])}>
                    <a href="#dashboardSubmenu" data-bs-toggle="collapse" aria-expanded="false" class="dropdown-toggle text-white text-decoration-none">
                        <i class="fa fa-home"></i> Tour du lịch
                    </a>
                    <ul class="collapse list-unstyleds" id="dashboardSubmenu">
                        <li class="nav-item">
                            <a href="tour" class="text-white text-decoration-none ps-4"><i class="fa fa-list"></i> Danh sách tour</a>
                        </li>
                        <li class="nav-item">
                            <a href="add-tour" class="text-white text-decoration-none ps-4"><i class="fa fa-plus"></i> Thêm tour</a>
                        </li>
                    </ul>
                </li>
                <li className={isActive(["/admin/guide", "/admin/add-guide"])}>
                    <a href="#dashboardSubmenu1" data-bs-toggle="collapse" aria-expanded="false" class="dropdown-toggle text-white text-decoration-none">
                        <i class="fa fa-users"></i> Hướng dẫn viên
                    </a>
                    <ul class="collapse list-unstyleds" id="dashboardSubmenu1">
                        <li class="nav-item">
                            <a href="guide" class="text-white text-decoration-none ps-4"><i class="fa fa-list"></i> Danh sách hướng dẫn viên</a>
                        </li>
                        <li class="nav-item">
                            <a href="add-guide" class="text-white text-decoration-none ps-4"><i class="fa fa-plus"></i> Thêm hướng dẫn viên</a>
                        </li>
                    </ul>
                </li>
                <li className={isActive(["/admin/booking"])}>
                    <a href="booking" class="text-white text-decoration-none">
                        <i class="fa fa-flag"></i> Đặt tour
                    </a>
                </li>
                <li>
                    <a href="#" onClick={logout} class="text-white text-decoration-none">
                        <i class="fa fa-sign-out"></i> Đăng xuất
                    </a>
                </li>
            </ul>
        </nav>

        <div id="page-content-wrapper" class="w-100">
            <nav id='navbarmain' class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                <div class="container-fluid">
                    <button class="btn btn-link" id="menu-toggle"><i class="fas fa-bars" onClick={openClose}></i></button>
                    <div class="dropdown ms-auto">
                        <a class="nav-link dropdown-toggle position-relative" href="#" role="button" id="notificationDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-bell"></i>
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                0
                            </span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="notificationDropdown">
                            <div className='bottomthongbao'>
                                <li><a class="dropdown-item" href="#"><i className='fa fa-check'></i> Đánh dấu tất cả là đã đọc</a></li>
                                <li><a class="dropdown-item" href="thong-bao"><i className='fa fa-eye'></i> Xem tất cả thông báo</a></li>
                            </div>
                        </ul>
                    </div>
            
                    <div class="dropdown ms-3">
                        <a class="dropdown-toggle d-flex align-items-center text-decoration-none" href="#" role="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            <span class="navbar-text me-2">{user?.username}</span>
                            {/* <img src={user?.avatar} class="rounded-circle" alt="User Avatar"/> */}
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                            <li><a class="dropdown-item" href="#">Update Info</a></li>
                            <li onClick={logout}><a class="dropdown-item" href="#">Logout</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div class="container-fluid py-4" id='mainpageadmin'>
                {children}
            </div>
        </div>
    </div>
    );
}

async function checkAdmin(){
    const response = await getMethod('/api/user/admin/check-role-admin')
    if (response.status > 300) {
        window.location.replace('../login')
    }
}


function logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.replace('../login')
}

export default Header;