import React, {useRef} from 'react';
import MainNavbar from './MainNavbar';
import './Main.scss'; // SCSS 파일을 추가하여 스타일을 적용합니다.
import Video from "../assets/css/video.mp4"

export default function MainPage() {
    const shopId = localStorage.getItem("shopId");
    
    const handleStartClick = () => {
        localStorage.setItem("shopId", 1);
        window.location.href="/home"
    }
    return (
        <div className="main-page">
            <div className='ad-container'>
                <div className='ad-content'>
                    <button onClick={() => {handleStartClick()}}>시작하기</button>
                </div>
            </div>
        </div>
    );
}
