import { Table } from "antd"

const XlsFileReader = (props) => {
    const columns = props.data[0].map(e => {
        const temp = {    
            'title': e,
            'dataIndex': e,
            'key': e
        }
        return temp
    })

    const headers = props.data[0]
    const data = props.data.slice(1,props.data.length)
    const dataSource = data.map((e, i) => {
        const temp = {}
        temp['key'] = i
        for(let i=0; i<headers.length; i++) {
            temp[headers[i]] = e[i]
        }
        return temp;
    })
    
    return (<Table dataSource={dataSource} columns={columns} />);
}

export default XlsFileReader;