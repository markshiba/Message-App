import "./chatting-content.scss";

const ChattingContent = (_) => {
  return (
    <div className="chatting-content">
      <div className="chatting-content__header">Phan Thanh</div>
      <div className="chatting-content__body">body</div>
      <div className="chatting-content__footer">
        <div className="send-message">
          <input
            type="text"
            placeholder="Type a message here"
            // onChange={this.onStateChange}
            // value={this.state.msg}
          />
          <button className="btnSendMsg" id="sendMsgBtn">
            {/* <i className="fa fa-paper-plane"></i> */}
            send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChattingContent;
