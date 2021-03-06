import styled from 'styled-components';
import React from "react";

const Chip = ({
    height="20px",
    width ='100%',
    onClick,
    children,
    ...props
    }) => {


    return (
        <Default onClick={onClick} style={{...props, height}}><span style={{padding : "0 10px 3px 10px"}}>{children}</span></Default>
    )
}

const Default = styled.div`
    background-color : #7E7E7E;
    color : ${props => props.theme.mainTheme.tertiary};
    border-radius : 5px;
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
    justify-content : center;
    box-sizing: border-box;
    font-size : 12px;
`;



export default Chip;