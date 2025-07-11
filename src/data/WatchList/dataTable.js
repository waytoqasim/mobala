import ImportExportIcon from '@mui/icons-material/ImportExport';
const dataTable={
    columns: [
      { label: " ", field: " ", sort: "asc", width: 300, sort: "disabled" },
      {
        label: (
          <div style={{display:"flex",marginBottom:"-14px",cursor:"pointer"}}>
             <ImportExportIcon />
            <p style={{whiteSpace:"nowrap"}}>You Give</p>
          </div>
        ),
        field: "You Give",
        sort: "asc",
        width: "300px",
      },
      {
        label: (
          <div style={{display:"flex",marginBottom:"-14px",cursor:"pointer"}}>
            <ImportExportIcon />
            <p style={{whiteSpace:"nowrap"}}>Give Country</p>
          </div>
        ),
        field: "Give Country",
        sort: "asc",
        width: 2,
      },
      {
        label: (
          <div style={{display:"flex",marginBottom:"-14px",cursor:"pointer"}}>
            <ImportExportIcon />
            <p style={{whiteSpace:"nowrap"}}>You Take</p>
          </div>
        ),
        field: "You Take",
        sort: "asc",
        width: 200,
      },
      {
        label: (
          <div style={{display:"flex",marginBottom:"-14px",cursor:"pointer"}}>
            <ImportExportIcon />
            <p style={{whiteSpace:"nowrap"}}>Take Country</p>
          </div>
        ),
        field: "Take Country",
        sort: "asc",
        width: 200,
      },
      {
        label:  <p style={{whiteSpace:"nowrap",cursor:"pointer",marginBottom:"0px"}}>Google Rates *</p>,
        field: "Google Rates *",
        sort: "asc",
        width: 200,
      },
      {
        label: <p style={{whiteSpace:"nowrap",marginBottom:"0px",cursor:"pointer"}}>Mobala FX Deal **</p>,
        field: "Mobala FX **",
        sort: "asc",
        width: 300,
      },
      {
        sort: "disabled",
        label: "",
        field: "",
        width: 100,
      },
    ],
    rows: [],
  }
  export default dataTable;