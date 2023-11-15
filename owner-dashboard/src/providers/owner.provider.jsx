import { Outlet, Navigate } from "react-router-dom";


const ProtectedRouteOwner = ({ isAllowed, redirectPath = '/home', children }) => {


    console.log(isAllowed);
    if (!isAllowed) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRouteOwner;