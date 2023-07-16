import { Typography } from "antd";
const { Title } = Typography;

const Navbar = () => {
    return(
        <div 
            style={{
             boxShadow: '1px 1px 10px #00000025',
             padding: '10px'
            }}
        >
            <Title level={4}
                style={{
                    margin: '0'
                }}>
                File Uploader and Content Reader
            </Title>
        </div>
    )
}

export default Navbar;