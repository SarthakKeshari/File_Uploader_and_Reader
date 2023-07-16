

const FileContentDisplay = (props) => {
    const data = props.displayData;

    return (
        <div>
            <br/>
            <h4>File Content Display</h4>
            <br/>
            {
               data.map(e => {
                return (<div key={e}>{e}</div>)
               })
            }
        </div>
    )
}

export default FileContentDisplay;