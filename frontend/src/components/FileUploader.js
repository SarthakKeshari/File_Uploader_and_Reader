import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import ContentDisplay from './ContentDisplay';
const { Dragger } = Upload;

const FileUploader = () => { 
    const [displayData, setDisplayData] = useState();
    const [filename, setFilename] = useState();

    const props = {
        name: 'file',
        action: 'http://localhost:8080/fileread',
        accept: ".doc, .docx, .xlsx, .txt, .xls",
        onChange(info) {
          const { status } = info.file;
          if (status !== 'uploading') {
            // console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            setDisplayData(info.file.response.content)
            setFilename(info.file.name)
            message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
              message.error(`${info.file.name} file upload failed.`);

              // Auto page refresh in case of failure in file upload.
              setTimeout(() => {
                window.location.reload();
              },1000)
          }
        },
        onDrop(e) {
          console.log('Dropped files', e.dataTransfer.files);
        },
      };

    return(
    <>
        <Dragger {...props} disabled={displayData?true:false}>
            <p className="ant-upload-drag-icon">
            <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
            Support for a single file upload only. Strictly prohibited from uploading company data or other
            banned files.
            </p>
            <small><b>Supported file formats are - .doc, .docx, .xlsx, .txt, .xls</b></small>
        </Dragger>
        <div style={{marginTop: '40px'}}>
            <ContentDisplay displayData={displayData} filename={filename}></ContentDisplay>
        </div>
    </>
)};

export default FileUploader