import React from 'react';
import MainNavbar from './MainNavbar';
import './Main.scss'; // SCSS 파일을 추가하여 스타일을 적용합니다.

function AdSlider() {
    const [currentAd, setCurrentAd] = React.useState(0);
    const ads = ['image/ad1.jpg', 'image/ad2.jpg', 'image/ad3.jpg']; // 광고 이미지 경로 배열

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentAd((prevAd) => (prevAd + 1) % ads.length);
        }, 3000); // 3초마다 광고 변경

        return () => clearInterval(interval);
    }, [ads.length]);

    return (
        <div className="ad-slider">
            {ads.map((ad, index) => (
                <img
                    key={index}
                    src={ad}
                    alt={`Ad ${index + 1}`}
                    className={index === currentAd ? 'active' : ''}
                />
            ))}
        </div>
    );
}

function DynamicGif() {
    return (
        <div className="dynamic-gif">
            <img src="image/dynamic.gif" alt="Dynamic GIF" />
        </div>
    );
}

export default function MainPage() {
    return (
        <div className="main-page">
            <MainNavbar />
            <div className="content">
                <AdSlider />
                <DynamicGif />
            </div>
        </div>
    );
}
