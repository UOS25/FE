import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import '../assets/css/Orders.css';
import OrderProduct from '../components/modal/OrderProduct';

export default function Product(){
    const searchRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [OrderModalOpen, setOrderModalOpen] = useState(false);
    const [serviceSelected, setServiceSelected] = useState(false);
    const [productSelected, setProductSelected] = useState(true);

    const handleRowClick = (rowData) => {
        setSelectedRowData(rowData);
        setOrderModalOpen(true);
        console.log(rowData);
    };

    useEffect(() => {
        console.log("렌더링되자마자 실행되는 useEffect");
        // 상품 전체 정보 불러오기
        axios.get('/product').then((response) => {
            console.log(response);
            // 상품 정보 리스트에 담기
            setProducts(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }, []);
    
    // const activeEnter=(e) => {
    //     if(e.key === "Enter"){
    //         console.log("엔터키 입력");
    //         const searchValue = searchRef.current.value;
    //         searchItem(searchValue);
    //         searchRef.current.value = '';
            
    //     }
    // }

    const handleProductClick = () => {

        axios
        .get(`/product`, {

            }).then((response) => {
                console.log(response);
                // 표에 반영하기
                setProducts(response.data);
                setProductSelected(true);
                setServiceSelected(false);
            })
    }

    const handleServiceClick = () => {
        axios.get(`/product/utility-service`)
        .then((response) => {
            setProducts(response.data);
            setServiceSelected(true);
            setProductSelected(false);
        })

        
    }


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
            text: '단가',
            value: 'price'
        },
        {
            text: '업체',
            value: 'enterprise'
        },
        {
            text: '추가사항',
            value: 'description'
        },
      ];
    
    const headerKey = headers.map((header) => header.value);
    return (
        <div id = "orders-body">
            <Navbar/>
            <div className='container-home'>
                <div className='container-orders'>
                    <div className='container-header'>
                        <h2 className={productSelected ? 'productSelected-title' : 'unselected-title'} onClick={handleProductClick}>🎁 상품 조회</h2>
                        <h2 className='order-border'>|</h2>
                        <h2 className={serviceSelected ? 'serviceSelected-title' : 'unselected-title'} onClick={handleServiceClick}>생활 서비스 조회</h2>
                    </div>
                    <p>상품 주문은 원하는 상품 정보를 클릭하여 주문을 할 수 있습니다. 전산 장애로 인해 전산 주문이 되지 않을 경우에는 본사 주문 관리자에게 연락하여 주시기 바랍니다.</p>
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
                                {products.map((product, index) => (
                                    <tr 
                                        key={product.id}
                                        className='table-row' 
                                        onClick={() => handleRowClick(product)}
                                    >
                                        <td>{index + 1}</td>
                                        <td>{product.productName}</td>
                                        <td>{product.orderPrice}</td>
                                        <td>{product.enterprise}</td>
                                        <td>{product.description}</td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                {
                    OrderModalOpen &&
                    <OrderProduct
                    OrderModalOpen = {OrderModalOpen}
                    setOrderModalOpen={setOrderModalOpen}
                    selectedRowData = {selectedRowData} />
                }
            </div>
        </div>
    )
}