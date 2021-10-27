import React  from "react";
import "../styles/css/Muggl.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
// import Swiper core and required modules
import SwiperCore, {Mousewheel, Navigation, Pagination} from 'swiper/core';
//import 이미지들
import home from "../assets/home.png";
import myprofile from "../assets/myprofile.png";
import muggl3 from "../assets/muggl3.jpg";
import relaxing from "../assets/relaxing.svg";
import logo from "../assets/logo.png";
import pg_logo from "../assets/pg_logo.png";
// import Header 및  Footer
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import ModalPoster from "../components/Modal/ModalPoster";
import MetaHelmet from "../components/MetaHelmet";
// install Swiper modules
SwiperCore.use([Mousewheel,Pagination,Navigation]);


class Muggl extends React.Component {

    render() {
        const { location } = this.props;
        /******* 각 페이지에 삽입될 내용들 *******/
        const about = [
            {
                id: 0,
                aboutMain: "프라이빗한 공유 sns 서비스",
                aboutSub: "친구들과, 가족들과 또는 같은 관심사를 가진 사람들과 함께\n프라이빗한 공간을 만들어보세요.\n초대코드를 이용하여 우리의 공간으로 사람들을 초대하세요!",
                aboutImg: home,
            },
            {
                id: 1,
                aboutMain: "간편한 사용",
                aboutSub: "여러 개의 그라운드에 참여하여 보세요.\n다양한 장르, 유용한 정보를 얻어갈 수 있습니다.",
                aboutImg: myprofile,
            },
            {
                id: 2,
                aboutMain: "온택트 놀이터",
                aboutSub: "비대면 생활의 비중이 늘어가면서 온라인에서 모임이 많아졌습니다.\n플레이그라운드로 모여서 안전하고 즐거운 시간을 보내세요!!",
                aboutImg: relaxing,
            },
        ]

        /***** 메인 표지에 삽입 될 제목들 ******/
        const main = [
            {
                title: "손쉬운 그룹 모임",
            },
            {
                title: "Join us :)",
            },
            {
                title: "관심사 별로 유용하게 모아모아",
            },
        ]
        /*****랜덤으로 표지 문구 구하기********/
        const titlePick = main[Math.floor(Math.random() * main.length)];

        // set Meta Datq
        const metaData = {
            title: "PlayGround",
            description: "프라이빗한 공유 서비스",
            image: logo,
            canonical: location.pathname
        }


        return (
            <>
                <MetaHelmet data={metaData}/>
                <body className="mugglBody">
                <ModalPoster/>
                <div className="swiper-container">
                    {/************ Swiper 속성 설정 *******************/}
                    <Swiper
                        direction={'vertical'}
                        speed={900}
                        slidesPerView={1}
                        mousewheel={true}
                        navigation={true}
                        allowTouchMove={true} // false시에 스와이핑이 되지 않으며 버튼으로만 슬라이드 조작이 가능
                        pagination={{
                            "clickable": true,
                            renderBullet : function (index, className) {    // pagination 버튼 커스텀텀
                               return '<span class="' + className + '">'
                                    + '<i class="fas fa-cookie"></i>'
                                    + '<i class="fas fa-cookie-bite"></i>'
                                    + '</span>';
                            }
                        }} onSlideChange={()=> console.log('slide change')}
                        className="mgSwiper">
                        <Header/>
                        {/****첫 슬라이드 부분*******/}
                        <SwiperSlide className="headerSlide" >
                            {({ isActive }) => (
                                <div className="titleSlide">
                                    <img className="titleImg" src={pg_logo} alt="pg_logo"/>
                                    <div className={isActive ? "titleText downActive" : "titleText"}>
                                        <h1>{titlePick.title}</h1>
                                    </div>
                                    <div className="imgCover"/>
                                </div>
                            )}
                        </SwiperSlide>
                        {/****바디 슬라이드 부분****/}
                        {/****** 머글 소개 페이지 (데이터 개수대로 슬라이드 생성) ******/}
                        {about.map((ab) => (
                            <SwiperSlide key={ab.id} className="bodySlide">
                                {({ isActive }) => (
                                    <div className="aboutContents">
                                        <div className="aboutText">
                                            <h1 className={isActive ? "appearActive" : ""}>{ab.aboutMain}</h1>
                                            <p className={isActive ? "appearActiveDelay" : ""}>{ab.aboutSub}</p>
                                        </div>
                                        <div className={isActive ? "aboutImg slideActive" : "aboutImg"} >
                                            <img src={ab.aboutImg} alt="aboutImg" />
                                        </div>
                                    </div>
                                )}
                            </SwiperSlide>
                        ))}
                        {/****푸터부분****/}
                        <SwiperSlide className="footerSlide">
                            <Footer/>
                        </SwiperSlide>
                    </Swiper>
                </div>
                </body>
            </>
        );
    }
}

export default Muggl;