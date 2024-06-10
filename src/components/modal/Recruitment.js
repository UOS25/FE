import axios from "axios";
import { useEffect, useState } from "react";
import styles from './Recruitment.module.scss'; // CSS 모듈 import

const Recruitment = ({ setIsModalOpen, isModalOpen }) => {
    useEffect(() => {
        setIsModalOpen(true);
    }, []);

    const [newEmployee, setNewEmployee] = useState({
        employeeId: '',
        employeeName: '',
        position: '점원', // 기본 값 설정
        registrationNumber: '',
        salary: '',
        partTime: 'DAY', // 기본 값 설정
        bank: '농협은행', // 기본 값 설정
        account: '',
        photo: null
    });

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'photo') {
            setNewEmployee(prevState => ({
                ...prevState,
                [name]: files[0]
            }));
        } else {
            setNewEmployee(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(newEmployee).forEach(key => {
            formData.append(key, newEmployee[key]);
        });

        // 여기서 새 직원 정보를 서버에 전송하는 로직을 추가할 수 있습니다.
        axios.post(`/employee`, {
            employeeName: newEmployee.employeeName,
            position: newEmployee.position,
            registrationNumber: newEmployee.registrationNumber,
            salary: newEmployee.salary,
            partTime: newEmployee.partTime,
            account: newEmployee.account,
            bank: newEmployee.bank,
            shopId: 1
        })
        .then((response) => {
            console.log(response);
            alert("직원 등록에 성공하였습니다.");
            setIsModalOpen(false);
            window.location.reload();
        })
        .catch((error) => {
            alert(error);
        });
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <button className={styles.modalCloseBtn} onClick={() => setIsModalOpen(false)}>X</button>
                <h2>새 직원 등록</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="employeeName">이름:</label>
                        <input type="text" id="employeeName" name="employeeName" value={newEmployee.employeeName} onChange={handleInputChange} />
                    </div>
                    <div className={styles.formGroup2}>
                        <div className={styles.formGroup}>
                            <label htmlFor="position">직급:</label>
                            <select id="position" name="position" value={newEmployee.position} onChange={handleInputChange}>
                                <option value="점장">점장</option>
                                <option value="점원">점원</option>
                                <option value="매니저">매니저</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="partTime">업무 시간:</label>
                            <select id="partTime" name="partTime" value={newEmployee.partTime} onChange={handleInputChange}>
                                <option value="DAY">DAY</option>
                                <option value="NIGHT">NIGHT</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="registrationNumber">주민등록번호:</label>
                        <input type="text" id="registrationNumber" name="registrationNumber" value={newEmployee.registrationNumber} onChange={handleInputChange} />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="salary">시급:</label>
                        <input type="text" placeholder="원 단위로 입력하세요." id="salary" name="salary" value={newEmployee.salary} onChange={handleInputChange} />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="bank">은행명:</label>
                        <select id="bank" name="bank" value={newEmployee.bank} onChange={handleInputChange}>
                            <option value="농협은행">농협은행</option>
                            <option value="기업은행">기업은행</option>
                            <option value="우리은행">우리은행</option>
                            <option value="카카오뱅크">카카오뱅크</option>
                            <option value="하나은행">하나은행</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="account">계좌번호:</label>
                        <input type="text" id="account" name="account" value={newEmployee.account} onChange={handleInputChange} />
                    </div>
                    {/* <div className={styles.formGroup}>
                        <label htmlFor="photo">사진:</label>
                        <input type="file" id="photo" name="photo" accept="image/*" onChange={handleInputChange} />
                    </div> */}
                    <button type="submit">등록</button>
                </form>
            </div>
        </div>
    );
};

export default Recruitment;
