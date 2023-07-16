import { SyncOutlined } from "@ant-design/icons"
import { FloatButton } from "antd"

const RefreshButton = () => {
    return(
    <FloatButton icon={<SyncOutlined />} 
        type="primary"
        style={{
            right: 24,
        }}
        onClick={()=>{window.location.reload();}}
      />
    )
}

export default RefreshButton;