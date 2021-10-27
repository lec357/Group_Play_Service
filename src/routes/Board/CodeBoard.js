import React from "react";
import {Link} from "react-router-dom";
import logoPic from "../../assets/pic_logo.png";
import logo from "../../assets/text_logo.png";

class CodeBoard extends React.Component{

    render() {

        return(
            <body className="board addBoard">
            {/************* 포스팅 헤더 시작 **************/}
            <div className='boardHeader'>
                <nav>
                    <div className="homeBtn">
                        <Link to="/board">
                            <img src={logoPic} width="50px" alt="logo"/>
                            <img className="toHomeLogo" src={logo} width="200px" alt="logo"/>
                        </Link>
                    </div>
                </nav>
            </div>
            <div className="signBox">
                <form className="signInput" id="signInput">
                    <div className="boardName">
                        <span>초대코드를 입력하세요</span>
                        <input className="signupInput" type="text"/>
                    </div>
                </form>
                <div className="submit">
                    <button>그룹 참여</button>
                </div>
            </div>
            </body>
        );
    }
}

export default CodeBoard;