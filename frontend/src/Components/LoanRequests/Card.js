import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import style from './Card.module.css';
import cardImage from "../../Assets/cardImage.jpg"
import { useSnackbar } from 'notistack';
const API_URL = process.env.REACT_APP_API_URL;

const Card = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const [openModal1, setOpenModal1] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);
    const [openModal3, setOpenModal3] = useState(false);
    const [message, Message3] = useState(false);
    const id = window.localStorage.getItem("id");

    const handelOpenModal1 = (e) => {
        e.preventDefault();
        const getdata = () => {
            const atoken = window.localStorage.getItem("accessToken");
            const rtoken = window.localStorage.getItem("refreshToken");
            if (atoken) {
                const config = {
                    headers: {
                        Authorization: `Bearer ${atoken}`,
                    },
                };
                const data = {
                    lendersId: id,
                    loanId: props.data._id
                }
                Promise.resolve(
                    axios.post(
                        API_URL + "loanrequest/accept", data, config
                    )
                )
                    .then((res) => {
                        console.log(res)
                        enqueueSnackbar("Loan accepted successfully.", {
                            variant: 'success',
                        });
                        // handelOpenModal1()
                        return;
                    })
                    .catch((error) => {
                        if (error.response && error.response.status === 401) {
                            axios
                                .post(
                                    "https://apis.opdevelopers.live/api/refresh",
                                    {
                                        refresh_token: rtoken
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
                                    enqueueSnackbar("You need to login first !", {
                                        variant: 'error',
                                    });
                                    window.localStorage.clear();
                                    // dispatch(userLogout);
                                    return;
                                });
                        }
                    });
            } else {
                // reload()
                enqueueSnackbar("You need to login first to view loan requests", {
                    variant: 'error',
                });
                window.localStorage.clear();
                return;
            }
        };
        getdata();
        setOpenModal1(!openModal1);
    }
    const handelOpenModal2 = (e) => {
        e.preventDefault();
        const getdata = () => {
            const atoken = window.localStorage.getItem("accessToken");
            const rtoken = window.localStorage.getItem("refreshToken");
            if (atoken) {
                const config = {
                    headers: {
                        Authorization: `Bearer ${atoken}`,
                    },
                };
                const data = {
                    lendersId: id,
                    loanId: props.data._id,
                    message: message
                }
                Promise.resolve(
                    axios.post(
                        API_URL + "loanrequest/reject", data, config
                    )
                )
                    .then((res) => {
                        console.log(res)
                        enqueueSnackbar("Loan reject successfully.", {
                            variant: 'success',
                        });
                        // handelOpenModal1()
                        return;
                    })
                    .catch((error) => {
                        if (error.response && error.response.status === 401) {
                            axios
                                .post(
                                    "https://apis.opdevelopers.live/api/refresh",
                                    {
                                        refresh_token: rtoken
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
                                    enqueueSnackbar("You need to login first !", {
                                        variant: 'error',
                                    });
                                    window.localStorage.clear();
                                    // dispatch(userLogout);
                                    return;
                                });
                        }
                    });
            } else {
                // reload()
                enqueueSnackbar("You need to login first to view loan requests", {
                    variant: 'error',
                });
                window.localStorage.clear();
                return;
            }
        };
        getdata();
        setOpenModal2(!openModal2);
    }
    const handelOpenModal3 = (e) => {
        e.preventDefault();
        const getdata = () => {
            const atoken = window.localStorage.getItem("accessToken");
            const rtoken = window.localStorage.getItem("refreshToken");
            if (atoken) {
                const config = {
                    headers: {
                        Authorization: `Bearer ${atoken}`,
                    },
                };
                const data = {
                    lendersId: id,
                    loanId: props.data._id,
                    message: message
                }
                Promise.resolve(
                    axios.post(
                        API_URL + "loanrequest/negotiation", data, config
                    )
                )
                    .then((res) => {
                        console.log(res)
                        enqueueSnackbar("Loan negotiation send successfully.", {
                            variant: 'success',
                        });
                        // handelOpenModal1()
                        return;
                    })
                    .catch((error) => {
                        if (error.response && error.response.status === 401) {
                            axios
                                .post(
                                    "https://apis.opdevelopers.live/api/refresh",
                                    {
                                        refresh_token: rtoken
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
                                    enqueueSnackbar("You need to login first !", {
                                        variant: 'error',
                                    });
                                    window.localStorage.clear();
                                    // dispatch(userLogout);
                                    return;
                                });
                        }
                    });
            } else {
                // reload()
                enqueueSnackbar("You need to login first to view loan requests", {
                    variant: 'error',
                });
                window.localStorage.clear();
                return;
            }
        };
        getdata();
        setOpenModal3(!openModal3);
    }

    return (
        <>
            <div className={style.card}>
                <div className={style.imageContainer}>
                    <img src={cardImage} className={style.cardImage} alt='cardImage' />
                </div>

                <table className={style.table}>
                    <tr className={style.tableRow}>
                        <td className={style.tableData}>Amount</td>
                        <td className={style.tableData}>{props.data.loanAmount}</td>
                    </tr>
                    <tr className={style.tableRow}>
                        <td className={style.tableData}>Tenure</td>
                        <td className={style.tableData}>{props.data.tenure}</td>
                    </tr>
                    <tr className={style.tableRow}>
                        <td className={style.tableData}>Interest Rate</td>
                        <td className={style.tableData}>{props.data.intRate}</td>
                    </tr>
                </table>
                {/* <div className={style.item}>Amount : {props.data.amount}</div>
                <div className={style.item}>Tenure : {props.data.Tenure :}</div>
                <span className={style.item}>Interest Rate : {props.data.rate}</span> */}

                <div className={style.row}>
                    <div className={style.modalContainer}>
                        <button onClick={handelOpenModal1} className={`${style.btn} ${style.acceptBtn}`}>Accept</button>
                        <div className={`${style.modal} ${(openModal1) ? (style.visible) : (style.hide)}`}>
                            <div className={style.modalContent}>
                                <h3 className={style.modalHeading}>Do you really want to accept the loan request?</h3>
                                <form className={style.form}>
                                    <textarea className={style.textarea} name="acceptMessage" id="acceptMessage" cols="40" rows="10" placeholder='Enter your message (Optional)'></textarea>
                                    <div className={style.modalFooter}>
                                        <button type='submit' onClick={handelOpenModal1} className={`${style.btn} ${style.submitBtn}`}>Submit</button>
                                        <button onClick={handelOpenModal1} className={`${style.btn} ${style.cancelBtn}`}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    {/* <div className={style.modalContainer}>
                        <button onClick={handelOpenModal2} className={`${style.btn} ${style.rejectBtn}`}>Reject</button>
                        <div className={`${style.modal} ${(openModal2) ? (style.visible) : (style.hide)}`}>
                            <div className={style.modalContent}>
                                <h3 className={style.modalHeading}>Do you really want to reject the loan request?</h3>
                                <form className={style.form}>
                                    <textarea className={style.textarea} name="rejectMessage" id="rejectMessage" cols="40" rows="10" placeholder='Enter your message (Optional)'></textarea>
                                    <div className={style.modalFooter}>
                                        <button type='submit' onClick={handelOpenModal2} className={`${style.btn} ${style.submitBtn}`}>Submit</button>
                                        <button onClick={handelOpenModal2} className={`${style.btn} ${style.cancelBtn}`}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div> */}
                    <div className={style.modalContainer}>
                        <button onClick={handelOpenModal3} className={`${style.btn} ${style.modifyBtn}`}>Modify</button>
                        <div className={`${style.modal} ${(openModal3) ? (style.visible) : (style.hide)}`}>
                            <div className={style.modalContent}>
                                <h3 className={style.modalHeading}>Modify the loan request.</h3>
                                <form className={style.form}>
                                    <input className={style.modalInput} name='modifiedTenure' type="text" placeholder='Enter modified tenure (in months)' />
                                    <input className={style.modalInput} name='modifiedRate' type="text" placeholder='Enter modified interest rate (in %)' />
                                    <textarea className={style.textarea} name="rejectMessage" id="rejectMessage" cols="40" rows="10" placeholder='Enter your message (Optional)'></textarea>
                                    <div className={style.modalFooter}>
                                        <button type='submit' onClick={handelOpenModal3} className={`${style.btn} ${style.submitBtn}`}>Submit</button>
                                        <button onClick={handelOpenModal3} className={`${style.btn} ${style.cancelBtn}`}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
               

            <div className={style.row}>
                <Link to={`/publicProfile/${props.data.customerId}`} className={style.knowDiv}>
                  <button className={style.btnKnow}>Know about the Debter</button>
                </Link>
            </div>
        </div>
    </>
  );
}

export default Card;