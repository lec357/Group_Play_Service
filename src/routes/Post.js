import React from "react";
import axios from "axios";
import Posting from "../components/Posting";
import _ from "lodash";
import "../styles/css/Posting.css";
import search from "../assets/search.png";
import Modal from "../components/Modal/Modal";

import logo from "../assets/logo.png";
import MetaHelmet from "../components/MetaHelmet";
import {Link} from "react-router-dom";
import aboutImg from "../assets/light.png";
import food from "../assets/muggl3.jpg";
import sku from "../assets/sku.png";

class Post extends React.Component{

    state = {
        isLoading: true,
        posting: [],
        postLength: 0,
        hide: false,
        pageYOffset: 0,
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



    // api를 받아와서 해당 데이터를 저장하는 함수
    getPosting = async (tasteId) =>{
        await axios({
            method: 'post',
            url: "https://muggl.cc/taste/recent",
            headers: {},
            data: {
                taste_id: tasteId
            }
        })
            .then((response) => {
                console.log(response.data);
                console.log("성공 code: "+ response.data.code + " " + response.data.description);
                this.setState({
                    isLoading: false,
                    posting: this.state.posting.concat(response.data.data),
                    postLength: response.data.data.length
                });
            })
            .catch((response)=>{
                console.log("실패 code: "+ response.data.code + " " + response.data.description);
            })
    }

    // 무한스크롤 구현 함수 (피드에 max 50개까지 노출)
    infiniteScroll = () => {
        let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        let clientHeight = document.documentElement.clientHeight;

        let totalLength = this.state.posting.length;

        if ((scrollTop + clientHeight === scrollHeight) && this.state.postLength === 10 && totalLength < 50){
            this.setState({
                lastId: this.state.posting[totalLength-1]._id,
                pageScrollHeight: scrollHeight
            })
            console.log("받아온 lastID는: "+ this.state.posting[totalLength-1]._id);
            console.log("지금 길이는: "+ totalLength);
            this.getPosting(this.state.lastId);
        }
        console.log("!!!!무한스크롤 함수 작동중!!!!");
    }



    // 스크롤 상태 별 헤더 숨기고 나타내기 위한 함수
    handleScroll = () => {
        const { pageYOffset } = window
        const deltaY = pageYOffset - this.state.pageYOffset
        const hide = pageYOffset !== 0 && deltaY >= 0

        this.setState({ hide, pageYOffset })
    }

    constructor(props) {
        super(props);
        // 무한스크롤 함수 throttle 이용하여 1초 마다 발생
        this.infiniteScroll = this.infiniteScroll.bind(this);
        this.infiniteScrollThrottled = _.throttle(this.infiniteScroll, 1000);
        // 헤더 스크롤 감지 debounce 이용하여 500ms 안에서 발생되는 마지막 값 받기
        this.handleScroll = this.handleScroll.bind(this);
        this.handleScrollDebounced = _.debounce(this.handleScroll, 500);
    }

    componentDidMount() {

        this.getPosting();

        // throttle 이용하여 무한스크롤 함수 발생을 1초간격을 줌
        window.addEventListener('scroll', this.infiniteScrollThrottled );

        if (!this.props.fixed) {
            window.addEventListener('scroll', this.handleScrollDebounced)
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.infiniteScrollThrottled);
        if (!this.props.fixed){
            window.removeEventListener('scroll', this.handleScrollDebounced)
        }
    }


    render() {

        const boards = [
            {
                id: 0,
                boardName: "뭐먹을래",
                boardDes: "맛집, 레시피, 요리 등 음식에 관한 공유방",
                boardNum: 230,
                boardImg: food,
            },
            {
                id: 1,
                boardName: "서경고 1-3 추억방",
                boardDes: "서경고등학교 1-3 친구들 앨범용",
                boardNum: 25,
                boardImg: sku,
            },
            {
                id: 2,
                boardName: "우리가족",
                boardDes: "2015년 부터 우리 가족 여행사진 모음",
                boardNum: 4,
                boardImg: null,
            },
            {
                id: 3,
                boardName: "2020 식단기록",
                boardDes: "2020년 동안 식단 사진 기록용",
                boardNum: 1,
                boardImg: null,
            },
        ]

        const { location } = this.props;

        const {isLoading, posting} = this.state;

        // set Meta Datq
        const metaData = {
            title: "Play Now",
            description: "Play in playground",
            image: logo,
            canonical: location.pathname
        }

        return (
            <div>
                <MetaHelmet data={metaData}/>
                {/********** 로딩 화면 출력 **************/}
                {isLoading ? (
                    <div className="loader">
                        <span className="loader__text">Loading...  </span>
                        <i className="fas fa-spinner"></i>
                    </div>
                ) : (
                    <body className="post postList">
                    {/************* 포스팅 헤더 시작 **************/}
                    <div className={this.state.hide ? 'postHeader hide' : 'postHeader'}>
                        <nav>
                            <div className="homeBtn navBtn">
                                <button onClick={() => window.scrollTo(0,0)}>
                                    {/*
                                    <img className="home" src={logo} alt="home"/>
                                    */}
                                    <p className="toHomeLogo">PlayGround</p>
                                </button>
                            </div>
                            {/*<div className="searchBtn navBtn">
                                <button onClick={()=> this.openModal("게시물을 검색하시려면") }>
                                    <img className="search" src={search}  alt="search"/>
                                </button>
                            </div>*/}
                        </nav>
                    </div>
                    {/***** 머글 다운로드 알림 모돨창 **********/}
                    <Modal open={ this.state.modalOpen } close={ ()=> this.closeModal() } header="Play Ground">
                        <p>{this.state.modalRequest} 구현예정</p>
                    </Modal>
                    {/************* 포스팅 박스 시작 **************/}
                    <div className="postContainer pgrndPost">
                        {/**************** api 받아왔을 때 ****** */}
                        {
                            posting.map(ps => (
                                <Posting
                                    key={ps._id}
                                    id={ps._id}
                                    avatar={ps.creator.avatar}
                                    firstName={ps.creator.firstName}
                                    lastName={ps.creator.lastName}
                                    creatorUid={ps.creator.uid}
                                    countFile={ps.countFile}
                                    thumbnail={ps.thumbnail}
                                    title={ps.title}
                                    hash={ps.hash}
                                    count_li={ps.count_li}
                                    count_bo={ps.count_bo}
                                    count_co={ps.count_co}
                                    createdAt={ps.createdAt} >
                                </Posting>
                            ))
                        }
                        {/* **************** api 받아왔을 때 *******/}
                    </div>
                    {/************* 포스팅그룹 박스 시작 **************/}
                    <div className="postGroupContainer">
                        {
                            boards.map(board => (
                                <section className="boardBox postBox">
                                    <Link  to={{
                                        pathname: "/post",
                                        state:
                                            {

                                            }
                                    }}>
                                        <div className="boardList">
                                            <div className="boardImg">
                                                <img src={board.boardImg !== null? board.boardImg : aboutImg}
                                                     width="40px" alt="aboutImg" />
                                            </div>
                                            <ul className="boarding posting">
                                                <li className="boardName">{board.boardName}</li>
                                                <li className="boardDesNum">
                                                    <span  className="boardDes">{board.boardDes}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </Link>
                                </section>
                            ))
                        }
                    </div>

                    </body>
                )}
            </div>
        );
    }
}

export default Post;