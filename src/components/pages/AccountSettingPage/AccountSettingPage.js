import axios from "axios"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AccountSettingPage = () => {

    const navigate = useNavigate();

    useEffect(() => {
        axios({
          method: 'GET',
          withCredentials: true,
          url: "http://localhost:4000/user/me"
        }).then((res) => {
            if(!res.data.email){
                navigate("/");
            }
        })
      }, []);

    return(
        <p>AccountSettingPage</p>
    )

}

export default AccountSettingPage;