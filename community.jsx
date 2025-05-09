import "../components/Layout/Layout";
import "./community.css";
const Community = () => {
    return ( 
        <>
        
        <div className="main">
            <span className="main-menu">MainMenu</span>
            <i className="fa-solid fa-greater-than"></i>
            <h5>Community</h5>
        </div>
        <div className="community"><img src="assets/community.png" alt="Community" /></div>
        <div className="title-box">
            <span className="title">Community</span>
            <span className="bio">Connect with others</span>
            <button><i className="fa-solid fa-pen-to-square"></i>
            New Chat
            </button>
        </div>
        <div className="grid-container">
            <div className="st-child">
                <span className="friend-span">Friend's Progress</span>
                <div className="progresss"> 
                <div className="name"><span>Name</span>
                <div className="user">
                    <img src="\assets\UserOne.png" alt="User one" />
                    <span>Username One</span>
                </div>
                <div>
                <div className="user">
                    <img src="\assets\UserTwo.png" alt="User Two" />
                    <span>Username Two</span>
                </div>
                </div>
                <div>
                <div className="user">
                    <img src="\assets\UserThree.png" alt="User Three" />
                    <span>Username Three</span>
                </div>
                </div>
                </div>
                <div className="steps"><span>Daily Steps</span>
                <div className="step">
                    <span className="percent">1000/2000</span>
                    <div className="track">
                    <span className="bar1"></span>
                    </div>
                    
                </div>
                <div className="step">
                <span className="percent">1500/2000</span>
                    <div className="track">
                    <span className="bar2" ></span>
                    </div>
                    
                </div>
                <div className="step">
                <span className="percent">300/2000</span>
                    <div className="track">
                    <span className="bar3"></span>
                    </div>
                    
                </div>
                </div>
                <div className="lweight"><span>Loose Weight</span>
                <div className="weight"><span>2/5kg</span></div>
                <div className="weight"><span>4/5kg</span></div>
                <div className="weight"><span>1/5kg</span></div>
                </div>
                <div className="drink"><span>Drink Water</span>
                <span>500/1000ltr</span>
                <span>900/1000ltr</span>
                <span>300/1000ltr</span></div>
                </div>

            </div>
            <div className="mix-container">
            <div className="nd-child">
            <span className="coach-span">Coaches Suggestions</span>
            <div className="coaches">
                <div className="coach">
                    <img src="\assets\CoachOne.png" alt="Coach One" />
                    <h4>Coach One</h4>
                    <span>3 mutual friends</span>
                    <button>Followed</button>
                </div>
                <div className="coach">
                    <img src="\assets\CoachTwo.png" alt="Coach Two" />
                    <h4>Coach Two</h4>
                    <span>2 mutual friends</span>
                    <button>Follow</button>
                </div>
                <div className="coach">
                    <img src="\assets\CoachThree (2).png" alt="Coach Three" />
                    <h4>Coach Three</h4>
                    <span>2 mutual friends</span>
                    <button>Follow</button>
                </div>
            </div>
            </div>
            <div className="rd-child">
            <span className="suggest-span">Friends Suggestions</span>
            <div className="friends">
                <div className="friend">
                    <img src="\assets\friendOne.png" alt="Friend One" />
                    <div className="friendBio">
                        <h5>Username One</h5>
                        <span>Coach and 2 others mutual friends</span>
                    </div>
                    <button>Add</button>
                </div>
                <div className="friend">
                    <img src="\assets\friendTwo.png" alt="Friend Two" />
                    <div className="friendBio">
                        <h5>Username Two</h5>
                        <span>3 mutual friends</span>
                    </div>
                    <button>Add</button>
                    </div>
                    <div className="friend">
                    <img src="\assets\friendThree.png" alt="Friend Three" />
                    <div className="friendBio">
                        <h5>Username Three</h5>
                    </div>
                    <button>Cancel</button>
                    </div>
            </div>
            </div>
            </div>
        </div>
        </>
    );
}
 
export default Community ;
