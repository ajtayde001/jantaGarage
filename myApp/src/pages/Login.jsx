import React, { useEffect } from "react";
import styled from "styled-components";
import { store } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { login } from "../redux/authReducer.js/action";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../Photos/officeSystem.webp";

let theme = true;
export const Login = () => {
  const navigation = useNavigate();
  const location = useLocation();

  const [username, setemail] = useState("");
  const [password, setpassword] = useState("");

  const dispatch = useDispatch();
  const authUser = JSON.parse(localStorage.getItem("user")) ;
 

  const handleSubmit = (e) => {
    e.preventDefault();

    let userData = {
      username,
      password,
      deviceId:
        "dapxDzCySkg:APA91bFte8-oCXMYKJp016cUG7DcGprawTKhzxOSVXA7B55TzYTuYPTPZ6QLAT3Ei8wu0WKc0eIbBlQJosDq50s_fn66Bu0RRla2sPKNEBorqRJfTwTAlC_ssuCSb6Fur7PgqnMHeseo",
    };

    dispatch(login(userData)).then((res) => {
        // console.log(res.json());
        navigation("/dashboard");
        window.location.reload();
    });
   
  };
 
  return (
    <div
      style={{
        border: "5px solid black",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "linear-gradient(orange,#fff,green)",
      }}
    >
      <div
        style={{
          width: "280px",
          marginTop: "50px",
          background: "#fff",
          height: "500px",
          padding: "25px 40px",
          borderRadius: "10px",
          position: "absolute",
          top: " 50%",
          left: "50%",
          transform: " translate(-50%,-50%)",
        }}
      >
        <DIV>
          <h2
            style={{
              fontSize: "20px",
            }}
          >
            Office Management System
          </h2>

          <img
            src={logo}
            alt="abc"
            style={{
              width: "150px",
              height: "150px",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "25px",
              borderRadius: "50%",
              boxShadow: "1px 1px 7px 1px rgba(0,0,0,.2)",
            }}
          />
          <form className="form-1" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Username"
              onChange={(e) => {
                setemail(e.target.value);
              }}
              value={username}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              value={password}
            />
            <button
              type="submit"
              style={{
                background: "linear-gradient(120deg,#ffb545,#068306,#ffb545)",
                width: "80%",
                height: "50px",
                borderRadius: "20px",
                border: "none",
                color: "white",
              }}
            >
              Login
            </button>
          </form>
        </DIV>
      </div>
    </div>
  );
};

const DIV = styled.div`
  // width:400px;
  // height:400px;
  // margin: auto;
  // border : 2px solid black;
  // padding : 20px;
  //  background:"white"

  .form-1 {
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
  }
  h3 {
    color: ${theme ? "green" : "red"};
  }
  input {
    width: 80%;
    height: 40px;
    font-size: large;
    border: 1px solid gray;
    padding: 5px;
  }
`;
