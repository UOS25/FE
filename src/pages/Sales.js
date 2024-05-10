import React from 'react';
import Navbar from '../components/common/Navbar';
import '../assets/css/Sales.css';

export default function Sales() {
    return (
        <div id='body'>
            <Navbar />
            <div className='container-sales'>
                {/* <div className='header-sales'>
                    <div id="menuToggle">
                        <input type='checkbox' id='icon'/>
                        <label for="icon">
                            <span></span>
                            <span></span>
                            <span></span>
                        </label>
                    </div>
                </div> */}
                <div className='content-sales' id='sales-status'>
                {/* https://velog.io/@eunjin/React-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B7%B8%EB%9E%98%ED%94%84%EC%B0%A8%ED%8A%B8-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EB%AA%A8%EC%9D%8C */}
                    <h3 className='title'>📊 매출 통계 <button type='reset'>새로고침 버튼</button></h3>
                    <div className='content'>일일 판매 https://nivo.rocks/pie/</div>
                </div>
            </div>
        </div>
    )
}