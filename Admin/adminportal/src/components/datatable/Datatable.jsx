import React, { useEffect, useState } from 'react'
import '../datatable/Datatable.scss'
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import useFetch from '../../hooks/useFetch'
import axios from "axios"; // Ensure axios is imported

const Datatable = ({columns}) => {
  const location=useLocation()
  const path=location.pathname.split("/")[1];
  const { data, loading, error, reFetch } = useFetch(`http://localhost:8800/api/${path}`);

  console.log(data);
  console.log("Fetched users data:", data);

  const [list,setList]=useState();

  useEffect(()=>{
    setList(data)
  },[data])

  

  const handleDelete = async (id) => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("authToken"); 
  
    // Check if the token is available
    if (!token) {
      console.error("No authentication token found");
      return;
    }
  
    try {
      // Make the delete request with the token in the headers
      await axios.delete(`http://localhost:8800/api/${path}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Use the token
        },
      });
      // Update the state by filtering out the deleted item
      setList(list.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };
  

 const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={row=>row._id}
      />
    </div>
  );
};

export default Datatable;