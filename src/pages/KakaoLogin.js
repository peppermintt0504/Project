//import Library
import React from "react"
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate,useParams,useLocation } from "react-router-dom";

//import Actions
import { actionCreators as userActions } from "../redux/modules/user";

//import elements
import { Button, Grid, Input, Image, Text } from "../elements" 

//import Icon


// impot Component
import { getCookie,setCookie,deleteCookie } from "../shared/Cookie";

import instance from "../shared/Request";
import axios from "axios";

const kakao = axios.create({
	baseURL: "https://kauth.kakao.com",
        headers : {
                "content-type" : "application/x-www-form-urlencoded;charset=utf-8",
        }
});


const KakaoLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const router = useLocation();
    // 카카오에서 준 인증코드

    React.useEffect(() => {
        const data = {
            grant_type : "authorization_code",
            client_id : process.env.REACT_APP_KAKAO_CLIENT_ID,
            redirect_uri : "https://www.wewrite.co.kr/login/kakaoLogin",
            code : router.search.split('=')[1],
            client_secret : process.env.REACT_APP_KAKAO_CLIENT_SECRET,
        }

        
        const queryStringBody = Object.keys(data)
            .map(k=> encodeURIComponent(k)+"="+encodeURI(data[k]))
            .join("&")

        kakao({
            method : "post",
            url : "/oauth/token",
            data :queryStringBody,
            headers : {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            }
        }).then(res=>{
            instance({
                method : "post",
                url : "/login/kakaoLogin",
                data :{kakaoToken : res.data.access_token},
                headers : {
                }
            }).then(res=>{
                const token = res.headers.authorization;
                setCookie('WW_user',token);
                dispatch(userActions.check(token))
                navigate('/');
            });
        })

    }, [])



    return (
        <>
            카카오 로그인 중
        </>
    )
    }


export default KakaoLogin
