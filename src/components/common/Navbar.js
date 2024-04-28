function Navbar() {

  return (
    <header>
      <nav id="sidebarMenu" className="sidebar">
        <ul>
          <li><a href="/">홈</a></li>
          <li><a href="/">상품 판매</a></li>
          <li><a href="/">영수증 조회</a></li>
          <li><a href="/">수불 관리</a></li>
        </ul>
      </nav>
      <nav id="main-navbar" className="navbar">
        <div className="container-left">
            <a className="navbar-brand" href="/">
                <img className="navbar-logo" src="image/logo.jpg" height="55" alt="" loading="lazy"/>
                <p className="navbar-name">UOS25 편의점</p>
            </a>
            <form className="input-form">
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
