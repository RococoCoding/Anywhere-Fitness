
import React from "react";
import Styled from 'styled-components';

import Onboarding from "./Onboarding";
import ClassList from "./ClassList";

export default function Dashboard() {
  const onboarded = localStorage.getItem('onboarding'); // using local storage to check for onboarding because we forgot to add an edit user endpoint. could do clients via saved classes, but instructors don't have classes saved for them, so no other way to track if they've been on boarded.

  return (
    <DivContainer>
      <Middlediv>
          {onboarded === "false" ? <Onboarding /> : <ClassList />}
      </Middlediv>
    </DivContainer>
  );
  // }
};

const DivContainer = Styled.div`
display: flex;
flex-direction: column;
align-items: center;
background-color:#3F51B5;
padding: 3%;
padding-top: .5rem;
font-size:1.3rem;
text-align:center;
height:100vh;
font-size: 3rem;
box-shadow:0 0 15px 5px rgba(0,0,0,0.06);


.link {
  box-shadow:inset 0px 1px 0px 0px #ffffff;
	background-color:#3F51B5;
	border-radius:6px;
	border:1px solid #dcdcdc;
	display:inline-block;
	cursor:pointer;
	color:white;
	padding:13px 62px;
  font-size: 1.3rem;}


`
const Middlediv = Styled.div`
  margin-top: 2%;
    background-color: white;
    width: 60%;
    height: 95%;
    box-shadow:0 0 15px 5px rgba(0,0,0,0.06);
  `