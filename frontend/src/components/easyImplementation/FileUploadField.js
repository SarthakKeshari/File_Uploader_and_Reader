import { useState } from 'react';
import FileContentDisplay from './FileContentDisplay'
import axios from 'axios';


const FileUploadField = () => {

    const [displayData, setDisplayData] = useState();

        const uploadFile = async (e) => {
            const formData = new FormData();
            console.log(e.target.files[0])
            formData.append("file", e.target.files[0]);
            formData.append("fileName",  e.target.files[0].name);
            try {
              const res = await axios.post(
                "http://localhost:8080/fileread",
                formData
              );
              console.log(res);
              setDisplayData(res.data.content);
            } catch (ex) {
              console.log(ex);
            }
          };

    return (
        <div>
            <br/>
            <br/>
            Upload File Here
            <br/>
            <br/>
            <input
            type="file"
            id="filepicker"
            onChange={uploadFile}
            accept=".doc,.docx,.xlxs,application/msword,.txt,.xls" />
            <br/>
            <br/>
            {displayData?<FileContentDisplay displayData={displayData}></FileContentDisplay>:<></>}
        </div>
    )
}

export default FileUploadField;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function FileUploadField() {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   useEffect(() => {
//     console.log(file)
//   }, [file])

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (file) {
//       const formData = new FormData();
//       formData.append('file', file);
//       console.log(formData)

//       try {
//         const response = await axios.post('http://localhost:8080/fileread', formData);
//         console.log("Error Line 18");
//         console.log(response.data); // File content received from the server
//       } catch (error) {
//         console.log("Error Line 21");
//         console.error(error);
//       }
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input type="file" onChange={handleFileChange} />
//         <button type="submit">Upload</button>
//       </form>
//     </div>
//   );
// }

// export default FileUploadField;