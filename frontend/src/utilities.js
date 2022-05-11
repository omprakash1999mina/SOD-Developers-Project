/*import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
const getRefreshToken = (refreshToken) => {
  // if (error.response && error.response.status === 401) {
    const newConfig = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const data = {
        refresh_token: refreshToken,
    };
    axios.post(API_URL + "refresh", data, newConfig).then((res) => {
        console.log(res);
        const new_refresh_token = res.data.access_token;

        localStorage.setItem("accessToken", new_refresh_token);
        // console.log("level 4");
        getData();

        //   return new_refresh_token;
    }).catch((error) => {
        console.log(error);
        console.log("log out");
        window.localStorage.clear();
        // dispatch(userLogout);
        //   return false;

        // const ok = getRefreshToken(refreshToken)
        // if(ok){
        //   getData();
        // }
    });
  // }
};
export default getRefreshToken; */
