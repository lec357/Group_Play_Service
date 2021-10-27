import React from "react";
import "../styles/css/Posting.css";
import collection from "../assets/collection2x.png";
import like from "../assets/like2x.png";
import comment from "../assets/comment2x.png";
import axios from "axios";
import GetLink from "../components/GetLink";
import ContentLoader from "react-content-loader";
import qs from "qs";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css"
import "swiper/components/pagination/pagination.min.css"

// import Swiper core and required modules
import SwiperCore, {
    Navigation,Pagination,Mousewheel,Keyboard
} from 'swiper/core';
import ShowContents from "../components/ShowContents";
import GetDateFormat from "../components/GetDateFormat";
import {Link} from "react-router-dom";
import Modal from "../components/Modal/Modal";
import relaxing from "../assets/relaxing.svg";
import Clipboard from "../components/Clipboard";
import logo from "../assets/logo.png";
import MetaHelmet from "../components/MetaHelmet";

// install Swiper modules
SwiperCore.use([Navigation,Pagination,Mousewheel,Keyboard]);


class PostDetail extends React.Component{

    state = {
        isLoading: true,
        postingDetail: [],
        creator: [],
        imageFile: [],
        createdDate: "",
        hashtag: [],
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
    getPostingDetail = async (dataId) =>{
        await axios({
            method: 'post',
            url: "https://muggl.cc/taste/taste-detail",
            headers: {},
            data: {
                taste_id: dataId
            }
        })
            .then((response) => {
                 console.log(response.data.data);
                this.setState({
                    isLoading: false,
                    postingDetail: response.data.data,
                    creator: response.data.data.creator,
                    imageFile: response.data.data.image,
                    createdDate: response.data.data.createdAt,
                    hashtag: response.data.data.hash,
                });
            })
            .catch((res)=>{
                console.log("실패: "+res.code)
            })
    }



    componentDidMount() {
        const { location, match } = this.props;

        const query = qs.parse(location.pathname,{
            ignoreQueryPrefix: true,
        });

        console.log("location: "+location.pathname + "쿼리한거: "+Object.entries(query));
        if (location.state === undefined) {
            const id = (location.pathname).slice(9,);
            this.getPostingDetail(id);
        }
        else {
            this.getPostingDetail(location.state.id);
        }
    }



    render() {
        const { location, history } = this.props;
        const {isLoading, postingDetail, creator, imageFile, createdDate, hashtag} = this.state;


        // 날짜 포맷 지정 함수 사용
        const date = GetDateFormat(createdDate);

        // set Meta Datq
        const metaData = {
            title: postingDetail.title,
            description: "tasting diverse muggl",
            image: postingDetail.thumbnail,
            canonical: location.pathname
        }

        // user id 쿼리문으로
        const queryUserId = qs.stringify({ uid: creator.uid}, { addQueryPrefix: true } );

        return(
            <div id="postingDetail">
                <MetaHelmet data={metaData}/>
                <body className="post postDetail">
                <div className="postDetailContainer">
                    {/************* 포스팅 헤더 시작 **************/}
                    <div className='postHeader'>
                        <nav>
                            <div className="homeBtn navBtn">
                                <button onClick={() => history.goBack()} className="home"><i className="fas fa-arrow-left fa-2x"></i></button>
                            </div>
                            <div className="shareBtn navBtn">
                                <Clipboard copiedText={`about.muggl.cc${location.pathname}`} copyImage="share"/>
                            </div>
                        </nav>
                    </div>
                    <div className="postContainer">
                        {/******** 포스트 박스 시작 *************/}
                        <section className="postBox">
                            {/******* 로딩중 content loader ***********************************************/}
                            {isLoading ? (
                                <ul className="posting postingLoader">
                                    <li className="postImg">
                                        <ContentLoader viewBox="0 0 380 380" >
                                            <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%"/>
                                        </ContentLoader>
                                    </li>
                                    <li className="postContents"><span>
                                 <ContentLoader viewBox="0 0 380 70">
                                     <rect x="0" y="15" rx="3" ry="3" width="60%" height="18" />
                                     <rect x="0" y="40" rx="4" ry="4" width="80%" height="18" />
                                 </ContentLoader>
                                 </span></li>
                                    <li className="userInfo">
                                        <ContentLoader viewBox="0 0 380 70">
                                            <rect x="0" y="0" rx="100" ry="100" width="40" height="40" />
                                            <rect x="50" y="5" rx="2" ry="2" width="40" height="10" />
                                            <rect x="50" y="25" rx="2" ry="2" width="60" height="8" />
                                        </ContentLoader>
                                    </li>
                                </ul>
                            ) : (
                                /******* 로딩후 데이터 출력 ***********************************************/
                                <ul className="posting">
                                    <li className="postImg">
                                        <Swiper
                                            cssMode={true}
                                            navigation={true}
                                            pagination={{"clickable": true}}
                                            mousewheel={true}
                                            keyboard={true}
                                            className="mySwiper">
                                            {imageFile.map((imgFile, index) => (
                                                <SwiperSlide key={index}>
                                                    <div className="contentsBox">
                                                        <ShowContents contents={imgFile.uri}/>
                                                    </div>
                                                </SwiperSlide>
                                            ))}

                                        </Swiper>
                                    </li>
                                    <li className="postContents"><span>{postingDetail.title}</span></li>
                                    <li className="postDescription">
                                        <div className="dedcriptionBox">
                                            <span>{postingDetail.description}</span>
                                        </div>
                                    </li>
                                    <li className={hashtag.length !== 0 ?"postHashtags":"postHashtags hidden"}>
                                        <ul>
                                            {hashtag.map((hashtags, index) => (
                                                <li key={index}>
                                                    #{hashtags}
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                    <li className="postLink">
                                        <GetLink dataLink={postingDetail.link!==undefined? postingDetail.link :""}/>
                                    </li>
                                    <li className="userInfo">
                                        <Link  to={{
                                            pathname: `/user${queryUserId}`,
                                            state:
                                                {
                                                    creatorId: creator.uid,
                                                }
                                        }}>
                                            <div className="profileBox"><img src={creator.avatar !== undefined? creator.avatar : relaxing} alt="avatar"/></div>
                                        </Link>
                                        <span>{creator.firstName} {creator.lastName}
                                            <p className="postDate">{date}</p>
                                    </span>
                                    </li>

                                    {/********** postFooter 수집, 좋아요, 댓글 버튼 *************/}
                                    <div className="postFooter">
                                        <div className="postLike">
                                            <div className="collection likeBtn" onClick={()=> this.openModal("게시물을 수집") }>
                                                <img src={collection} alt="collection"/>
                                                <p>{postingDetail.count_bo}</p>
                                            </div>
                                            <div className="like likeBtn" onClick={()=> this.openModal("좋아요를 표시") }>
                                                <img src={like} alt="like"/>
                                                <p>{postingDetail.count_li}</p>
                                            </div>
                                            <div className="comment likeBtn" onClick={()=> this.openModal("댓글") }>
                                                <img src={comment} alt="comment"/>
                                                <p>{postingDetail.count_co}</p>
                                            </div>
                                        </div>
                                    </div>
                                </ul>
                            )}
                        </section>
                        {/******** 포스트 박스 끝 *************/}
                    </div>
                    {/*********** 모달창에 qr코드 또는 다운로드 링크 삽입 예정 ************/}
                    <Modal open={ this.state.modalOpen } close={ ()=> this.closeModal() } header="Play Ground">
                        <p>{this.state.modalRequest} 구현 예정!!!</p>
                    </Modal>
                </div>

                </body>
            </div>

        );
    }
}

export default PostDetail;