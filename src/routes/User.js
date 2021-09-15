import React from "react"
import "../styles/css/User.css";
import "../styles/css/Posting.css";
import axios from "axios";
import logo from "../assets/logo.png";
import ContentLoader from "react-content-loader";

import record from "../assets/record.png";
import collect from "../assets/collection.png";
import UserCollect from "../components/UserCollect";
import UserReport from "../components/UserReport";
import {Link} from "react-router-dom";
import Modal from "../components/Modal/Modal";
import relaxing from "../assets/relaxing.svg";
import MyContentLoader from "../components/ContentLoader";
import MetaHelmet from "../components/MetaHelmet";


class User extends React.Component{


    state = {
        isLoading: true,
        activeTab: 0,
        userDetail: [],
        reportBox: [],
        collectBox: [],
        modalOpen: false,
        modalRequest: "",
    };

    // 모달창 open, close 함수
    openModal = (req) => {
        this.setState({
            modalOpen: true,
            modalRequest: req,
        });

    }
    closeModal = () => {
        this.setState({modalOpen: false});
    }

    //////////////// <userDetail> api를 받아와서 해당 데이터를 저장하는 함수 //////////////
    getUserDetail = async (userId) =>{
        await axios({
            method: 'post',
            url: "https://muggl.cc/users/user-detail",
            headers: {},
            data: {
                uid: userId
            }
        })
            .then((response) => {
                // console.log(response.data.data);
                this.setState({
                    isLoading: false,
                    userDetail: response.data.data,
                    reportBox: response.data.data.mytaste,
                });
            })
    }
    /////////////// <userCollect> api를 받아와서 해당 데이터를 저장하는 함수 /////////////////
    getUserCollect = async (userId) =>{
        await axios({
            method: 'post',
            url: "https://muggl.cc/users/user-collect",
            headers: {},
            data: {
                uid: userId
            }
        })
            .then((response) => {
                // console.log(response.data.data);
                this.setState({
                    isLoading: false,
                    collectBox: response.data.data,
                });
            })
    }
    ////////////// userTab을 변경하는 함수 /////////////////
    tabChangeHandler = (tabIndex) => {
        this.setState({activeTab: tabIndex});
    }

    componentDidMount() {
        const { location, history } = this.props;
        if (location.state === undefined) {
            history.push('/post');
        }
        else {
            this.getUserDetail(location.state.creatorId);
            this.getUserCollect(location.state.creatorId);

        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const { location } = this.props;
        // user 페이지에서 다른 user 페이지로 넘어갈 때 데이터 다시 받아오기
        if (location.pathname !== prevProps.location.pathname){
            this.getUserDetail(location.state.creatorId);
            this.getUserCollect(location.state.creatorId);
            this.setState({
                activeTab: 0
            })
        }
        window.scrollTo(0,0);
    }

    render() {
        const { location } = this.props;
        const {isLoading, userDetail, reportBox, collectBox} = this.state;

        // 0: report, 1: collect 탭 내용 변경 위한 리스트
        const userTabList = {
            0: <UserReport userPost={reportBox}/>,
            1: <UserCollect userCollect={collectBox}/>,
        }

        // 작성자의 instagram URL 정의
        const creatorInstagramUrl = `https://www.instagram.com/${userDetail.instagramId}/`;

        // set Meta Datq
        const metaData = {
            title: `${userDetail.firstName} ${userDetail.lastName}(@${userDetail.nickname})`,
            description: `@${userDetail.nickname}님의 머글 기록`,
            image: userDetail.avatar !== undefined? userDetail.avatar : relaxing,
            canonical: location.pathname
        }

        if(location.state){
            return (
                <div  id="userDetail">
                    <MetaHelmet data={metaData}/>
                    <body className="userPage">
                    <div className="userContent">
                        {/************************ header *********************************/}
                        <header>
                            <div className="homeBtn">
                                <Link to="/post">
                                    <img src={logo} alt="home" height="35em"/></Link>
                            </div>
                        </header>
                        {isLoading ? (
                            <div>
                                {/******* 로딩중 content loader ***********************************************/}
                                <div className="userContainer userLoader">
                                    <div className="userProfile">
                                        <ContentLoader viewBox="0 0 380 150">
                                            <rect x="0" y="0" rx="100" ry="100" width="70" height="70" />
                                            <rect x="0" y="80" rx="3" ry="3" width="70" height="15" />
                                            <rect x="45%" y="0" rx="2" ry="2" width="50" height="40" />
                                            <rect x="65%" y="0" rx="2" ry="2" width="50" height="40" />
                                            <rect x="85%" y="0" rx="2" ry="2" width="50" height="40" />
                                            <rect x="0" y="120" rx="5" ry="5" width="45%" height="30" />
                                            <rect x="55%" y="120" rx="5" ry="5" width="45%" height="30" />
                                        </ContentLoader>
                                    </div>
                                </div>
                                {/********************* myTasteContainer *********************************/}
                                <div className="myTasteContainer">
                                    <div className="myTasteBox postContainer">
                                        <section className="postBox">
                                            <MyContentLoader/>
                                        </section>
                                        <section className="postBox">
                                            <MyContentLoader/>
                                        </section>
                                        <section className="postBox">
                                            <MyContentLoader/>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /******* 로딩후 데이터 출력 ***********************************************/
                            <div>
                                {/************************ userContainer *********************************/}
                                <div className="userContainer">
                                    <div className="userProfile">
                                        <div  className="userAvatar">
                                            <img src={userDetail.avatar !== undefined? userDetail.avatar : relaxing} alt={userDetail.nickname}/>
                                        </div>
                                        <ul className="userNum">
                                            <li><p>Collection</p>
                                                <p onClick={()=> this.openModal(`${userDetail.nickname}님의 collection을 확인하려면`) }>{userDetail.collect_num}</p></li>
                                            <li><p>Followers</p>
                                                <p onClick={()=> this.openModal(`${userDetail.nickname}님의 팔로워를 확인하려면`) }>{userDetail.follower_num}</p></li>
                                            <li><p>Following</p>
                                                <p onClick={()=> this.openModal(`${userDetail.nickname}님이 팔로우하는 유저를 확인하려면`) }>{userDetail.following_num}</p></li>
                                        </ul>
                                    </div>
                                    <div className="userInformation">
                                        <div className="userName">
                                            <span>{userDetail.firstName} {userDetail.lastName}</span>
                                            <p>@{userDetail.nickname}</p>
                                        </div>
                                        <div className="follow">
                                            <button onClick={()=> this.openModal(`${userDetail.nickname}님을 팔로우하려면`) }>Follow</button>
                                        </div>
                                    </div>
                                    <div className="userIntro">
                                        <span>{userDetail.intro}</span>
                                    </div>
                                    <div className={(userDetail.instagramId !== "") && (userDetail.instagramId !== undefined) ? "userInsta": "hidden"}>
                                        <a href={creatorInstagramUrl} target="_blank"><i className="fab fa-instagram"></i>{userDetail.instagramId}</a>
                                    </div>
                                </div>
                                {/********************* myTasteContainer *********************************/}
                                <div className="myTasteContainer">
                                    <div className="myTasteIndex">
                                        <button
                                            className={`${this.state.activeTab === 0 ? "record active" : "record"}`}
                                            onClick={() => this.tabChangeHandler(0)}>
                                            <img src={record} alt="record"/> 기록
                                        </button>
                                        <button className={`${this.state.activeTab === 1 ? "collect active" : "collect"}`}
                                                onClick={() => this.tabChangeHandler(1)}>
                                            <img src={collect} alt="collect"/> 수집
                                        </button>
                                    </div>
                                    {/********************* report box 또는 collect box ********************************* */}
                                    {userTabList[this.state.activeTab]}
                                </div>
                            </div>
                        )}
                        {/***** 머글 다운로드 알림 모돨창 **********/}
                        <Modal open={ this.state.modalOpen } close={ ()=> this.closeModal() } header="Taste Muggl Now">
                            <p>{this.state.modalRequest} 머글을 다운받아주세요!!!</p>
                        </Modal>
                    </div>
                    </body>
                </div>
            );

        }else {
            return null;
        }
    }

}

export default User;