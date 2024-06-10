import React, { useState, useRef } from 'react';
import styles from './AttendanceLog.module.scss';
import './Attendance.scss';
import axios from 'axios';

const Attendance = ({ isOpen, onClose }) => {
    const [employeeId, setEmployeeId] = useState('');
    const [employeeName, setEmployeeName] = useState('');
    const [isWorking, setIsWorking] = useState(false);
    const [showAttendanceLog, setShowAttendanceLog] = useState(false);
    const [attendanceLog, setAttendanceLog] = useState([]);
    const employeeNameRef = useRef(null);
    const [employeeInfo, setEmployeeInfo] = useState(null);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    const handleEmpName = (employeeName) => {
        axios.get(`/employee/search/1/${employeeName}`)
            .then((response) => {
                console.log(response.data);
                setEmployeeInfo(response.data);  // 직원 정보 업데이트
            })
            .catch((error) => {
                console.error("직원 정보를 불러오는데 실패했습니다.", error);
                setEmployeeInfo(null);  // 검색 실패 시 정보 초기화
            });
    }
    
    const handleCheckIn = (employeeId) => {
        axios.get(`/employee/work/${employeeId}/start`)
            .then((response) => {
                setIsWorking(true);
                alert('출근 완료');
            })
            .catch((error) => {
                alert('이미 출근 상태입니다.');
            });
        employeeNameRef.current.value = '';
    };

    const handleCheckOut = (employeeId) => {
        axios.put(`/employee/work/${employeeId}/end`)
            .then((response) => {
                setIsWorking(false);
                alert('퇴근 완료');
            })
            .catch((error) => {
                alert('이미 퇴근 상태입니다.');
            });
        employeeNameRef.current.value = '';
    };

    const handleShowAttendanceLog = () => {
        axios.get(`/employee/work/shop/1`)
            .then((response) => {
                setAttendanceLog(response.data);
                console.log(response.data);
                setShowAttendanceLog(true);
            })
            .catch((error) => {
                alert('출근 내역을 불러오는데 실패했습니다.');
            });
    };

    const handleCloseAttendanceLog = () => {
        setShowAttendanceLog(false);
    };

    if (!isOpen) return null;

    return (
        <div className="attendance-modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <div className="modal-header">
                    <h2>출근부</h2>
                    <h2 className="tooltip" onClick={handleShowAttendanceLog}>📋
                        <span className="tooltiptext">전체 출근부 보기</span>
                    </h2>
                </div>
                {!showAttendanceLog ? (
                    <div>
                        <div className="form-group">
                            <label htmlFor="employeeName">직원 이름:</label>
                            <input
                                type="text"
                                id="employeeName"
                                value={employeeName}
                                ref={employeeNameRef}
                                onChange={(e) => setEmployeeName(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleEmpName(e.target.value);
                                    }
                                }}
                            />
                        </div>
                        {employeeInfo && (  // 직원 정보가 있을 때만 테이블 표시
                            <table className="employee-info-table">
                                <thead>
                                    <tr>
                                        <th>번호</th>
                                        <th>이름</th>
                                        <th>직책</th>
                                        <th>업무 시간</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employeeInfo.map((employee, index) => (
                                        <tr key={employee.id} onClick={() => setEmployeeId(employee.employeeId)}>
                                            <td>{index + 1}</td>
                                            <td>{employee.employeeName}</td>
                                            <td>{employee.position}</td>
                                            <td>{employee.partTime}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        <div className="button-group">
                            <button onClick={() => handleCheckIn(employeeId)}>출근</button>
                            <button onClick={() => handleCheckOut(employeeId)}>퇴근</button>
                        </div>
                    </div>
                ) : (
                    <div className={styles.attendanceLog}>
                        <button className={styles.closeButton} onClick={handleCloseAttendanceLog}>닫기</button>
                        <table className={styles.attendanceTable}>
                            <thead>
                                <tr>
                                    <th>번호</th>
                                    <th>직원 이름</th>
                                    <th>시작 날짜/시각</th>
                                    <th>종료 날짜/시각</th>
                                    <th>근무 시간</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendanceLog.map((log, index) => (
                                    <tr key={log.employeeWorkingHistoryId}>
                                        <td>{index + 1}</td>
                                        <td>{log.employeeName}</td>
                                        <td>{formatDate(log.startDateTime)}</td>
                                        <td>{formatDate(log.endDateTime)}</td>
                                        <td>{log.workingHour} 시간</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Attendance;
