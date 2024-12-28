import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logologin from '../../assest/images/loginimg.jpg'
import Swal from 'sweetalert2'
import {postMethod} from '../../services/request'

async function handleConfirm(event) {
    event.preventDefault();
    var uls = new URL(document.URL)
    var email = uls.searchParams.get("email");
    var key = event.target.elements.key.value
    const res = await postMethod('/api/user/active-account?email=' + email + '&key=' + key);
    if (res.status == 417) {
        var result = await res.json()
        toast.error(result.defaultMessage);
    }
    if(res.status < 300){
        Swal.fire({
            title: "Thông báo",
            text: "Xác thực thành công!",
            preConfirm: () => {
                window.location.href = 'login'
            }
        });
    }
};

function backToLogin(){
    window.location.href = 'login'
}

function confirm(){
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
                    <form autocomplete="off" class="inputloginform" onSubmit={handleConfirm}>
                        <input name="key" placeholder="Nhập mã xác thực" class="inputform"/>
                        <button type="button" class="btnhuylogin" onClick={()=>backToLogin()}>HỦY</button>
                        <button type="submit" class="btntt">Xác thực</button>
                    </form>
                </div>
            </div>
        </div>
        
    );
}
export default confirm;