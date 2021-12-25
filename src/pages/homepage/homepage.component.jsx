import React from "react";

import ChattingContent from "../../components/chatting-content/chatting-content";
import OnlineList from "../../components/online-list/online-list.component";

import "./homepage.styles.scss";

const HomePage = (props) => {
  return (
    <div className="section">
      <div className="chatting">
        <ChattingContent />
        <OnlineList />
      </div>
    </div>
  );
};

export default HomePage;
