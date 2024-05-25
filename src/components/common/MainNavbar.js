// 젤 위: 로그인, 점주 인증, 점주 광장
// 하단 navbar
// - 매장 소개
// - 상품/서비스
// - 매장 안내
// - 멤버십
// - 채용
// - 이벤트

export default function MainNavbar() {
    return (
        <header id="header">
            {/* Top navbar */}
            <div className="menu_util">
                <ul>
                    <li>
                        <a href="/login">로그인</a>
                    </li>
                    <li>
                        <a href="/">회원가입</a>
                    </li>
                    <li>
                        <a href="/home">점주광장</a>
                    </li>
                </ul>
            </div>
            
            {/* inner_wrap */}
            <div className="inner_wrap">
                <h1 className="logo">
                    <a href="/">
                        <picture>
                            <img src="image/logo.jpg" alt="Logo"></img>
                        </picture>
                    </a>
                </h1>
                <nav className="container-main-navbar">
                    <div className="main-navbar-wrapper">
                        <ul className="wrapper-navbar-list">
                            <li>
                                <a href="/">상품/서비스</a>
                            </li>
                            <li>
                                <a href="/">멤버십</a>
                            </li>
                            <li>
                                <a href="/">채용</a>
                            </li>
                            <li>
                                <a href="/event">이벤트</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    );
}
  
  