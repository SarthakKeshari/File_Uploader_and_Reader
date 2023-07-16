var express = require('express');
const mammoth = require('mammoth');
const XLSX = require('xlsx');
var router = express.Router();
var fs = require('fs');

router.post('/', function(req, res) {
  const newpath = __dirname + "/files/";
  console.log(__dirname);
  const file = req.files.file;
  const filename = file.name;
 
  file.mv(`${newpath}${filename}`, (err) => {
    if (err) {
      console.log(err)
      res.status(500).send({ message: "File upload failed", code: 500 });
    }
    else{
      const fileExtension = filename.slice(filename.lastIndexOf("."))
      // console.log(fileExtension)
      if(fileExtension===".xls" || fileExtension===".xlsx") {
        readXls();
      }
      else if(fileExtension==='.doc' || fileExtension===".docx") {
        readDoc();
      }
      else {
        readTxt();
      }
      // res.status(200).send({ message: "File Uploaded", code: 200});
    }
  });

  // Putting timeout for delaying delete but ain't required.
  setTimeout(() => {
    fs.unlink(`${newpath}${filename}`, (err) => {
      if (err) throw err;
      console.log(`${filename} was deleted`);
    }); 
  }, 1000)

  const readTxt = () => {
    fs.readFile(`${newpath}${filename}`, 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error reading file' });
      }
      console.log(`Reading ${filename}`);
      // Process the file content as needed

      const cleanString = data.split('\r\n');

      // console.log(cleanString)
      // Send it back to the client
      res.json({ content: cleanString });
    })
  }

  const readDoc = () => {
    fs.readFile(`${newpath}${filename}`, 'binary', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error reading file' });
      }
      console.log(`Reading ${filename}`);
      // Process the file content as needed

      mammoth.extractRawText({ buffer: data })
      .then((result) => {
        const cleanString = result.value.trim().split('\n'); // Extracted text from the DOC file
        // console.log(cleanString.split('\r\n'));
        // Send it back to the client
        res.json({ content: cleanString });
      })
      .catch((error) => {
        console.error(error);
      });
    })
  }

  const readXls = () => {
    const workbook = XLSX.readFile(`${newpath}${filename}`);
    
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    console.log(`Reading ${filename}`);
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // Process the file content as needed
    const filteredData = jsonData.filter(row => Object.values(row).some(cellValue => cellValue !== ''));

    // console.log(filteredData)
    // Send it back to the client
    res.json({ content: filteredData });
  }
});


module.exports = router;
