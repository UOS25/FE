import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/common/Navbar';
import './Returns.scss';

export default function Returns() {
    const searchRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [returnModalOpen, setReturnModalOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);

    const handleRowClick = (rowData) => {
        setSelectedRowData(rowData);
        setReturnModalOpen(true);
    };

    useEffect(() => {
        // 반품 전체 정보 불러오기
        axios.get('/returns/1').then((response) => {
            console.log(response.data);
            setProducts(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const activeEnter = (e) => {
        if (e.key === "Enter") {
            const searchValue = searchRef.current.value;
            searchItem(searchValue);
            searchRef.current.value = '';
        }
    }

    const searchItem = (barcode) => {
        axios
            .get(`/returns/1/${barcode}`)
            .then((response) => {
                setProducts(response.data.products);
            });
    }

    const toggleFilter = () => {
        setFilterOpen(!filterOpen);
    }

    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    const headers = [
        {
            text: '번호',
            value: 'barcode'
        },
        {
            text: '상품명',
            value: 'title'
        },
        {
            text: '반품 개수',
            value: 'returnQuantity'
        },
        {
            text: '반품 날짜',
            value: 'returnDate'
        },
        {
            text: '반품 상태',
            value: 'returnStatus'
        }
    ];

    return (
        <div id="return-body">
            <Navbar />
            <div className='container-home'>
                <div className='container-return'>
                    <h2 className='return-title'>반품 관리</h2>
                    <p>반품 관리에서는 원하는 상품 정보를 클릭하여 세부 정보를 확인하고 반품 처리할 수 있습니다.</p>
                    <div className='container-filter'>
                        <input className='search' placeholder='검색어를 입력하세요.' ref={searchRef} onKeyDown={activeEnter} />
                        <button className='filter-btn' onClick={toggleFilter}></button>
                        {filterOpen && (
                            <div className="filter-options">
                                <h3>정렬 방식</h3>
                                <p><input type="checkbox" name="sort" value="productName" /> 상품명</p>
                                <p><input type="checkbox" name="sort" value="returnQuantity" /> 반품 수</p>
                            </div>
                        )}
                    </div>

                    <div className='return-table'>
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
                            <tbody className='return-tbody'>
                                {/* 테이블 데이터 */}
                                {products.map((product, index) => (
                                    <tr
                                        key={product.id}
                                        className='table-row'
                                        onClick={() => handleRowClick(product)}
                                    >
                                        <td>{index + 1}</td>
                                        <td>{product.productInfo.productName}</td>
                                        <td>{product.ea}개</td>
                                        <td>{product.returnReason}</td>
                                        <td>{product.returnsStatus}</td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
