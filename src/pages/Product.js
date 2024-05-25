import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import '../assets/css/Orders.css';

export default function Product(){
    const searchRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const navigate = useNavigate();

    const handleRowClick = (rowData) => {
        setSelectedRowData(rowData);
        console.log(rowData);
        navigate('/product/detail', { state: { rowData } });
    };

    useEffect(() => {
        console.log("렌더링되자마자 실행되는 useEffect");
        // 상품 전체 정보 불러오기
        axios.get('https://dummyjson.com/products', {

        }).then((response) => {
            // 상품 정보 리스트에 담기
            setProducts(response.data.products);
        })


    }, []);

    const activeEnter=(e) => {
        if(e.key === "Enter"){
            console.log("엔터키 입력");
            const searchValue = searchRef.current.value;
            searchItem(searchValue);
            searchRef.current.value = '';
            
        }
    }

    const searchItem = (searchValue) => {
        console.log("검색한 아이템: "+ searchValue);

        axios
        .get(`https://dummyjson.com/products/search?q=${searchValue}`, {
                headers: {

                },
            }).then((response) => {
                console.log(response);
                // 표에 반영하기
                setProducts(response.data.products);
            })
    }

    const headers = [
        {
            text: '번호',
            value: 'id'
        },
        {
            text: '상품명',
            value: 'title'
        },
        {
            text: '단가',
            value: 'price'
        },
        {
            text: '업체',
            value: 'brand'
        }
      ];
    
    const headerKey = headers.map((header) => header.value);
    return (
        <div id = "orders-body">
            <Navbar/>
            <div className='container-home'>
                <div className='container-orders'>
                    <h2 className='order-title'>🎁 상품 조회</h2>
                    <div className='container-filter'>
                        <input className='search' placeholder='검색어를 입력하세요.' ref={searchRef} onKeyDown={activeEnter}/>
                        <button className='filter-btn'></button>
                    </div>
                    
                    <div className='order-table'>
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
                            <tbody className='order-tbody'>
                                {/* 테이블 데이터 */}
                                {products.map(product => (
                                    <tr 
                                        key={product.id}
                                        className='table-row' 
                                        onClick={() => handleRowClick(product)}
                                    >
                                        <td>{product.id}</td>
                                        <td>{product.title}</td>
                                        <td>{product.price}</td>
                                        <td>{product.brand}</td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                
            </div>
        </div>
    )
}