import React from "react";
import "../../styles/css/Footer.css";
import {Link} from "react-router-dom";
import ModalContact from "../../components/Modal/ModalContact";

function Footer () {

    /******어플 다운로드 및 sns 주소 링크 선언*******/
    const link = {
            youtubeUrl :"https://www.youtube.com/channel/UCJcgHFJhn_U1v6KKIhBlc4w",
            instagramUrl : "https://www.youtube.com/channel/UCJcgHFJhn_U1v6KKIhBlc4w",
            iosUrl : "https://apps.apple.com/",
            andUrl : "https://play.google.com/store/"
    };

    /****** 기본 정보들 내용 선언 *******/
    const info = {
        compAddr : "서울특별시 성북구 한성대입구역(머글)",
        compEmail : "muggl@specialorder.io",
        compNum : "",
        comRegNum: "",
        copyright: "Copyright © Muggl Inc.  All Right Reserved",
    }

    return(
        <div className="footer">
            <div className="footerContainer">
                <div>
                    <h1 className="downloadText" align="left">
                        Download for iOS / Android
                    </h1>
                    {/***** ios, android 앱 다운로드 링크 바로가기 *****/}
                    <ul className="downloadLink"  align="left">
                        <li><a href={link.iosUrl} rel="noopener" target="_blank"><i className="fab fa-app-store-ios fa-2x"></i> App Store</a></li>
                        <li><a href={link.andUrl} rel="noopener" target="_blank"><i className="fab fa-google-play fa-2x"></i>  Google Play</a></li>
                    </ul>
                </div>
                {/***** 문의하기 (모달창), 이용약관 (새 창으로 바로가기 )  *****/}
                <ul className="footerMenuList">
                    <li><ModalContact/></li>
                    <li><Link to="/legal/terms" rel="noopener" target="_blank">이용약관</Link></li>
                </ul>
                {/***** sns 링크 바로가기 *****/}
                <ul className="snsList">
                    <li><a href={link.youtubeUrl} rel="noopener" target="_blank"><i className="fab fa-youtube fa-3x"></i></a></li>
                    <li><a href={link.instagramUrl} rel="noopener" target="_blank"><i className="fab fa-instagram fa-3x"></i></a></li>
                </ul>
            </div>
            <div className="footerContainer2">
                <div className="copyListContainer">
                    {/******* 회사 기본정보 리스트 *********/}
                    <ul className="copyrightList">
                        <li>{info.compAddr}     |</li>
                        <li>contact Phone-num: {info.compNum}010-555-88     |</li>
                        <li>E-mail: {info.compEmail}     |</li>
                        <li>사업자등록번호: {info.comRegNum}12345678     |</li>
                        <li>{info.copyright}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Footer;