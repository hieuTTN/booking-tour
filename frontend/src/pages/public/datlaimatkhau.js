import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logologin from '../../assest/images/loginimg.jpg'
import {postMethod} from '../../services/request'
import Swal from 'sweetalert2'

function DatLaiMatKhau(){

    function backToLogin(){
        window.location.href = 'login'
    }

    async function forgorPassword(event) {
        event.preventDefault();
        var password = event.target.elements.password.value
        var repassword = event.target.elements.repassword.value
        var uls = new URL(document.URL)
        var email = uls.searchParams.get("email");
        var key = uls.searchParams.get("key");
        if(password != repassword){
            toast.warning("Password not match");
            return;
        }
        const res = await postMethod('/api/user/public/finish-reset-pass?email=' + email+"&key="+key+"&password="+password)
        if (res.status < 300) {
            Swal.fire({
                title: "Thông báo",
                text: "Đặt lại mật khẩu thành công",
                preConfirm: () => {
                    window.location.replace("login")
                }
            });
        }
        if (res.status == 417) {
            var result = await res.json()
            toast.warning(result.defaultMessage);
        }
    }

    return(
        <div class="contentmain">
            <div class="loginform row" style={{  
                backgroundImage: "url(" + logologin + ")",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
                }}>
                <div class="col-sm-7">

                </div>
                <div class="contentlogin col-sm-5">
                <p class="titellogin">Chào mừng bạn đến với website du lịch!</p>
                <p class="plogintl"><span class="dangtl">QUÊN </span><span class="kytl">MẬT KHẨU</span></p>
                    <form autocomplete="on" class="inputloginform" onSubmit={forgorPassword}>
                        <input placeholder='Nhập mật khẩu mới' type='password' name='password' class="inputform"/>
                        <input placeholder='Xác nhận mật khẩu mới' type='password' name='repassword' class="inputform"/>
                        <button type="button" class="btnhuylogin" onClick={()=>backToLogin()}>HỦY</button>
                        <button type="submit" class="btntt">TIẾP TỤC</button>
                    </form>
                </div>
            </div>
        </div>
        
    );
}
export default DatLaiMatKhau;