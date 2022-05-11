import React,{useState,useEffect} from 'react';
import axios from 'axios';
import style from './LoanRequests.module.css';
import Card from './Card';
import { useSnackbar } from 'notistack';

const LoanRequests = () => {

  const [dataArr, setDataArr] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
    useEffect(()=>{
      try {
        const getdata = () => {
          // console.log("Hii")
          const atoken = window.localStorage.getItem("accessToken");
          const rtoken = window.localStorage.getItem("refreshToken");
          const id = window.localStorage.getItem("id");
          if (atoken) {
            const config = {
              headers: {
                Authorization: `Bearer ${atoken}`,
              },
            };
  
            Promise.resolve(
              axios.get(
               "https://apis.opdevelopers.live/api/getloans",config
              )
            )
              .then((res) => {

                console.log(res)
                setDataArr(res.data.loans)
                
                // handelOpenModal1()
                return;
              })
              .catch((error) => {
                // console.log("Helooo")
                if (error.response && error.response.status === 401) {
                  // console.log("Hellooo")
                  axios
                    .post(
                      "https://apis.opdevelopers.live/api/refresh",
                      {
                          refresh_token:rtoken
                      }
                    )
                    .then((res) => {
                      localStorage.setItem(
                        "access_token",
                        res.data.result.accessToken
                      );
                      localStorage.setItem(
                        "refresh_token",
                        res.data.result.refreshToken
                      );
                      getdata();
                      return;
                    })
                    .catch((error) => {
                      // reload()
                      enqueueSnackbar("You need to login first to view loan requests", {
                        variant: 'error',
                      });
                      window.localStorage.clear();
                      // dispatch(userLogout);
                      return;
                    });
                }
              });
          }else{
            // reload()
            enqueueSnackbar("You need to login first to view loan requests", {
               variant: 'error',
             });
            window.localStorage.clear();
       
            return
          }
        };
  
        getdata();
        return;
      } catch (error) {
        console.log(error);
        enqueueSnackbar("You need to login first to view loan requests", {
          variant: 'error',
        });
        return
        
      }
    },[])

    



  return (
    <>
      <div className={style.container}>
        {(dataArr==null) ? <h2 className={style.heading}>Currently there is no loan requests!</h2>:
        dataArr.map((currentData)=>{
          return <Card key={currentData.amount+currentData.tenure+currentData.rate+Math.random()} data={currentData}/>
        })}
        
      </div>
    </>
  );
}

export default LoanRequests;