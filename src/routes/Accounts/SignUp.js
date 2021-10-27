import React from "react";
import "../../styles/css/Accounts.css";
import {Link} from "react-router-dom";
import axios from "axios";

class SignUp extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            userEmail: '',
            userPw: '',
            userName: '',
            userNickname: '',
            msg: null
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    saveUser = (e) =>{
        e.preventDefault();

        let user = {
            userEmail: this.state.userEmail.toString(),
            userPw: this.state.userPw.toString(),
            userName: this.state.userName.toString(),
            userNickname: this.state.userNickname.toString()
        }



        axios({
            method: 'post',
            url: "/member/signup",
            headers: {},
            data: {
                userEmail: user.userEmail,
                userPw: user.userPw,
                userName: user.userName,
                userNickname: user.userNickname
            }
        })
            .then(res => {
                this.setState({
                    msg: user.userName + '님이 성공적으로 회원가입되었습니다.'
                })
                console.log("성공:  "+ this.state.msg
                    +", 입력한 메일은: "+user.userEmail+", 이름은: "+user.userName
                    +", 닉넴은: "+user.userNickname+", 비번은: "+user.userPw);
                this.props.history.push('/accounts/signin');
                alert(this.state.msg);
            })
            .catch(err => {
                console.log("실패 ㅠㅠ "+ err
                    +", 입력한 메일은: "+user.userEmail+", 이름은: "+user.userName
                    +", 닉넴은: "+user.userNickname+", 비번은: "+user.userPw);
            })
    }

    render(){

        return(
            <body className="signContainer">
            <div className="signBox">
                <h2 className="signTitle">Play Ground</h2>
                <form className="signInput" id="signupInput">
                    <div className="signEmail">
                        <input className="signupInput" id="signupInputEmail" type="email" name="userEmail"
                               value={this.state.userEmail} placeholder="이메일 주소를 입력하세요."
                         onChange={this.onChange}/>
                    </div>
                    <div className="signName">
                        <input className="signupInput" id="signupInputName" type="text" name="userName"
                               value={this.state.userName} placeholder="이름을 입력하세요."
                                 onChange={this.onChange}/>
                    </div>
                    <div className="signNickname">
                        <input className="signupInput" id="signupInputNickname" type="text" name="userNickname"
                               value={this.state.userNickname} placeholder="닉네임을 입력하세요."
                                onChange={this.onChange}/>
                    </div>
                    <div className="signPw">
                        <input className="signupInput" id="signupInputPw" type="password" name="userPw"
                               value={this.state.userPw} placeholder="비밀번호를 입력하세요."
                                onChange={this.onChange}/>
                    </div>
                </form>
                <div className="submit">
                    <button onClick={this.saveUser}>회원가입</button>
                </div>
            </div>
            <div className="goToBox">
                <div className="goToSign">
                    계정이 있으신가요?<Link to="/accounts/signin">로그인</Link>
                </div>
            </div>
            </body>
        );
    }
}

export default SignUp;