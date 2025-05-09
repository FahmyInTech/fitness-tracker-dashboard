import "../components/Layout/Layout";
import "./achievement.css";
const Achievement = () => {
    return ( 
        <>
        
        <div className="main">
            <span className="main-menu">MainMenu</span>
            <i className="fa-solid fa-greater-than"></i>
            <h5>Achievements</h5>
        </div>
        <div className="achieve"><img src="\assets\b2febf6d32bb938d46ab3418f9d36baf-removebg-preview 1.png" alt="Community" /></div>
        <div className="title-box">
            <span className="title">Achievements</span>
            <span className="bio">Keep going for more achievements</span>
            </div>
            <div className="btn">
                <div><button>Day</button></div>
                <div><button>Week</button></div>
                <div><button>Month</button></div>
            </div>
            <div className="mainContent">
                <div className="firstClass">
                    <div className="congrate">
                        <h5>Congratulations</h5>
                        <span>Best workout of the month</span>
                        <h2>85%</h2>
                        <span>of the target</span>
                        <img src="\assets\284a8d98a28c809ce6ceb51373ce52e4-removebg-preview 1.png" alt="" />
                    </div>
                    <div className="calories">
                        <div>
                        <i className="fa-solid fa-fire-flame-curved"></i>
                        <h2>Calories Lost</h2>
                        </div>
                        <div className="second">
                            <h3>5500</h3>
                            <span>kcal</span>
                        </div>
                        <div>
                        <i className="fa-solid fa-arrow-up">65 %</i>
                            <span >Compare to last month</span>
                        </div>
                    </div>
                    <div className="Heart-Rate">
                        <div>
                        <i className="fa-solid fa-heart-pulse"></i>
                        <h2>Heart Rate</h2>
                        </div>
                        <div className="second">
                            <h3>110</h3>
                            <span>bpm</span>
                        </div>
                        <div>
                        <i className="fa-solid fa-arrow-down">35 %</i>
                            <span >Compare to last month</span>
                        </div>
                    </div>
                </div>
                <div className="secondClass">
                <div className="stepss">
                        <div>
                        <i className="fa-solid fa-person-walking"></i>
                        <h2>Steps</h2>
                        </div>
                        <div className="second">
                            <h3>8.000</h3>
                            <span>steps</span>
                        </div>
                        <div>
                        <i className="fa-solid fa-arrow-up">35 %</i>
                            <span >Compare to last month</span>
                        </div>
                    </div>
                    <div className="ach">
                        <h3>History Achievements</h3>
                        <div>
                            <div className="target">
                                <img src="\assets\284a8d98a28c809ce6ceb51373ce52e4-removebg-preview 1.png" alt="Feb"/>
                                <span className="vertical"></span>
                                <div className="aH">
                                    <h5>Achievements of February</h5>
                                    <span>90% of target</span>
                                </div>
                            </div>
                            <div className="target ">
                                <img src="\assets\284a8d98a28c809ce6ceb51373ce52e4-removebg-preview 1.png" alt="Feb"/>
                                <span className="vertical"></span>
                                <div className="aH">
                                    <h5>Achievements of January</h5>
                                    <span>75% of target</span>
                                </div>
                            </div>
                            <div className="target">
                                <img src="\assets\284a8d98a28c809ce6ceb51373ce52e4-removebg-preview 1.png" alt="Feb"/>
                                <span className="vertical"></span>
                                <div className="aH">
                                    <h5>Achievements of December</h5>
                                    <span>50% of target</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default Achievement;