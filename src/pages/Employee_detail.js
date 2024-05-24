export default function Employee({ rowData }){
    console.log(rowData);
    if (!rowData) {
        return <div>No data available</div>;
    }
    return (
        <div>
            <h2>{rowData.firstName} Detail</h2>
            <p>ID: {rowData.id}</p>
            <p>Name: {rowData.firstName}</p>
            <p>Age: {rowData.age}</p>
        </div>
    )
}