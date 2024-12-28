import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logologin from '../../assest/images/loginimg.jpg'
import Swal from 'sweetalert2'
import {postMethodPayload} from '../../services/request'

async function handleRegis(event) {
    event.preventDefault();
    // if(event.target.elements.password.value != event.target.elements.repassword.value){
    //     toast.error("Mật khẩu không trùng khớp");
    //     return;
    // }
    const payload = {
        email: event.target.elements.email.value,
        password: event.target.elements.password.value,
        fullname: event.target.elements.fullname.value,
        phone: event.target.elements.phone.value,
    };
    const res = await postMethodPayload('/api/user/regis',payload)
    var result = await res.json()
    console.log(result);
    if (res.status == 417) {
        toast.error(result.defaultMessage);
    }
    if(res.status < 300){
        Swal.fire({
            title: "Thông báo",
            text: "Đăng ký thành công, kiểm tra email của bạn!",
            preConfirm: () => {
                window.location.href = 'confirm?email=' + result.email
            }
        });
    }
};


function regis(){
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
                <p class="plogintl"><span class="dangtl">ĐĂNG </span><span class="kytl">KÝ</span></p>
                    <form autocomplete="off" class="inputloginform" onSubmit={handleRegis}>
                        <input name="fullname" placeholder="Họ tên" class="inputform" />
                        <input name="phone" placeholder="Số điện thoại" class="inputform"/>
                        <input name="email" placeholder="Địa chỉ email" class="inputform" type="email" required/>
                        <input name="password" placeholder="Mật khẩu" class="inputform" type="password" required/>
                        <button class="btndn">Đăng Ký</button>
                        <p class="nothvaccount"><span>Bạn đã có tài khoản? </span><a href="login" class="aquenmk">Đăng nhập ngay</a></p>
                    </form>
                </div>
            </div>
        </div>
        
    );
}
export default regis;