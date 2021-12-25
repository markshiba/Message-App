import "./online-list.scss";

const OnlineList = () => {
  return (
    <div className="main__chatlist">
      <div className="chatlist__heading">
        <h2>Online Friend</h2>
      </div>
      <div className="chatList__search">
        <div className="search_wrap">
          <input type="text" placeholder="Search Here" required />
          <button className="search-btn">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
      <div className="chatlist__items">
        <div>Online user</div>
      </div>
    </div>
  );
};

export default OnlineList;
