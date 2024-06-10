import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/common/Navbar';
import './Inventory.scss';
import InventoryProduct from '../components/modal/InventoryProduct';
import DiscardManagement from '../components/modal/DiscardManagement';

export default function Inventory() {
    const searchRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [inventoryModalOpen, setInventoryModalOpen] = useState(false);
    const [discardModalOpen, setDiscardModalOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);

    const handleRowClick = (rowData) => {
        setSelectedRowData(rowData);
        setInventoryModalOpen(true);
    };

    useEffect(() => {
        // 상품 전체 정보 불러오기
        axios.get('/inventory/1').then((response) => {
            console.log(response.data);
            setProducts(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const activeEnter = (e) => {
        if (e.key === "Enter") {
            const searchValue = searchRef.current.value;
            axios
            .get(`/inventory/1/productName/${searchValue}`)
            .then((response) => {
                console.log(response.data);
                setProducts([response.data]);
            });
            searchRef.current.value = '';
        }
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
            text: '재고 개수',
            value: 'price'
        },
        {
            text: '진열된 개수',
            value: 'enterprise'
        },
        {
            text: '입고 날짜',
            value: 'warehousingDate'
        }
    ];

    return (
        <div id="inventory-body">
            <Navbar />
            <div className='container-home'>
                <div className='container-inventory'>
                    <h2 className='inventory-title'>📦 재고 관리</h2>
                    <p>재고 관리에서는 원하는 상품 정보를 클릭하여 세부 정보를 확인하고 진열/폐기 처리할 수 있습니다.</p>
                    <div className='container-filter'>
                        <input className='search' placeholder='검색어를 입력하세요.' ref={searchRef} onKeyDown={activeEnter} />
                        <button className='filter-btn' onClick={toggleFilter}></button>
                        {filterOpen && (
                            <div className="filter-options">
                                <h3>정렬 방식</h3>
                                <p><input type="checkbox" name="sort" value="productName" /> 상품명</p>
                                <p><input type="checkbox" name="sort" value="ea" /> 재고 수</p>
                                <p><input type="checkbox" name="sort" value="displayEa" /> 진열된 수</p>
                            </div>
                        )}
                        <button className='ctrl-disposal' onClick={() => setDiscardModalOpen(true)}>폐기 관리</button>
                    </div>

                    <div className='inventory-table'>
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
                            <tbody className='inventory-tbody'>
                                {/* 테이블 데이터 */}
                                {products.map((product, index) => (
                                    <tr
                                        key={product.id}
                                        className='table-row'
                                        onClick={() => handleRowClick(product)}
                                    >
                                        <td>{index + 1}</td>
                                        <td>{product.productName}</td>
                                        <td>{product.ea}</td>
                                        <td>{product.displayEa}</td>
                                        <td>{formatDateTime(product.warehousingDate)}</td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                {
                    inventoryModalOpen &&
                    <InventoryProduct
                        inventoryModalOpen={inventoryModalOpen}
                        setInventoryModalOpen={setInventoryModalOpen}
                        selectedRowData={selectedRowData} />
                }
                {
                    discardModalOpen &&
                    <DiscardManagement
                        discardModalOpen={discardModalOpen}
                        setDiscardModalOpen={setDiscardModalOpen}
                    />
                }
            </div>
        </div>
    );
}
