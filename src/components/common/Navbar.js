function Navbar() {
  function searchItem(event){
    console.log("아이템 찾기");
  }
  return (
    <header>
      <nav id="sidebarMenu" className="sidebar">
        <ul>
          <li><a href="/home">🏠 홈</a></li>
          <li><a href="/orders">📦 주문 관리</a></li>
          <li><a href="/">📄 영수증 조회</a></li>
          <li><a href="/">💸 수불 관리</a></li>
          <li><a href="/sales">📊 매출 통계</a></li>
          <li><a href="/">👨 직원 관리</a></li>
        </ul>
      </nav>
      <nav id="main-navbar" className="navbar">
        <div className="container-left">
            <a className="navbar-brand" href="/">
                <img className="navbar-logo" src="image/logo.jpg" height="75" alt="" loading="lazy"/>
                <p className="navbar-name">UOS25 편의점</p>
            </a>
            <form className="input-form" onSubmit={searchItem()}>
                <input autoComplete="off" type="search" className="form-control"
                    placeholder='Search (ctrl + "/" to focus)'/>
                <span className="input-icon"><i className="fas fa-search"></i></span>
            </form>
            <div className="container-login"></div>

        </div>
        <div className="container-right">
            <div className="alarm">♨</div>
            <div className="message">◎</div>
            <div className="indiv-info"><a href="/Login">Admin</a></div>


        </div>
      </nav>
  </header>

  );
}

export default Navbar;
