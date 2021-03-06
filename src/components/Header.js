//import Library
import React from "react"
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode,EffectCoverflow } from "swiper";

import LoginBanner from "./LoginBanner";

//import elements
import {  Grid, Image, Text } from "../elements" 

//import Mui
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal';


// 소켓 통신
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { getCookie } from "../shared/Cookie";

//import Actions
import { actionCreators as userActions } from '../redux/modules/user';
import { actionCreators as staticActions } from '../redux/modules/static';



const Header = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const _user = useSelector(state => state.user);
    const _post = useSelector(state => state.post);
    // console.log(_user)
    // console.log(_post)

    const alrt = useSelector(state => state.static.LoginModal);
    // console.log(alrt);


    //socket
    const sock = new SockJS(`${process.env.REACT_APP_DATABASE_BASEURL}ws-stomp`);
    const ws = Stomp.over(sock);
    const token = getCookie('WW_user');

    var headers = {
        Authorization: token
    };

    function wsConnectSubscribe() {
        try {
            ws.connect(headers, () => {
                ws.subscribe(
                    // websocket 구독 url 콜백함수 header 
                    `/sub/alarm/${_user.user.userKey}`,
                    (data) => {
                        dispatch(userActions.Alrt())
                    },
                    headers
                );
                dispatch(userActions.subNoti(true));
            });
            
        } catch (error) {
            console.log(error);
        }
    }

    function wsDisConnectUnsubscribe() {
        try {
            ws.disconnect(() => {
                ws.unsubscribe("sub-0");
            }, headers);
            dispatch(userActions.subNoti(false));
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(async() => {
        if(!_user.is_login){
            dispatch(userActions.check());
        }
        if(_user.is_login & !_user.sub){
            wsConnectSubscribe()
        }
    },[_user.is_login]);

    const [categoryopen, setCategoryOpen] = React.useState(false);
    const handleOpen = () => {
        setCategoryOpen(true)
    };
        
    const handleClose = () => {
        setCategoryOpen(false);
}
    const loginAlrt = () => {

        dispatch(staticActions.idCheck());
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '300px',
        height: '600px',
        borderRadius:'5px',
        boxShadow: 24,
        p: 4,
    };

    const checkNotice = () =>{
        dispatch(userActions.AlrtCheck());
        setTimeout(()=>{navigate('/notice')},500);
    }

    if(props.isMain)
    return(
            <Grid >
                <LoginBanner hide={alrt}/>
                <Grid zIndex='9' position="absolute" top="0px"  backgroundColor="#F9FAFBBB" is_flex alignItems="center" justifyContent='space-between' boxSizing="border-box" padding="0" width ="100vw" minWidth ="360px" maxWidth ="420px" height='60px' margin='0'  >
                    <Grid margin='10px' backgroundColor="#F9FAFB00" is_flex border="0">
                        <Image onClick={handleOpen} width='30px' height='30px' src="/Icon/menu_p.png"></Image>
                        <Modal
                            open={categoryopen}
                            onClose={handleClose}
                        >   
                        <>
                            <Image onClick={handleClose} width='30px' zIndex='2' position='absolute' top='50%' left='50%' transform='translate(-150px,-300px)' height='30px' src='/Icon/X.png'/>
                            <Grid is_flex justifyContent='center' alignItems='center' {...style}>
                                <Swiper
                                    direction={"vertical"}
                                    style={{height : '500px', width : '120px',margin : '10px'}}
                                    slidesPerView={6}
                                    spaceBetween={0}
                                    freeMode={true}
                                    loop={true}
                                    grabCursor={true}
                                    effect={"coverflow"}
                                    coverflowEffect={{
                                        rotate: 10,
                                        stretch: 5,
                                        depth: 100,
                                        modifier: 1,
                                        slideShadows: false,
                                    }}
                                    
                                    modules={[FreeMode, EffectCoverflow]}
                                    className="mySwiper"
                                    >
                                        <SwiperSlide>
                                            <Text onClick={(e)=>navigate('/themepage/스릴러')}>스릴러</Text>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <Text onClick={(e)=>navigate('/themepage/공포')}>공포</Text>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <Text onClick={(e)=>navigate('/themepage/로맨스')}>로맨스</Text>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <Text onClick={(e)=>navigate('/themepage/판타지')}>판타지</Text>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <Text onClick={(e)=>navigate('/themepage/액션')}>액션</Text>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <Text onClick={(e)=>navigate('/themepage/코미디')}>코미디</Text>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <Text onClick={(e)=>navigate('/themepage/무협')}>무협</Text>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <Text onClick={(e)=>navigate('/themepage/SF')}>SF</Text>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <Text onClick={(e)=>navigate('/themepage/미스테리')}>추리</Text>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <Text onClick={(e)=>navigate('/themepage/스포츠')}>스포츠</Text>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <Text onClick={(e)=>navigate('/themepage/하이틴')}>하이틴</Text>
                                        </SwiperSlide>
                                </Swiper>
                            </Grid>
                            </>
                        </Modal>
                    </Grid>

                    <Grid backgroundColor="#F9FAFB00" is_flex border="0">
                        <Image backgroundSize='contain' backgroundRepeat='no-repeat' width='150px' height='45px' src="/Logo/Logo_p.png"></Image>
                    </Grid>
                    <Grid margin='10px' position='relative' backgroundColor="#F9FAFB00" is_flex border="0">
                        <Image onClick={()=>{_user.is_login?checkNotice():loginAlrt()}} width='24px' height='24px' src="/Icon/bell_p.png"></Image>
                        <Grid position='absolute' width='10px' height='10px' backgroundColor='red' borderRadius='5px' top='10px' display={_user.user.alarmRead?'none':_user.is_login?'':'none'}/>
                    </Grid>
                </Grid>
            </Grid>

    );
    
    if(props.isDetail){
        return(
            <Grid>
                <LoginBanner hide={alrt}/>

                <Grid zIndex='9' position="absolute" top="0px"  backgroundColor="#F9FAFB"  is_flex alignItems="center" justifyContent='space-between' boxSizing="border-box" padding="0" width ="100vw" minWidth ="360px" maxWidth ="420px" height='60px' margin='0'  >
                    <Grid margin='10px' onClick={()=>{navigate(-1)}} is_flex backgroundColor="#F9FAFB" border="0">
                        <Image  width='30px' height='30px' src="/Icon/left.png"></Image>
                    </Grid>
    
                    <Grid backgroundColor="#F9FAFB">
                        <Text>{props.postTitle}</Text>
                    </Grid>
    
                    <Grid backgroundColor="#F9FAFB" width='50px' height='50px' is_flex border="0">
                    </Grid>
                </Grid>
            </Grid>
        );
    }
    if(props.isChangePassword){
        return(
            <Grid>

                <Grid zIndex='9' position="absolute" top="0px"  backgroundColor="#F9FAFB"  is_flex alignItems="center" justifyContent='space-between' boxSizing="border-box" padding="0" width ="100vw" minWidth ="360px" maxWidth ="420px" height='60px' margin='0'  >
                    <Grid margin='10px' onClick={()=>{navigate(-1)}} is_flex backgroundColor="#F9FAFB" border="0">
                        <Image  width='30px' height='30px' src="/Icon/left.png"></Image>   
                    </Grid> 
    
                    <Grid backgroundColor="#F9FAFB">
                        <Text margin="0" backgroundColor="#F9FAFB">{props.ChangePassword}</Text>
                    </Grid>
    
                    <Grid backgroundColor="#F9FAFB" is_flex border="0">
                        
                    </Grid>
                </Grid>
            </Grid>
        );
    }
    
    if(props.isUserPage){
        return(
            <Grid>
                <LoginBanner hide={alrt}/>

                <Grid zIndex='9' position="absolute" top="0px"  backgroundColor="#F9FAFB"  is_flex alignItems="center" justifyContent='space-between' boxSizing="border-box" padding="0" width ="100vw" minWidth ="360px" maxWidth ="420px" height='60px' margin='0'  >
                    <Grid margin='10px' onClick={()=>{navigate(-1)}} is_flex backgroundColor="#F9FAFB" border="0">
                        <Image  width='30px' height='30px' src="/Icon/left.png"></Image>   
                    </Grid>
    
                    <Grid backgroundColor="#F9FAFB">
                        <Text>{props.UserName}</Text>
                    </Grid>
    
                    <Grid width='50px' height='50px' backgroundColor="#F9FAFB" is_flex alignItems='center' justifyContent='center' border="0" >
                        <Image display={props.mine?'':'none'}  onClick={()=>{_user.is_login?navigate(`/modifyprofile`):loginAlrt()}} width='24px' height='24px' src='/Icon/Frame.png'></Image>  
                    </Grid>
                </Grid>
            </Grid>
        );
    }
    if(props.isEditUser){
        return(
            <Grid>
                <Grid zIndex='9' position="absolute" top="0px"  backgroundColor="#F9FAFB"  is_flex alignItems="center" justifyContent='space-between' boxSizing="border-box" padding="0" width ="100vw" minWidth ="360px" maxWidth ="420px" height='60px' margin='0'  >
                    <Grid margin='10px' onClick={()=>{navigate(-1)}} is_flex backgroundColor="#F9FAFB" border="0">
                        <Image  width='30px' height='30px' src="/Icon/left.png"></Image>   
                    </Grid>
    
                    <Grid backgroundColor="#F9FAFB">
                        <Text color="#7E7E7E">프로필 수정</Text>
                    </Grid>
    
                    <Grid backgroundColor="#F9FAFB" is_flex border="0" >
                    <Text onClick={props.onClick} color="#6454FF" margin="0 20px 0 0" padding="0">완료</Text>   
                    </Grid>
                </Grid>
            </Grid>
        );
    }
    if(props.isWrite){
        return(
            <Grid>
                <Grid zIndex='9' position="absolute" top="0px"  backgroundColor="#F9FAFB"  is_flex alignItems="center" justifyContent='space-between' boxSizing="border-box" padding="0" width ="100vw" minWidth ="360px" maxWidth ="420px" height='60px' margin='0'  >
                    <Grid margin='10px' onClick={()=>{navigate(-1)}} is_flex backgroundColor="#F9FAFB" border="0">
                        <Image  width='30px' height='30px' src="/Icon/left.png"></Image>   
                    </Grid>
    
                    <Grid backgroundColor="#F9FAFB">
                        <Text>게시글 작성하기</Text>
                    </Grid>
    
                    <Grid width='50px' height='50px' backgroundColor="#F9FAFB" is_flex border="0">
                    </Grid>
                </Grid>
            </Grid>
        );
    }

    return(
        <Grid>
            <LoginBanner hide={alrt}/>
            <Grid zIndex='9' position="absolute" top="0px"  backgroundColor="#F9FAFB"  is_flex alignItems="center" justifyContent='space-between' boxSizing="border-box" padding="0" width ="100vw" minWidth ="360px" maxWidth ="420px" height='60px' margin='0'  >
                <Grid margin='10px' onClick={()=>{navigate(-1)}} is_flex backgroundColor="#F9FAFB" border="0">
                    <Tooltip title="뒤로가기"><Image  width='30px' height='30px' src="/Icon/left.png"></Image></Tooltip>    
                </Grid>

                <Grid>
                </Grid>

                <Grid width='50px' height='50px' backgroundColor="#F9FAFB" is_flex border="0">
                </Grid>
            </Grid>
        </Grid>
    );
}


export default Header;
