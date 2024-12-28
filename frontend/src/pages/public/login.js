import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logologin from '../../assest/images/loginimg.jpg'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import {postMethodPayload, postMethodTextPlan} from '../../services/request'
import Swal from 'sweetalert2'

async function handleLogin(event) {
    event.preventDefault();
    const payload = {
        username: event.target.elements.username.value,
        password: event.target.elements.password.value
    };
    const res = await postMethodPayload('/api/user/login/email', payload);
    
    var result = await res.json()
    console.log(result);
    if (res.status == 417) {
        if (result.errorCode == 300) {
            Swal.fire({
                title: "Thông báo",
                text: "Tài khoản chưa được kích hoạt, đi tới kích hoạt tài khoản!",
                preConfirm: () => {
                    window.location.href = 'confirm?email=' + event.target.elements.username.value
                }
            });
        } else {
            toast.warning(result.defaultMessage);
        }
    }
    if(res.status < 300){
        processLogin(result.user, result.token)
    }
};

async function processLogin(user, token) {
    toast.success('Đăng nhập thành công!');
    await new Promise(resolve => setTimeout(resolve, 1500));
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    if (user.authorities.name === "ROLE_ADMIN") {
        window.location.href = 'admin/thong-ke';
    }
    if (user.authorities.name === "ROLE_USER") {
        window.location.href = '/';
    }
}


function login(){
    const handleLoginSuccess = async (accessToken) => {
        console.log(accessToken);
        
        var response = await postMethodTextPlan('/api/user/login/google',accessToken.credential)
        var result = await response.json();
        if (response.status < 300) {
            processLogin(result.user, result.token)
        }
        if (response.status == 417) {
            toast.warning(result.defaultMessage);
        }
    };
    
    const handleLoginError = () => {
        toast.error("Đăng nhập google thất bại")
    };

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
                    <p class="plogintl"><span class="dangtl">ĐĂNG </span><span class="kytl">NHẬP</span></p>
                    <form autocomplete="on" class="inputloginform" onSubmit={handleLogin}>
                        <input name="username" id="username" placeholder="Email" class="inputform" />
                        <input name="password" required id="password" placeholder="Mật khẩu" class="inputform" type="password"/>
                        <button type="submit" class="btndn">Đăng Nhập</button>
                        <hr class="custom-hr"/>
                    <p className='text-center text-white'>Hoặc đăng nhập với google</p>
                    <GoogleOAuthProvider clientId="480686365968-vd7kfmp8pe6oqussr5gku2am5alicv7s.apps.googleusercontent.com">
                    <div className='divcenter' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <GoogleLogin
                        onSuccess={handleLoginSuccess}
                        onError={handleLoginError}
                    />
                    </div>
                    </GoogleOAuthProvider>
                        <p class="linkquenmk"><a href="forgot" class="aquenmk">Quên mật khẩu</a></p>
                        <p class="nothvaccount"><span>Bạn chưa có tài khoản? </span><a href="regis" class="aquenmk">Đăng ký ngay</a></p>
                    </form>
                </div>
            </div>
        </div>
        
    );
}
export default login;