import React from "react";
import "../../styles/css/Accounts.css";
import {Link} from "react-router-dom";
import axios from "axios";

class SignIn extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userEmail: '',
            userPw: '',
            userId: '',
            userName: '',
            userNickname: '',
            isMember: '',
            msg: null
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    getUser = () =>{
        if(this.state.isMember === "yesMember"){
            console.log("오 회원가입 돼있음ㅋㅋ+이걸로 찾아라 이멜: "+this.state.userEmail);
            ///////// [시작] 가입 돼있는지 확인하는 api //////////////////////////////////////
            axios({
                method: 'post',
                headers: {},
                url: "/member/list",
                data: {
                    userEmail: this.state.userEmail
                }
            })
                .then(response => {
                    this.setState({
                        userId: response.data[0].userId,
                        userName: response.data[0].userName,
                        userNickname: response.data[0].userNickname,
                        msg: response.data[0].userNickname + "님 환영합니다."
                    })
                    console.log("성공해서 받아온거: " + Object.entries(response.data[0]));
                    alert(this.state.msg);
                    this.props.history.push({
                        pathname: "/board",
                        state: {
                            userEmail: this.state.userEmail,
                            //userPw: this.state.userPw,
                            userId: this.state.userId,
                            userName: this.state.userName,
                            userNickname: this.state.userNickname,
                        }
                    })

                })
                .catch(err => {
                    console.log("실패ㅠㅠ "+ err);
                })
            ////// [끝] 가입 돼있는지 확인하는 api ///////////////////////////

        }
        else {
            alert("잘못된 정보입니다. 다시 로그인 해 주세요!");
        }
    }

    login = (e) =>{
        e.preventDefault();

        let user = {
            userEmail: this.state.userEmail.toString(),
            userPw: this.state.userPw.toString(),
        }

        ///////////// 가입 돼있는지 확인하는 api //////////////////////////////////////
        axios({
            method: 'post',
            url: "/member/signin",
            headers: {},
            data: {
                userEmail: user.userEmail,
                userPw: user.userPw,
            }
        })
            .then(res => {
                this.setState({
                    isMember: res.data
                })
                console.log("제바류ㅠㅠ: "+res.data);
                console.log("ㅎㅎㅎ: "+this.state.isMember);
                this.getUser();
            })
            .catch(err => {
                console.log("실패 ㅠㅠ "+ err
                    +", 입력한 메일은: "+user.userEmail+", 비번은: "+user.userPw);
            })
    }


    render() {
        return(
            <body className="signContainer">
            <div className="signBox">
                <h1 className="signTitle">Play Ground</h1>
                <div className="signInput">
                    <div className="signEmail">
                        <h5>E-mail</h5>
                        <input type="email"  name="userEmail" id="signinInputEmail"
                               value={this.state.userEmail} placeholder="이메일 주소를 입력하세요."
                               onChange={this.onChange}/>
                    </div>
                    <div className="signPw">
                        <h5>Password</h5>
                        <input type="password" name="userPw"  id="signinInputPw"
                               value={this.state.userPw} placeholder="비밀번호를 입력하세요."
                               onChange={this.onChange}/>
                    </div>
                </div>
                <div className="submit">
                    <button onClick={this.login}>로그인</button>
                </div>
            </div>
            <div className="goToBox">
                <div className="goToSign">
                    아직 계정이 없으신가요?<Link to="/accounts/signup">가입하기</Link>
                </div>
            </div>
            </body>
        );
    }

}

export default SignIn;