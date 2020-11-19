
import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Styled from 'styled-components';
import Onboarding from "./Onboarding";
import ClassList from "./ClassList";

export default function Dashboard() {
  const { push } = useHistory();
  const classes = useSelector(state => state.classReducer.class_list);
  const user = useSelector(state => state.userReducer);

  if (!user.role) {
    push("/");
  }
  if (classes.length === 0) {
    return (
      <Onboarding />
    )
  }
  else {

    return (
      <DivContainer>
        <Middlediv>
          Dashboard
      {user.role === "instructor" ?
            <nav>
              <Link className='link' to="/create-class">Create Class</Link>
            </nav>
            :
            <nav>
              <Link to="/search-class">Search Class</Link>
            </nav>
          }
          <ClassList />
        </Middlediv>
      </DivContainer>
    );
  }
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