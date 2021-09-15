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
                aboutMain: "맛있는 것은 정말\n참을 수 없어 ><",
                aboutSub: "머글은 음식들을 찍고 공유 가능한 음식 아카이빙 어플입니다.\n맛있는 음식, 나만의 레시피, 유행하는 음식 챌린지!\n모두 모아 손 안에서 간편하게 확인하세요.",
                aboutImg: home,
            },
            {
                id: 1,
                aboutMain: "오늘 먹을 음식\nMuggl 어때 ?",
                aboutSub: "저녁에 뭐 먹을지 고민 되나요? 여행 가서 맛집을 찾으시나요?\n광고 없는 찐 맛집을 찾고 싶을 때!!\n지금 바로 머글에 접속하세요.",
                aboutImg: myprofile,
            },
            {
                id: 2,
                aboutMain: "머글's JMT\n찍고, 먹고, 탁 올리고",
                aboutSub: "손쉬운 업로드로 당신의 맛집을 추천하고\n사람들의 공감을 얻어보세요.\n당신은 이미 Mugglr~!!!",
                aboutImg: relaxing,
            },
        ]

        /***** 메인 표지에 삽입 될 제목들 ******/
        const main = [
            {
                title: "안녕하세요 머글입니다.\n뭐머글래?",
            },
            {
                title: "머글?\n가보자고",
            },
            {
                title: "와글와글\n머글머글",
            },
            {
                title: "Tasty Food\nTake Muggl !!!",
            },
            {
                title: "Eat delicious food and\nBe happy :)",
            },
        ]
        /*****랜덤으로 표지 문구 구하기********/
        const titlePick = main[Math.floor(Math.random() * main.length)];

        // set Meta Datq
        const metaData = {
            title: "Tasty Food Take Muggl",
            description: "오늘 먹을 음식 Muggl 어때",
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
                                    <img className="titleImg" src={muggl3} alt="muggl3"/>
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