const DocFileReader = (props) => {
    return (
        (props.data).map((e,i) => {
        return (e===""?<br key={i}/>:<div key={i}>{e}</div>)
        })
    )
}

export default DocFileReader;