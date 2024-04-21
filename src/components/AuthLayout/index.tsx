import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AppDispatch } from "../../redux/store";
import { fetchtask } from "../../redux/actions/taskAction";
import { fetchprofile } from "../../redux/actions/fetchprofile";

export const AuthLayout = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const authpath = ['/login', '/reset-password', '/forgot-password', '/register'];

    // // To change the title.
    const { pathname } = useLocation();
    useEffect(() => {
        const token = Cookies.get("accessToken");
        // const check = window.location.pathname.split("/").reverse()
        // const url = check.filter(
        //   (item: any) =>
        //     item !== "localhost:3000" && item !== "" && item !== "http:"
        // );


        if ((!authpath.includes(path) && !token)) {
            navigate('/login');
        }

    }, [pathname]);

    const path = window.location.pathname;
    useEffect(() => {
        const token = Cookies.get("accessToken");
        if (token) {
            dispatch(fetchprofile()).then((res: any) => {
                if(res.payload?.statusCode===200){
                dispatch(fetchtask())
                    .catch((error: any) => {
                        if (error.responseStatus === 401) {
                            navigate("/access-denied");
                        } else if (
                            !(path === "/forgot-password" || path === "/reset-password")
                        ) {
                            navigate("/login"); //For Verify Email
                        }
                    });
                }
            })

            if (path === "/login" || path === "/register") {
                navigate("/");
            }
        } else {
            if (!(path === "/forgot-password" || path === "/reset-password")) {
                navigate("/login"); //For Verify Email
            }
        }
    }, []);


    return <Outlet />;
};