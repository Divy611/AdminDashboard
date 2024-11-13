import Users from "../Users/users"
import Dashboard from "../Dashboard/dashboard"

export const tabs = [
    { label: 'Dashboard', content: <Dashboard />, icon: <i class="fa-solid fa-house text-xl"></i> },
    { label: 'Users', content: <Users />, icon: <i class="fa-regular fa-user text-xl"></i> },
    { label: 'Orders', content: <></>, icon: <i class="fa-solid fa-cart-shopping text-xl"></i> },
];