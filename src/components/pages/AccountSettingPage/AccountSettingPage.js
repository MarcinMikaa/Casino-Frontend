import axios from "axios"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AccountSettingPage = () => {

    const navigate = useNavigate();

    const getMe = () => {
        axios({
            method: 'GET',
            withCredentials: true,
            url: "http://localhost:4000/user/me"
        }).then((res) => {
            if(!res.data.email){
                navigate("/");
            }
        })
    }

    useEffect(() => {
        getMe();
    }, []);

    return(
        <p>AccountSettingPage</p>
    )

}

export default AccountSettingPage;