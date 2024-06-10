import React, { useState } from 'react';
import styles from './Employee_detail.module.scss';
import axios from 'axios';

export default function Employee({ employee }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editableEmployee, setEditableEmployee] = useState({ ...employee });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableEmployee(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSaveClick = () => {
        // 여기에 수정된 데이터를 서버에 전송하는 로직 추가
        axios.patch(`/employee`, {
            employeeId: editableEmployee.employeeId,
            employeeName: editableEmployee.employeeName,
            position: editableEmployee.position,
            registrationNumber: editableEmployee.registrationNumber,
            salary: editableEmployee.salary,
            partTime: editableEmployee.partTime,
            account: editableEmployee.account,
            bank: editableEmployee.bank,
            shopId: 1
        }).then(() => {
            alert("직원 정보가 수정되었습니다.");
            setIsEditing(false);
        })
        .catch(() => {
            alert("작업이 처리되지 않았습니다.");
        })
        console.log('Saved data:', editableEmployee);
    };

    const handleLeaveClick = (employeeId) => {
        console.log("직원 아이디: ", employeeId);
        axios.patch(`/employee/${employeeId}`)
        .then(() => {
            alert("직원이 퇴사처리되었습니다.");
        })
        .catch(() => {
            alert("작업이 처리되지 않았습니다.");
        })
    }

    const handleSalaryClick = (employeeId) => {
        axios.post(`/disburse/salary-calculation`, {
            employeeId: employeeId,
            date: new Date()
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            alert(error.response.data.message);
        })
    }
    if (!employee) {
        return <div>No data available</div>;
    }

    return (
        <div className={styles.resumeContainer}>
            <h1 className={styles.resumeTitle}>직원 정보</h1>
            {isEditing ? (
                <button className={styles.saveButton} onClick={handleSaveClick}>저장</button>
            ) : (
                <button className={styles.editButton} onClick={handleEditClick}>수정</button>
            )}
            <button className={styles.editButton} onClick={() => handleLeaveClick(employee.employeeId)}>퇴사</button>
            <button className={styles.editButton} onClick={() => handleSalaryClick(employee.employeeId)}>급여 정산</button>
            <div className={styles.resumeSection}>
                <h2 className={styles.sectionTitle}>개인 정보</h2>
                <div className={styles.sectionContent}>
                    <p>
                        <strong>이름: </strong>
                        {isEditing ? (
                            <input
                                type="text"
                                name="employeeName"
                                value={editableEmployee.employeeName}
                                onChange={handleChange}
                            />
                        ) : (
                            employee.employeeName
                        )}
                    </p>
                    <p>
                        <strong>직급: </strong>
                        {isEditing ? (
                            <input
                                type="text"
                                name="position"
                                value={editableEmployee.position}
                                onChange={handleChange}
                            />
                        ) : (
                            employee.position
                        )}
                    </p>
                    <p>
                        <strong>주민등록번호: </strong>
                        {isEditing ? (
                            <input
                                type="text"
                                name="registrationNumber"
                                value={editableEmployee.registrationNumber}
                                onChange={handleChange}
                            />
                        ) : (
                            employee.registrationNumber
                        )}
                    </p>
                </div>
            </div>
            <div className={styles.resumeSection}>
                <h2 className={styles.sectionTitle}>급여 정보 </h2>
                <div className={styles.sectionContent}>
                    <p>
                        <strong>시급: </strong>
                        {isEditing ? (
                            <input
                                type="text"
                                name="salary"
                                value={editableEmployee.salary}
                                onChange={handleChange}
                            />
                        ) : (
                            employee.salary
                        )}
                    </p>
                    <p>
                        <strong>업무 시간: </strong>
                        {isEditing ? (
                            <input
                                type="text"
                                name="partTime"
                                value={editableEmployee.partTime}
                                onChange={handleChange}
                            />
                        ) : (
                            employee.partTime
                        )}
                    </p>
                    <p>
                        <strong>은행명: </strong>
                        {isEditing ? (
                            <input
                                type="text"
                                name="account"
                                value={editableEmployee.bank}
                                onChange={handleChange}
                            />
                        ) : (
                            employee.bank
                        )}
                    </p>
                    <p>
                        <strong>계좌번호: </strong>
                        {isEditing ? (
                            <input
                                type="text"
                                name="account"
                                value={editableEmployee.account}
                                onChange={handleChange}
                            />
                        ) : (
                            employee.account
                        )}
                    </p>
                </div>
            </div>
            <div className={styles.resumeSection}>
                <h2 className={styles.sectionTitle}>지점 정보</h2>
                <div className={styles.sectionContent}>
                    <p>
                        <strong>지점 이름: 전농점</strong>
                        {isEditing ? (
                            <input
                                type="text"
                                name="shopName"
                                value={editableEmployee.shopName}
                                onChange={handleChange}
                            />
                        ) : (
                            employee.shopName
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}
