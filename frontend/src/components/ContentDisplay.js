import React, { useEffect, useState } from "react";
import { Card, Empty, Typography } from "antd";
import DocFileReader from "./FileReaders/DocFileReader";
import TxtFileReader from "./FileReaders/TxtFileReader";
import XlsFileReader from "./FileReaders/XlsFileReader";

const { Title } = Typography;

const ContentDisplay = (props) => {
    const data = props.displayData;
    const filename = props.filename;


    const [display,setDisplay] = useState()

    useEffect(() => {
        if(data)
        {
            const fileExtension = filename.slice(filename.lastIndexOf("."))
            // console.log(fileExtension)

            // Here you can see two ways of calling a function one is shown in DocFileReader and other in TxtFileReader
            // In DocFileReader we are passing data as property and in TxtFileReader as a function parameter

            if(fileExtension===".xls" || fileExtension===".xlsx") {
                setDisplay(<XlsFileReader data={data}/>)
            }
            else if(fileExtension==='.doc' || fileExtension===".docx") {
                setDisplay(<DocFileReader data={data}></DocFileReader>)
            }
            else {
                setDisplay(TxtFileReader(data))
            }
        }
    },[data, filename])

    return(
        <>
            <Card>
                <Title level={5} style={{margin: '0'}}>File Content</Title>
            </Card>
            {data?
            <Card
                style={{
                    height: '35vh',
                    overflowY: 'scroll',
                    overflowX: 'hidden'
                }}>
                {
                    display
                }
            </Card>
            :
            <Card
                style={{
                    height: '40vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Empty/>
            </Card>
            }
        </>
    )
}

export default ContentDisplay;