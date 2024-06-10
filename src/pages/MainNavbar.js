import React from 'react';
import './MainNavbar.scss'; // SCSS 파일을 추가하여 스타일을 적용합니다.

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
                        <img src="image/logo.jpg" alt="Logo"></img>
                    </a>
                </h1>
            </div>
        </header>
    );
}
