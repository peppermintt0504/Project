//import Library
import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

//import MUI
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

//import elements
import { Button, Grid, Input, Text } from "../elements";

//impot Component
import Header from "../components/Header";
import { Chip } from "../elements";

//import Actions
import { actionCreators as userActions } from "../redux/modules/user";

//import axios
import instance from "../shared/Request";

function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //lodash
    const debounce = _.debounce((k) =>  {
        instance({
            method : "post",
            url : "/user/signup/checkNick",
            data : {nickName:k},
            headers : {
                "Content-Type": "application/json;charset-UTF-8"
            }
        }).then(res=>{
            setNickCheck(true);
        }).catch(err=>{
            setNickCant(true);
        });
    }
    , 1000);
    
    const debounceEmail = _.debounce((k) =>  {
        instance({
            method : "post",
            url : "/user/signup/checkID",
            data : {username:k},
            headers : {
                "Content-Type": "application/json;charset-UTF-8"
            }
        }).then(res=>{
            setEmailDup(true);
        }).catch(err=>{
            setEmailCant(true);
        });
    }
    , 1000);

    const debouncePwd = _.debounce((k) =>  {
        setPwdForm(k);
        setPwdFormCheck(true);

    }
    , 1000);
    const debouncePwdCheck = _.debounce((k) =>  {
        setPwdCheckForm(k);
        setPwdCheckFormCheck(true);

    }
    , 1000);

    const keyPress = React.useCallback(debounce, []);
    const keyPressEmail = React.useCallback(debounceEmail, []);
    const keyPressPwd = React.useCallback(debouncePwd, []);
    const keyPressPwdCheck = React.useCallback(debouncePwdCheck, []);

    //email
    const [email, setEmail] = React.useState(null);
    const [emailCheck, setEmailCheck] = React.useState(false);
    const [emailDup, setEmailDup] = React.useState(false);
    const [emailCant, setEmailCant] = React.useState(false);
    const [emailVeri, setEmailVeri] = React.useState(false);

    //Code
    const [mailCode,setMailCode]= React.useState(null);
    const [code, setCode] = React.useState(null);
    const [codeVeri, setCodeVeri] = React.useState(false);
    const [codeCheck, setCodeVeriCheck] = React.useState(false);

    //nick
    const [nick, setNick] = React.useState('');
    const [nickCheck, setNickCheck] = React.useState(false);
    const [nickCant, setNickCant] = React.useState(false);

    //pwd
    const [pwd, setPwd] = React.useState(true);
    const [pwdForm, setPwdForm] = React.useState(true);
    const [pwdFormCheck, setPwdFormCheck] = React.useState(false);
    
    const [pwdCheck, setPwdCheck] = React.useState(true);
    const [pwdCheckForm, setPwdCheckForm] = React.useState(true);
    const [pwdCheckFormCheck, setPwdCheckFormCheck] = React.useState(false);

    const [agree1, setAgree1] = React.useState(false);
    const [agree2, setAgree2] = React.useState(false);
    const [agree3, setAgree3] = React.useState(false);

    const refAgree1 = React.useRef(null);
    const refAgree2 = React.useRef(null);
    const refAgree3 = React.useRef(null);


    const fileInput = React.useRef();
    var file = new File(["foo"], "foo.txt", {
        type: "text/plain",
    });

    const [postFile, setPostFile] = React.useState(file);

    React.useEffect(() => {
    }, []);



    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const postData = new FormData();

        postData.append("userProfile", postFile);
        postData.append("username", email);
        postData.append("nickName", nick);
        postData.append("password", pwd);
        postData.append("checkPassword", pwdCheck);
        postData.append("introduction", " ");

        dispatch(userActions.signup(postData));
    };

    const checkId = (e) => {
        if(e.target.value === ''){
            setEmail(false);
            setEmailCheck(false);
            setEmailCant(false);
        }else{
            setEmail(e.target.value);
            setEmailCheck(false);
            setEmailCant(false);
        }
    };

    const emailVerification = (e)=>{
        let _reg = /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-z])*.([a-zA-Z])*/;
        console.log(email)
        if(!_reg.test(email)){
            console.log("????????? ?????? ????????????.");
            setEmailCheck(true);
            return;
        }else{
            
            instance({
                method : "post",
                url : "/user/signup/checkID",
                data : {username:email},
                headers : {
                    "Content-Type": "application/json;charset-UTF-8"
                }
            })
            .then(res=>{
                console.log(res.data);
                if(res.data){
                    setEmailDup(true);
                    instance({
                        method : "post",
                        url : "/mailCheck",
                        data : {email},
                        headers : {
                            "Content-Type": "application/json;charset-UTF-8"
                        }
                    }).then(res=>{
                        setEmailVeri(true);
                        console.log(res.data.key)
                        setMailCode(res.data.key);
                    });
                }   
            })
            .catch(err =>{
                setEmailCant(true);
                console.log('???????????????.');
            })

        
        }
        
    };

    const codeVerification = (e)=>{
        if(mailCode===code){
            setCodeVeri(true);
        }
        else{
            setCodeVeriCheck(true);
        }
    };

    const checkCode = (e) => {
        if(e.target.value === ''){
            setCodeVeriCheck(false);
            setCode(false);
        }else{
            setCode(e.target.value);
            setCodeVeriCheck(false);
        }
    };


    const nickChange = (e) => {
        let _reg = /^[-_.@!0-9a-zA-Z]{2,15}$/;
        setNick(e.target.value);
        setNickCant(false);
        setNickCheck(false);
        keyPress(e.target.value);
    };



    const pwdChange = (e) => {
        let _reg = /^[-_.@!0-9a-zA-Z]{6,15}$/;
        setPwd(e.target.value);
        setPwdFormCheck(false);
        keyPressPwd(_reg.test(e.target.value));
    };

    const pwdCheckChange = (e) => {
        setPwdCheck(e.target.value);
        setPwdCheckFormCheck(false);
        keyPressPwdCheck(e.target.value===pwd)

    };



    return (
        <Grid wrap>
            <Header/>
            <Grid
                is_flex
                alignItems="center"
                flexDirection="column"
                marginTop = '80px'
            >
                <Grid is_flex flexDirection='column' width='350px'>
                    <Text fontSize="24px" fontWeight="700">
                        ????????????
                    </Text>
                    <Text color='#7E7E7E' fontSize="14px" fontWeight="400">
                    ????????? ????????? ????????? ?????? ?????? ????????? ??????????????????.
                    </Text>
                </Grid>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{
                        width: "350px",
                        mt: 1,
                        alignItems: "center",
                        textAlign: "center",
                    }}
                >   
                    <Grid marginTop='30px' is_flex flexDirection='column' width='350px' alignItems='flex-start'>
                        <Text fontSize='14px' fontWeight='500' color='#7E7E7E'>?????????</Text>
                        <Grid is_flex flexDirection='column' height='75px' position='relative'>
                            <Input
                                isTheme
                                height='40px'
                                width='350px'
                                margin='10px 0 5px 0'
                                id="loginID"
                                placeholder='email'
                                name="loginID"
                                onChange={checkId}
                                borderColor={emailCheck?'red':emailVeri?'#6454FF':''}
                            >
                            </Input>
                            
                            <Chip cursor="pointer" onClick={email?emailVerification:null} position='absolute' right='10px' top='17px' width="70px" height="24px" backgroundColor={email?'#6454FF':'#EAEAEA'}>????????????</Chip>
                            
                            <Text text-align='left' width='350px' display={emailVeri?'':'none'} margin="0" color='#6454FF' fontWeight='400' fontSize='14px'>?????? ????????? ??????????????????.</Text>
                            <Grid is_flex width='100%'><Text display={emailCheck?'':'none'} margin="0" color='red' fontWeight='400' fontSize='14px'>????????? ????????? ?????? ????????????.</Text></Grid>
                            <Grid is_flex width='100%'><Text display={emailCant?'':'none'} margin="0" color='red' fontWeight='400' fontSize='14px'>????????? ??????????????????.</Text></Grid>
                        </Grid>
                    </Grid>
                    
                    <Grid is_flex flexDirection='column' alignItems='flex-start' position='relative'>
                        <Input
                            isTheme
                            height='40px'
                            width='350px'
                            margin='15px 0 5px 0'
                            id="code"
                            placeholder="????????????"
                            name="code"
                            onChange={checkCode}
                            borderColor={codeCheck?'red':codeVeri?'#6454FF':''}
                        />

                        {code?
                        <Chip cursor="pointer" onClick={codeVerification} position='absolute' right='10px' top='22px' width="70px" height="24px" backgroundColor='#6454FF'>????????????</Chip> :
                        <Chip cursor="pointer" position='absolute' right='10px' top='22px' width="70px" height="24px" backgroundColor='#EAEAEA'>????????????</Chip>
                        }                        
                        
                        <Text display={codeVeri?'':'none'} margin="0" color='#6454FF' fontWeight='400' fontSize='14px'>?????????????????????.</Text>
                        <Text display={codeCheck?'':'none'} margin="0" color='red' fontWeight='400' fontSize='14px'>??????????????? ????????????.</Text>

                    </Grid>


                    <Grid margin='20px 0' is_flex flexDirection='column' alignItems='flex-start'>
                        <Text fontSize='14px' fontWeight='500' color='#7E7E7E'>?????????</Text>
                        <Grid is_flex flexDirection='column' alignItems='flex-start' height='80px' position='relative'>


                            <Input
                                isTheme
                                height='40px'
                                width='350px'
                                margin='15px 0 5px 0'
                                name="nickname"
                                placeholder="?????????"
                                id="nickname"
                                onChange={nickChange}
                                borderColor={nickCant?'red':nickCheck?'#6454FF':''}
                            />
                            <Grid is_flex flexDirection='column' fontSize="8px" alignItems='flex-start' width="100%" padding="0">
                            <Text margin="0">
                                ??? 2~15??? ????????? ???????????? ??????????????????.
                            </Text>
                        </Grid>
                        <Text display={nickCheck?'':'none'} margin="0" color='#6454FF' fontWeight='400' fontSize='14px'>??????????????? ??????????????????.</Text>
                        <Text display={nickCant?'':'none'} margin="0" color='red' fontWeight='400' fontSize='14px'>????????? ??????????????????.</Text>

                        </Grid>
                    </Grid>

                    <Grid margin='20px 0 0 0' is_flex flexDirection='column' height='140px' alignItems='flex-start'>
                        <Text fontSize='14px' fontWeight='500' color='#7E7E7E'>????????????</Text>
                        <Input
                            isTheme
                            height='40px'
                            width='350px'
                            margin='15px 0 5px 0'
                            name="password"
                            placeholder="????????????"
                            type="password"
                            id="password"
                            onChange={pwdChange}
                            borderColor={pwdFormCheck&&!pwdForm?'red':''}
                        />
                        <Grid is_flex flexDirection='column' fontSize="8px" alignItems='flex-start' width="100%" padding="0">
                            <Text margin="0">
                                ??? 6~15??? ????????? ??????????????? ??????????????????.
                            </Text>
                            <Text margin="0">
                                ??? ???/?????????, ??????, ????????????(!,@,_) ???????????? ???????????????.
                            </Text>
                        </Grid>
                        <Text display={pwdFormCheck&&pwdForm?'':'none'} margin="0" color='#6454FF' fontWeight='400' fontSize='14px'>??????????????? ?????????????????????.</Text>
                        <Text display={pwdFormCheck&&!pwdForm?'':'none'} margin="0" color='red' fontWeight='400' fontSize='14px'>??????????????? ????????? ?????? ????????????.</Text>

                    </Grid>
                    

                    <Grid margin='0' is_flex flexDirection='column' alignItems='flex-start'>
                        <Input
                            isTheme
                            height='40px'
                            width='350px'
                            margin='15px 0 5px 0'
                            name="passwordCheck"
                            placeholder="???????????? ??????"
                            type="password"
                            id="passwordCheck"
                            onChange={pwdCheckChange}
                            borderColor={pwdCheckFormCheck&&!pwdCheckForm?'red':''}
                        />
                        <Text display={pwdCheckFormCheck&&pwdCheckForm?'':'none'} margin="0" color='#6454FF' fontWeight='400' fontSize='14px'>??????????????? ???????????????.</Text>
                        <Text display={pwdCheckFormCheck&&!pwdCheckForm?'':'none'} margin="0" color='red' fontWeight='400' fontSize='14px'>??????????????? ???????????? ????????????.</Text>
                    </Grid>


                    <Grid
                        is_flex
                        width="100%"
                        margin="0"
                        marginTop='30px'
                        textAlign="left"
                    >
                        <Text fontSize='14px'>
                            ???????????? ????????? ?????? ??????????????? ???????????? ????????? ?????? ????????? ???????????????.
                        </Text>
                    </Grid>

                    {/* <Grid
                        is_flex
                        padding="10px"
                        margin="5px 0 0 0"
                        width="350px"
                        border="1px solid #6454FF"
                    >
                        <Input
                            isTheme
                            type="radio"
                            value="???????????? ????????????(??????)"
                            name="???????????? ????????????"
                            padding="0"
                            margin="0"
                            onChange={()=>{
                                setAgree1(true);
                                console.log(refAgree1.current)
                                setAgree2(true);
                                setAgree3(true);
                            }}
                        />
                    </Grid> */}
                    <Grid
                        is_flex
                        flexDirection="column"
                        padding="0"
                        margin="10px"
                        width="300px"
                        textAlign="left"
                    >
                        <Input
                            isTheme
                            type="radio"
                            value="[??????] ?????????????????? ????????????"
                            name="???????????? ????????????1"
                            _ref={refAgree1}
                        />
                        <Input
                            isTheme
                            type="radio"
                            value="[??????] ??????(??????)?????? ????????? ?????? ?????????"
                            name="???????????? ????????????2"
                            _ref={refAgree2}
                        />
                        <Input
                            isTheme
                            type="radio"
                            value="[??????] ??????(??????)?????? ???????????????_?????????"
                            name="???????????? ????????????3"
                            _ref={refAgree3}

                        />
                    </Grid>

                    <Button
                        theme="unfilled"
                        type="submit"
                        disabled={!codeVeri}
                    >
                        ??????
                    </Button>
                </Box>
                <Grid width="10px" height="10px" margin="20px" />
            </Grid>
        </Grid>
    );
}
export default Signup;
