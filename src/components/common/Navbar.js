import React, { useEffect } from 'react';
import axios from 'axios';

function Navbar() {
  return (
    <header>
      <nav id="sidebarMenu" className="sidebar">
        <ul>
          <li><a href="/home">🏠 홈</a></li>
          <li><a href="/orders">🛒 주문 관리</a></li>
          <li><a href="/product">🎁 상품 조회</a></li>
          <li><a href="/home">📦 재고 관리</a></li>
          <li><a href="/receipt">📄 영수증 조회</a></li>
          <li><a href="/">💸 수불 관리</a></li>
          <li><a href="/sales">📊 매출 통계</a></li>
          <li><a href="/employee">👨 직원 관리</a></li>
        </ul>
      </nav>
      <nav id="main-navbar" className="navbar">
        <div className="container-left">
            <a className="navbar-brand" href="/">
                <img className="navbar-logo" src="image/logo.jpg" height="75" alt="" loading="lazy"/>
                <p className="navbar-name">UOS25 편의점</p>
            </a>

        </div>
        <div className="container-right">
            <div className="indiv-info"><a href="/Login">Admin</a></div>


        </div>
      </nav>
  </header>

  );
}

export default Navbar;
