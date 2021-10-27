import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import "../../styles/css/Posting.css";
import logo from "../../assets/text_logo.png";
import logoPic from "../../assets/pic_logo.png";
import "../../styles/css/Board.css"

class AddBoard extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            userId: '',
            boardImg: '',
            boardName: '',
            boardDes: '',
            message: null
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    saveJoin = (uId) => {
        axios({
            method: 'post',
            url:"/group/registerJoin",
            headers: {},
            data: {
                userId: uId
            }
        })
            .then(res => {
                alert("성공:  "+ this.state.message);
                console.log("성공~~~");
                this.props.history.goBack();
            })
            .catch(err => {
                console.log("실패ㅠㅠ "+ err );
            })
    }

    saveGroup = (e) => {
        e.preventDefault();

        let group = {
            userId : this.state.userId.toString(),
            boardImg: this.state.boardImg,
            boardName: this.state.boardName.toString(),
            boardDes: this.state.boardDes.toString(),
        }


        axios({
            method: 'post',
            url:"/group/register",
            headers: {},
            data: {
                boardName: group.boardName,
                boardDes: group.boardDes,
                boardImg: group.boardImg
            }
        })
            .then(res => {
                this.setState({
                    message: group.boardName + "그룹이 성공적으로 생성되었습니다."
                })
                console.log("입력한 네임은: "+group.boardName+", 설명은: "+group.boardDes);
                this.saveJoin(group.userId);
            })
            .catch(err => {
                console.log("실패ㅠㅠ "+ err+", 입력한 네임은: "+group.boardName+", 설명은: "+group.boardDes);
            })


    }

    componentDidMount() {

        const{location} = this.props;

        this.setState({
            userId: location.state.userId,
        })
        const kkk = location.state.userId;

        console.log("자 받아온거 아이디맞는지확인해: "+kkk);

    }

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
                    <div className="boardImg">
                        <span>표지 이미지: </span>
                        <input className="signupInput" type="file" name="boardImg" value={this.state.boardImg}/>
                    </div>
                    <div className="boardName">
                        <span>제 목: </span>
                        <input className="signupInput" id="signInput" type="text" name="boardName"
                               value={this.state.boardName}
                               onChange={this.onChange} placeholder="제목적어줘~"/>
                    </div>
                    <div className="boardDes">
                        <span>한 줄 소개: </span>
                        <input className="signupInput" id="signInput" type="text" name="boardDes"
                               value={this.state.boardDes}
                               onChange={this.onChange}/>
                    </div>
                </form>
                <div className="submit">
                    <button onClick={this.saveGroup}>그룹생성</button>
                </div>
                <div  className="goToSign">
                    초대코드가 있으시다면 <Link to="/code">바로 참여하기</Link>
                </div>
            </div>
            </body>
        );
    }
}

export default AddBoard;