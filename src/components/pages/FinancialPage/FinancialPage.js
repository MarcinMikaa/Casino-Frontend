import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FinancialPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/user/me",
    }).then((res) => {
      if (!res.data.userID) {
        navigate("/");
      }
    });
  }, []);

  return <p>AccountSettingPage</p>;
};

export default FinancialPage;
