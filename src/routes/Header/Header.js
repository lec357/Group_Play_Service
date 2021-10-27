import React  from "react";
import {Link} from "react-router-dom";
import "../../styles/css/Header.css";
import logo from "../../assets/appicon_white.png";


const Header = () => {


    /******* 링크 선언*******/
    const link = {
        youtubeUrl :"https://www.youtube.com/",
        instagramUrl : "https://about.instagram.com/",
        iosUrl : "https://apps.apple.com/",
        andUrl : "https://play.google.com/store/"
    };

    const downloadText = "Download\nhere!!";

    return (
        <header className='headerBar' id="headerBar" >
            {/**** 홈 버튼 시작 ****/}
            <nav>
                <div className="homeBtn navBtn">
                    <Link to="/">
                        {/*
                        <img src={pg_logo} alt="home" height="30px"/>
                        */}
                        <p className="homeLogo">PlayGround</p>
                        </Link>

                </div>
                <div className="goToPost">
                    <Link to="/accounts/signin">
                        <i className="fas fa-paper-plane fa-2x"></i>
                        <p>"Play Now"</p>
                    </Link>
                </div>
                <div className="snsList navBtn">
                    <ul>
                       {/* <a href={link.youtubeUrl} rel="noopener" target="_blank"><i className="fab fa-youtube fa-3x"></i></a>*/}
                        <a href={link.instagramUrl} rel="noopener" target="_blank"><i className="fab fa-instagram fa-3x"></i></a>
                        <Link to="/accounts/signin">
                            <i className="fas fa-paper-plane fa-2x"></i>
                        </Link>
                    </ul>
                </div>
            </nav>
            {/*******다운로드 안내 스티커********/}
            <div className="appDownload">
                <a href={link.iosUrl} rel="noopener" target="_blank"><i className="fas fa-utensils fa-2x"></i>{downloadText}</a>
            </div>
        </header>
    );
}

export default Header;