//import Library
import React from "react"
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";

//import CSS
import './App.css';
import theme from '../theme/theme';

//import Pages
import Main from "../pages/Main";
import Login from "../pages/Login";
import Clause from "../pages/Clause";
import Signup from "../pages/Signup";
import Mypage from "../pages/Mypage";
import PostList from "../pages/PostList";
import Write from "../pages/Write";

function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/clause" element={<Clause />}/>
          <Route path="/Signup" element={<Signup />}/>
          <Route path="/mypage" element={<Mypage />}/>
          <Route path="/postlist" element={<PostList />}/>
          <Route path="/write" element={<Write />} />
        </Routes>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
