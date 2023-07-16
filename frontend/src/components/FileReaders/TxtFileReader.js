const TxtFileReader = (data) => {
    return (
        data.map((e,i) => {
        return (e===""?<br key={i}/>:<div key={i}>{e}</div>)
        })
    )
}

export default TxtFileReader;