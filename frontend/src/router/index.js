import layoutAdmin from '../layout/admin/Layout'
import layoutLogin from '../layout/user/loginlayout/login'

//admin
import userAdmin from '../pages/admin/user'
import AdminCateory from '../pages/admin/category'
import AdminGuide from '../pages/admin/guide'
import AdminAddGuide from '../pages/admin/addguide'
import AdminAddTour from '../pages/admin/addtour'
import AdminTour from '../pages/admin/tour'


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
    { path: "/admin/guide", component: AdminGuide, layout: layoutAdmin },
    { path: "/admin/add-guide", component: AdminAddGuide, layout: layoutAdmin },
    { path: "/admin/add-tour", component: AdminAddTour, layout: layoutAdmin },
    { path: "/admin/tour", component: AdminTour, layout: layoutAdmin },
];



export { publicRoutes, adminRoutes};
