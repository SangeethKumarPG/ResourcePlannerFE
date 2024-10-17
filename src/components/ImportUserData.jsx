import { Button, TextField, Typography } from "@mui/material";
import React from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";

function ImportUserData() {
  const [fileName, setFileName] = React.useState("");
  return (
    <>
      <h5 className="my-2">Upload SpreadSheet Data</h5>
      <div className="d-flex justify-content-center flex-column w-100">
        <input
          accept=".csv,.xls,.xlsx"
          type="file"
          id="file-upload"
          className="my-2"
          style={{display: "none"}}
          onChange={(e) => {setFileName(e.target.files[0].name)}}
        />
        <label htmlFor="file-upload">
          <Button variant="contained" component="span" fullWidth
          startIcon={<AttachFileIcon />}
          >
            Choose a File
          </Button>
        </label>
        <Typography variant="body"className="my-1">
          {fileName !== ""? 
            fileName : <p>Only .csv,.xls,.xlsx files are supported.</p>
          }
         
        </Typography>
      </div>
    </>
  );
}

export default ImportUserData;
