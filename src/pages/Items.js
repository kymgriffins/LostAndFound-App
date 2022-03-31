/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import _ from "lodash";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  {
    field: "id",
    headerName: "#",
  },
  {
    field: "title",
    headerName: "Title",
  },
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Items() {
  let [items, setItems] = useState([]);
  let [userItem, setUserItem] = useState([]);
  let { authTokens, logoutUser, user } = useContext(AuthContext);

  console.log("AllItems", items);
  console.log("UserItems", userItem);
  console.log("User", user);
  const getItems = async () => {
    let response = await fetch("http://127.0.0.1:8000/app/all/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();

    if (response.status === 200) {
      setItems(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };
  const getUserItems = async () => {
    const _userItem = _.filter(items, (item) => item.user === user.user_id);
    setUserItem(_userItem);
  };
  useEffect(() => {
    getItems();
    getUserItems();
  }, [getItems, getUserItems]);
  return (
    <React.Fragment>
      {/*  <Title>Recent Orders</Title> */}
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>ID No</TableCell>
            <TableCell>Report</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userItem.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.item_type}</TableCell>
              <TableCell>{row.location}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.id_number}</TableCell>
              <TableCell>{row.report}</TableCell>
              <TableCell>{row.date_added}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </React.Fragment>
  );
}

// import React, {useState, useEffect, useContext} from 'react'
// import AuthContext from '../context/AuthContext'
// import _ from 'lodash'
// const HomePage = () => {
//     let [items, setItems] = useState([])
//     let [userItem,setUserItem]= useState([])
//     let {authTokens, logoutUser, user} = useContext(AuthContext)

//    console.log("AllItems",items)
//    console.log("UserItems", userItem)
//    console.log("User",user)
//     const getItems = async() =>{
//         let response = await fetch('http://127.0.0.1:8000/app/all/', {
//             method:'GET',
//             headers:{
//                 'Content-Type':'application/json',
//                 'Authorization':'Bearer ' + String(authTokens.access)
//             }
//         })
//         let data = await response.json()

//         if(response.status === 200){
//             setItems(data)

//         }else if(response.statusText === 'Unauthorized'){
//             logoutUser()
//         }

//     }
//     const getUserItems= async()=>{
//         const _userItem = _.filter(items, item=> item.user === user.user_id)
//         setUserItem(_userItem)
//     }
//     useEffect(()=> {
//         getItems()
//         getUserItems()
//     }, [])

//     return (
//         <div>
//             <p>You are logged to the home page!</p>

//             <ul>
//                 {userItem.map(item => (
//                     <li key={item.id} >{item.item_type}</li>
//                 ))}
//             </ul>
//         </div>
//     )
// }

// export default HomePage
