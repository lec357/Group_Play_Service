import React from "react";
import {Link} from "react-router-dom";
import "../../styles/css/Posting.css";
import aboutImg from "../../assets/light.png";
import logo from "../../assets/text_logo.png";
import logoPic from "../../assets/pic_logo.png";
import food from "../../assets/muggl3.jpg";
import sku from "../../assets/sku.png";
import "../../styles/css/Board.css"
import ApiService from "../../ApiService";
import relaxing from "../../assets/relaxing.svg";
import axios from "axios";
import Clipboard from "../../components/Clipboard";


class Board extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            boards: [],
            msg: null,
            showMenu: false
        };
        this.showMenu = this.showMenu.bind(this);
    }

    showMenu(event) {
        event.preventDefault();

        if(!this.state.showMenu){
            this.setState({
                showMenu: true,
            });
        }else{
            this.setState({
                showMenu: false,
            });
        }
    }

    shareGroup(e){
        e.preventDefault();
        alert("초대코드가 클립보드에 저장되었습니다. :)");
    }

    componentDidMount() {
        const { location } = this.props;

        this.reloadGroupList(location.state.userId);
    }

    reloadGroupList = (uId) => {
        axios({
            method: 'post',
            url: "/group/list",
            headers: {},
            data: {
                userId: uId
            }
        })
            .then(response => {
                console.log("성공 code: " + response.data);
                this.setState({
                    boards: response.data
                })
            })

            .catch(err => {
                console.log("실패ㅠㅠ "+ err);
            })
            /*.then(response => response.json())
            .then(message => {
                console.log("성공 code: " + message);
                this.setState({
                    boards: message
                })
            })
            .catch(err => {
                console.log("실패ㅠㅠ "+ err);
            })*/
    }


    render() {

        const {boards} = this.state;

        const userNickname = this.props.location.state.userNickname;
        const userId = this.props.location.state.userId;

        return(
            <body className="board">
            {/************* 포스팅 헤더 시작 **************/}
            <div className='boardHeader'>
                <nav>
                    <div className="homeBtn">
                        <button onClick={() => window.scrollTo(0,0)}>
                            <img src={logoPic} width="50px" alt="logo"/>
                            <img className="toHomeLogo" src={logo} width="200px" alt="logo"/>
                            {/*
                            <p className="toHomeLogo">PlayGround</p>
                            */}
                        </button>
                    </div>

                    <div className="addBtn">
                        <div className="pg_userInfo">
                            <div className="sample">{userNickname}님</div>
                            <Link to="/accounts/signin">
                                <div className="sample2">로그아웃</div>
                            </Link>
                        </div>
                        {/* 방 생성 or 초대코드 입력 칸 */}
                        <Link to={{
                            pathname: "/register",
                            state: {
                                userId: userId,
                            }
                        }}>
                            <i className="fas fa-plus fa-2x"></i>
                        </Link>
                    </div>
                </nav>
            </div>
            {/************* 포스팅 박스 시작 **************/}
            <div className="boardContainer postContainer">
                <button onClick={this.showMenu}><i className="fas fa-ellipsis-h"></i></button>
                {
                    boards.map(board => (
                        <section className="boardBox postBox" key={board.boardId} >
                            <Link  to={{
                                pathname:"/post",
                                state:
                                    {
                                        boardId: board.boardId
                                    }
                            }}>
                                <div className="boardList">
                                    <div className="boardImg">
                                        <img src={aboutImg}
                                            width="40px" alt="aboutImg" />
                                        {/*
                                        <img src={board.boardImg !== null? board.boardImg : aboutImg}
                                            width="40px" alt="aboutImg" />
                                        */}
                                    </div>
                                    <ul className="boarding posting">
                                        <li className="boardName">{board.boardName}

                                        </li>
                                        <li className="boardDesNum">
                                            <span  className="boardDes">{board.boardDes}</span>
                                            <span  className="boardNum">{board.boardNum}명 참여중</span>
                                        </li>
                                    </ul>
                                </div>
                            </Link>
                            {
                                this.state.showMenu
                                    ? (
                                        <div className="menu">
                                            <Clipboard copiedText="bV34JCy7IjU49WhZQfp5qinxST60hSA2KHeZl4SnkJr560rixa4Ga" copyImage='shareGroup'/>
                                            <button> 그룹 탈퇴 </button>
                                        </div>
                                    ) : null
                            }
                        </section>
                    ))
                }
            </div>
            </body>
        );

    }

}

export default Board;