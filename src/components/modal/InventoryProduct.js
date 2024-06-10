import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InventoryProduct.scss';

const InventoryProduct = ({ inventoryModalOpen, setInventoryModalOpen, selectedRowData }) => {
    const [item, setItem] = useState({});
    const [actionType, setActionType] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        if (inventoryModalOpen) {
            axios.get(`product/${selectedRowData.barcode}`)
                .then((response) => {
                    console.log(response);
                    setItem(response.data);
                })
                .catch((error) => {
                    console.error("상품 정보를 불러오는데 실패했습니다.", error);
                });
        }
    }, [inventoryModalOpen, selectedRowData]);

    const handleAction = () => {
        const url = actionType === 'discard' ? `/disposal` : actionType === 'display' ? `/inventory` : `/returns`;
        const payload = {
            shopId: 1,
            barcode: selectedRowData.barcode,
            ea: quantity
        };

        axios.post(url, payload)
            .then(() => {
                alert(`${actionType === 'discard' ? '폐기' : actionType === 'display' ? '진열' : '반품'} 완료`);
                resetState();
                setInventoryModalOpen(false);
                window.location.reload();
            })
            .catch((error) => {
                console.error(`${actionType} 처리에 실패했습니다.`, error);
                alert(`${actionType} 처리에 실패했습니다.`);
            });
    };

    const resetState = () => {
        setActionType(null);
        setQuantity('');
    };

    useEffect(() => {
        // 테이블 데이터 설정
        setTableData([
            { label: '상품명', value: item.productName },
            { label: '단가', value: item.orderPrice },
            { label: '업체', value: item.enterprise },
            { label: '추가사항', value: item.description }
        ]);
    }, [item]);

    if (!inventoryModalOpen) return null;

    return (
        <div className={`modal-overlay ${inventoryModalOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <span className="close" onClick={() => setInventoryModalOpen(false)}>&times;</span>
                <h2>📦 상품 정보</h2>
                <table>
                    <tbody>
                        {tableData.map((data, index) => (
                            <tr key={index}>
                                <td>{data.label}</td>
                                <td>{data.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="button-group">
                    <button className="btn-display" onClick={() => setActionType('display')}>진열</button>
                    <button className="btn-return" onClick={() => setActionType('return')}>반품</button>
                    <button className="btn-discard" onClick={() => setActionType('discard')}>폐기</button>
                </div>
                {actionType && (
                    <div className="action-section">
                        <input
                            type="number"
                            placeholder={`${actionType === 'discard' ? '폐기' : actionType === 'display' ? '진열' : '반품'}할 개수 입력`}
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        <button className="btn-confirm" onClick={handleAction}>확인</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InventoryProduct;
