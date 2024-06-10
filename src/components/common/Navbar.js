import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Attendance from '../modal/Attendance.js';
import '../modal/Attendance.scss';
import HQInfoModal from '../modal/HQInfoModal.js';
function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [isHQInfoModalOpen, setIsHQInfoModalOpen] = useState(false);

  const openAttendanceModal = () => {
    setIsAttendanceModalOpen(true);
  };

  const closeAttendanceModal = () => {
    setIsAttendanceModalOpen(false);
  };

  const toggleHQInfoModal = () => {
    setIsHQInfoModalOpen(!isHQInfoModalOpen);
  };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
  return (
    <header>
      <nav id="sidebarMenu" className="sidebar">
        <ul>
          <li><a href="/home">🏠 홈</a></li>
          <li><a href="/orders">🛒 주문 관리</a></li>
          <li><a href="/product">🎁 상품 조회 & 주문</a></li>
          <li><a href="/inventory">📦 재고 관리</a></li>
          <li><a href="/returns">🔄 반품 관리</a></li>
          <li><a href="/disburse">💸 수불 관리</a></li>
          <li><a href="/employee">👨 직원 관리</a></li>
          <li><a href="/events">🎊 이벤트 관리</a></li>
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
            <div className="HQ-info" onClick={toggleHQInfoModal}>본사 정보</div>
            <div className="commute" onClick={openModal}>📋 출근부</div>
            <div className="indiv-info">전농점</div>

            <Attendance isOpen={isModalOpen} onClose={closeModal} />
            <HQInfoModal isOpen={isHQInfoModalOpen} onClose={toggleHQInfoModal} />
        </div>
      </nav>
  </header>

  );
}

export default Navbar;
