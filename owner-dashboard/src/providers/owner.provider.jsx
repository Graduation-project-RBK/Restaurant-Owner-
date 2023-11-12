import { Outlet, Navigate } from "react-router-dom";


const ProtectedRouteOwner = ({ isAllowed, redirectPath = '/login', children }) => {


    console.log(isAllowed);
    if (!isAllowed) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRouteOwner;