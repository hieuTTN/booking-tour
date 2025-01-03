import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logologin from '../../assest/images/loginimg.jpg'
import {postMethod} from '../../services/request'
import Swal from 'sweetalert2'

function PublicForgot(){

    function backToLogin(){
        window.location.href = 'login'
    }

    async function forgorPassword(event) {
        event.preventDefault();
        var email = document.getElementById("email").value
        const res = await postMethod('/api/user/public/init-forgotpasss?email=' + email)
        if (res.status < 300) {
            Swal.fire({
                title: "Thông báo",
                text: "Kiểm tra email của bạn",
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
                        <input id="email" placeholder="Nhập email" class="inputform"/>
                        <button type="button" class="btnhuylogin" onClick={()=>backToLogin()}>HỦY</button>
                        <button type="submit" class="btntt">TIẾP TỤC</button>
                    </form>
                </div>
            </div>
        </div>
        
    );
}
export default PublicForgot;