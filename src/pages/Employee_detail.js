import './Employee_detail.css';
export default function Employee({ employee }){
    console.log(employee);

    const handleEditClick = () => {
        // 이력서 수정 페이지로 이동하는 코드 추가

    };

    if (!employee) {
        return <div>No data available</div>;
    }
    return (
        <div className="resume-container">
            <h1 className="resume-title">직원 정보</h1>
            <button className="edit-button" onClick={handleEditClick}>수정</button>
            <div className="resume-section">
                <h2 className="section-title">개인 정보</h2>
                <div className="section-content">
                    <p><strong>이름:</strong> {employee.employeeName}</p>
                    <p><strong>직급:</strong> {employee.position}</p>
                    <p><strong>주민등록번호:</strong> {employee.registrationNumber}</p>
                </div>
            </div>
            <div className="resume-section">
                <h2 className="section-title">급여 정보</h2>
                <div className="section-content">
                    <p><strong>월급:</strong> {employee.salary}</p>
                    <p><strong>업무 시간:</strong> {employee.partTime}</p>
                    <p><strong>계좌번호:</strong> {employee.account}</p>
                </div>
            </div>
            <div className="resume-section">
                <h2 className="section-title">지점 정보</h2>
                <div className="section-content">
                    <p><strong>지점 이름:</strong> {employee.shopName}</p>
                </div>
            </div>
        </div>
    )
}