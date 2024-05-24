import React from 'react';
import Navbar from '../components/common/Navbar';
import '../assets/css/Sales.css';
import { ResponsiveBar } from '@nivo/bar';

const Sales = () => {
    const handle = {
        barClick: (data: any) => {
            console.log(data);
        },

        legendClick: (data: any) => {
            console.log(data);
        },
    };

    return (
        // chart height이 100%이기 때문이 chart를 덮는 마크업 요소에 height 설정
        <div>
            <Navbar />
            <div className='container-sales'>
                <div className='content-sales' id='sales-status'>
                {/* https://velog.io/@eunjin/React-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B7%B8%EB%9E%98%ED%94%84%EC%B0%A8%ED%8A%B8-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EB%AA%A8%EC%9D%8C */}
                    <h3 className='title'>📊 매출 통계 <button type='reset'>새로고침 버튼</button></h3>
                    <div className='content'>일일 판매 https://nivo.rocks/pie/</div>
                    <div className='content'>성별 https://nivo.rocks/pie/</div>
                </div>
            <ResponsiveBar 
                /* chart에 사용될 데이터 */
                data={[
                    { bottle: '365ml', cola: 1200, cidar: 1000, fanta: 1100 },
                    { bottle: '500ml', cola: 2200, cidar: 2000, fanta: 2100 },
                    { bottle: '1000ml', cola: 3200, cidar: 3000, fanta: 3100 },
                ]}
                /* chart에 보여질 데이터 key (측정되는 값) */
                keys={['cola', 'cidar', 'fanta']}
                /* keys들을 그룹화하는 index key (분류하는 값) */
                indexBy="bottle"
                /* chart margin */
                margin={{ top: 50, right: 130, bottom: 50, left: 160 }}
                /* chart padding (bar간 간격) */
                padding={0.3}
                /* chart 색상 */
                colors={['olive', 'brown', 'orange']} // 커스터하여 사용할 때
                // colors={{ scheme: 'nivo' }} // nivo에서 제공해주는 색상 조합 사용할 때
                /* color 적용 방식 */
                colorBy="id" // 색상을 keys 요소들에 각각 적용
                // colorBy="indexValue" // indexBy로 묵인 인덱스별로 각각 적용
                theme={{
                    /* label style (bar에 표현되는 글씨) */
                    labels: {
                        text: {
                            fontSize: 14,
                            fill: '#000000',
                        },
                    },
                    /* legend style (default로 우측 하단에 있는 색상별 key 표시) */
                    legends: {
                        text: {
                            fontSize: 12,
                            fill: '#000000',
                        },
                    },
                    axis: {
                        /* axis legend style (bottom, left에 있는 글씨) */
                        legend: {
                            text: {
                                fontSize: 20,
                                fill: '#000000',
                            },
                        },
                        /* axis ticks style (bottom, left에 있는 값) */
                        ticks: {
                            text: {
                                fontSize: 16,
                                fill: '#000000',
                            },
                        },
                    },
                }}
                /* axis bottom 설정 */
                axisBottom={{
                    tickSize: 5, // 값 설명하기 위해 튀어나오는 점 크기
                    tickPadding: 5, // tick padding
                    tickRotation: 0, // tick 기울기
                    legend: 'bottle', // bottom 글씨
                    legendPosition: 'middle', // 글씨 위치
                    legendOffset: 40, // 글씨와 chart간 간격
                }}
                /* axis left 설정 */
                axisLeft={{
                    tickSize: 5, // 값 설명하기 위해 튀어나오는 점 크기
                    tickPadding: 5, // tick padding
                    tickRotation: 0, // tick 기울기
                    legend: 'price', // left 글씨
                    legendPosition: 'middle', // 글씨 위치
                    legendOffset: -60, // 글씨와 chart간 간격
                }}
                /* label 안보이게 할 기준 width */
                labelSkipWidth={36}
                /* label 안보이게 할 기준 height */
                labelSkipHeight={12}
                /* bar 클릭 이벤트 */
                onClick={handle.barClick}
                /* legend 설정 (default로 우측 하단에 있는 색상별 key 표시) */
                legends={[
                    {
                        dataFrom: 'keys', // 보일 데이터 형태
                        anchor: 'bottom-right', // 위치
                        direction: 'column', // item 그려지는 방향
                        justify: false, // 글씨, 색상간 간격 justify 적용 여부
                        translateX: 120, // chart와 X 간격
                        translateY: 0, // chart와 Y 간격
                        itemsSpacing: 2, // item간 간격
                        itemWidth: 100, // item width
                        itemHeight: 20, // item height
                        itemDirection: 'left-to-right', // item 내부에 그려지는 방향
                        itemOpacity: 0.85, // item opacity
                        symbolSize: 20, // symbol (색상 표기) 크기
                        effects: [
                            {
                                // 추가 효과 설정 (hover하면 item opacity 1로 변경)
                                on: 'hover',
                                style: {
                                    itemOpacity: 1,
                                },
                            },
                        ],
                        onClick: handle.legendClick, // legend 클릭 이벤트
                    },
                ]}
            />
            </div>
        </div>
    );
};

export default Sales;