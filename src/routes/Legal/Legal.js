import React, {useState} from "react";
import "../../styles/css/Policy.css";
import {Link} from "react-router-dom";
import logo from "../../assets/logo.png";
import Terms from "../../components/GetLegal/Terms";
import Privacy from "../../components/GetLegal/Privacy";
import MetaHelmet from "../../components/MetaHelmet";


const policy = [
    {
        id: 'terms',
        tab: "이용약관",
        content: <Terms/>,

    },

    {
        id: 'privacy',
        tab: "개인정보처리방침",
        content:  <Privacy/>,
    },
];



// ------- 메뉴 탭에 따라 변경 함수  ----------
const useTabs = (initialTabs, allTabs) => {
    const [policyIndex, setPolicyIndex] = useState(initialTabs);
    return {
        contentItem: allTabs[policyIndex],
        contentChange: setPolicyIndex
    };
};


function Legal ({location}) {

    const { contentItem, contentChange } = useTabs(0, policy);

    // set Meta Datq
    const metaData = {
        title: `Muggl ${contentItem.tab}`,
        description: "Muggl 이용정책",
        image: logo,
        canonical: location.pathname
    }

    return (
        <div>
            <MetaHelmet data={metaData}/>
            <body className="policy">
            <header>
                <div className="homeBtn">
                    <Link to="/">
                        <img src={logo} alt="home" height="30px"/></Link>
                </div>
            </header>
            <div className="policyContainer">
                <div className="policyTitle">
                    <h3>이용약관 및 정책</h3>
                </div>
                <div className="policyBox">
                    <div className="policyMenuList">
                        <ul>
                            {/******** 클릭 된 메뉴 id값 *********/}
                            {policy.map((section, index) => (
                                <li>
                                    <Link to={{pathname: `/legal/${section.id}`}} onClick={() => contentChange(index)}>{section.tab}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="policyContents">
                        {(location.pathname === `/legal/${policy[1].id}`) ? policy[1].content : contentItem.content}
                    </div>
                </div>
            </div>
            </body>
        </div>
    );
}

export default Legal;