import layoutAdmin from '../layout/admin/Layout'
import layoutLogin from '../layout/user/loginlayout/login'

//admin
import userAdmin from '../pages/admin/user'
import AdminCateory from '../pages/admin/category'
import AdminBooking from '../pages/admin/booking'


//public
import login from '../pages/public/login'
import regis from '../pages/public/regis'
import PublicForgot from '../pages/public/forgot'
import confirm from '../pages/public/confirm'
import DatLaiMatKhau from '../pages/public/datlaimatkhau'

const publicRoutes = [
    { path: "/login", component: login, layout: layoutLogin },
    { path: "/regis", component: regis, layout: layoutLogin },
    { path: "/forgot", component: PublicForgot, layout: layoutLogin},
    { path: "/confirm", component: confirm, layout: layoutLogin},
    { path: "/datlaimatkhau", component: DatLaiMatKhau, layout: layoutLogin},
];

const adminRoutes = [
    { path: "/admin/user", component: userAdmin, layout: layoutAdmin },
    { path: "/admin/category", component: AdminCateory, layout: layoutAdmin },
    { path: "/admin/booking", component: AdminBooking, layout: layoutAdmin },
];



export { publicRoutes, adminRoutes};
