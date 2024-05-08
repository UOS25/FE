import React from 'react';
import Navbar from '../components/common/Navbar';
import '../assets/css/App.css';

export default function Home(selectable = false) {
    const headers = [
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Version',
          value: 'version'
        },
        {
          text: 'Launch Date',
          value: 'launch'
        }
      ];
    
      const items = [
        {
          name: 'React',
          version: '18.2.0',
          launch: '2013-05-29'
        },
        {
          name: 'Vue',
          version: '3.2.45',
          launch: '2014-02'
        },
        {
          name: 'jQuery',
          version: '3.3',
          disabled: true,
          launch: '2006-08-26'
        },
        {
          name: 'Svelte',
          version: '3.53.1',
          launch: '2016-11-26'
        }
       ];
    const headerKey = headers.map((header) => header.value);
    return (
        <div id='home_body'>
            <Navbar />
            <div className='container-home'>
                <div className='container-product-list'>
                    {/* 바코드 찍은 목록 */}
                    <div className='graph-product-list'>
                        <table>
                            <thead className='thead'>
                                {/* 테이블 헤드 */}
                                <tr className='table-tr'>
                                    {
                                        headers.map((header) => 
                                        <th className='table-header' key={header.text}>
                                            {header.text} {/* 컬럼명 바인딩 */}
                                        </th> 
                                        )
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {/* 테이블 데이터 */}
                                {
                                items.map((item, index) => (
                                    <tr key={index}>
                                    {/* headerKey를 순회하면서 key를 가져옴 */}
                                    { 
                                        headerKey.map((key) => 
                                        <td key={key + index}>
                                            {item[key]} {/* key로 객체의 값을 출력 */}
                                        </td>
                                        )
                                    }
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='container-calculate'>
                    {/* 바코드 입력 & 품목 정보 */}
                    <div className='calculate-header'>선택한 품목</div>
                    <div className='wrapper-calculate-list'>

                    </div>
                    <div className='wrapper-barcode'>
                        <div className='header-barcode'>바코드 입력</div>
                        <input className='input-barcode' placeholder='🛒 바코드를 입력해주세요.'></input>
                    </div>
                    <button className='rollback-button'>입력 초기화</button>
                    <button className='pay-button'>결제</button>
                </div>
            </div>
        </div>
    )
}