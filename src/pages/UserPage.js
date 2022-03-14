    //import Library
import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,useParams } from "react-router-dom";
import SwitchSelector from "react-switch-selector";

//import Actions

//import elements
import { Button, Grid, Input, Image, Text } from "../elements";

//import Icon

// impot Component
import Header from "../components/Header";
import Bottom from "../components/Bottom";
import Post from "../components/Post";

import instance from "../shared/Request";


const UserPage = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const _user = useSelector(state => state.user);
    const _post = useSelector(state => state.post);
    console.log(_user);

    const pageUserKey = useParams().userKey;
    let [pageUser,setPageUser] = React.useState(null);

    React.useEffect(()=>{
        instance({
            method : "get",
            url : `/posts/userPage/${pageUserKey}?page=0&size=5`,
            data : {},
            headers : {
                "Content-Type": "application/json;charset-UTF-8"
            }
        }).then(res=>{
            setPageUser({...res.data});
        })
    },[])

    console.log(pageUserKey);
    console.log(pageUser);

    const [index,setIndex] = React.useState(1);



    return (
    <Grid wrap>
            <Header isUserPage UserName={pageUser?pageUser.nickname:''}/>
            <Grid is_flex flexDirection='column' alignItems='center' width="100%" padding="0" marginTop="100px">
                
                <Image is_circle size='100' src={pageUser?pageUser.userProfileImage:''}/>
    
                <Text margin="5px 5px 0px 5px" fontSize="12px">
                    [호칭]
                </Text>

                <Text margin="5px 5px 0px 5px" fontSize="24px">
                    {pageUser?pageUser.nickname:''}
                </Text>

                <Text margin="5px" fontSize="8px" width="150px">
                    {pageUser?pageUser.introduction:''}
                </Text>

                <Grid borderBottom='1px solid black' is_flex width='100%'>
                    <Grid height='35px' width='33%' textAlign='center' onClick={()=>setIndex(1)}><Text>내 참여작</Text></Grid>
                    <Grid height='35px' width='33%' textAlign='center' onClick={()=>setIndex(2)}><Text>북마크한 작품</Text></Grid>
                    <Grid height='35px' width='33%' textAlign='center' onClick={()=>setIndex(3)}><Text>좋아요한 작품</Text></Grid>
                </Grid> 
                <Grid marginTop='-3px' borderRadius='1px' width="34%" height='1px' borderTop='3px solid black' transform={'translate(' + (- 2 + index)*100 + '%)'} transition='transform 0.5s ease 0.1s'/>


                <Grid is_flex flexDirection='column' alignItems='center' width="90%" marginTop='10px' gap='10px'>
                    <Post/>
                    <Post/>

                </Grid>
            </Grid>
            <Bottom thisPage="myPage" />
        </Grid>
    );
};

export default UserPage;
