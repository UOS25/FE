import React from 'react';
import "../assets/css/main.css";
import MainNavbar from '../components/common/MainNavbar';

export default function Main() {
    return (
        <div className='container_main'>
            <MainNavbar/>
            <section className='event_banner'>
                <div className='inner_wrap'>
                    <div className='event_image'>
                        <a href='/'> {/* DB에서 이벤트 ID 가져오기 */}
                            <img src='image/event_banner_ex.png' alt='DB에서 이벤트 이미지 가져오기'></img>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}