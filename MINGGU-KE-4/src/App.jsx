import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {

  // /* Fetch Data */
  // fetch('https://reqres.in/api/users/1')
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error('Terjadi Gangguang');
  //     }
  //     return response.json()
  //   })
  //   .then(data => {
  //     let user = data.data;
  //     console.log(user.id);
  //     console.log(user.first_name);
  //     console.log(user.last_name);
  //     console.log(user.email);
  //     console.log(user.avatar);
  //   });


  // /* Fetch Data with Async Await */
  // const myFetch = async () => {
  //   try {
  //     let response = await fetch("https://reqres.in/api/users/1");
  //     if (!response.ok) {
  //       throw new Error(`Terjadi gangguan dengan kode: ${response.status}`);
  //     }

  //     let data = await response.json();
  //     let user = data.data;

  //     console.log(user.id);
  //     console.log(user.first_name);
  //     console.log(user.last_name);
  //     console.log(user.email);
  //     console.log(user.avatar);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // myFetch();


  // /* Latihan 1 */
  // const [user, setUser] = useState([]);
  // const [errorStatus, setErrorStatus] = useState(false);
  // const [loadingStatus, setLoadingStatus] = useState(true);
  // const [userId, setUserId] = useState(1);

  // useEffect(() => {
  //   const myFetch = async () => {
  //     try {
  //       setLoadingStatus(true);
  //       let response = await fetch(`https://reqres.in/api/users/${userId}?delay=2`);
  //       if (!response.ok) {
  //         setErrorStatus(true);
  //         throw new Error(`Terjadi gangguan dengan kode: ${response.status}`);
  //       }
  //       let data = await response.json();
  //       setUser(data.data);
  //     }
  //     catch (error) {
  //       console.log(error);
  //     }
  //     finally {
  //       setLoadingStatus(false);
  //     }
  //   }
  //   myFetch();
  // }, [userId]);

  // const handlePrevUser = () => {
  //   setUserId(userId - 1);
  // }

  // const handleNextUser = () => {
  //   setUserId(userId + 1);
  // }

  // if (loadingStatus) {
  //   return (
  //     <div>
  //       <h1>Loading...</h1>
  //     </div>
  //   );
  // }

  // if (errorStatus) {
  //   return (
  //     <div>
  //       <h1>Terjadi Gangguan...</h1>
  //     </div>
  //   );
  // }

  // return (
  //   <div>
  //     <h1>{`${user.first_name} ${user.last_name}`}</h1>
  //     <figure>
  //       <img src={user.avatar} alt={`${user.first_name}`} />
  //       <figcaption>{user.email}</figcaption>
  //     </figure>
  //     <div>
  //       <button onClick={handlePrevUser}>Prev User</button>
  //       <button onClick={handleNextUser}>Next User</button>
  //     </div>
  //   </div>
  // );


  // /* Latihan 2 */
  // const [users, setUsers] = useState([]);
  // const [errorStatus, setErrorStatus] = useState(false);
  // const [loadingStatus, setLoadingStatus] = useState(true);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(0);
  // const [usersPerPage, setusersPerPage] = useState(3);

  // useEffect(() => {
  //   const myFetch = async () => {
  //     try {
  //       setLoadingStatus(true);
  //       let response = await fetch(`https://reqres.in/api/users?page=${currentPage}&per_page=${usersPerPage}?delay=2`);
  //       if (!response.ok) {
  //         setErrorStatus(true);
  //         throw new Error(`Terjadi gangguan dengan kode: ${response.status}`);
  //       }
  //       let data = await response.json();
  //       setUsers(data.data);
  //       setTotalPages(data.total_pages);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoadingStatus(false);
  //     }
  //   }
  //   myFetch();
  // }, [currentPage, usersPerPage]);

  // const handleNextPage = () => {
  //   if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
  // };

  // const handlePrevPage = () => {
  //   if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  // };

  // const hanldeUsersPerPage = (event) => {
  //   setusersPerPage(Number(event.target.value));
  // };

  // const onSubmit = (event) => {
  //   event.preventDefault();
  //   const newUsersPerPage = Number(event.target[0].value);
  //   if (newUsersPerPage > 0) {
  //     setusersPerPage(newUsersPerPage);
  //     setCurrentPage(1);
  //   };
  // }

  // if (loadingStatus) {
  //   return (
  //     <div>
  //       <h1>Loading...</h1>
  //     </div>
  //   );
  // }

  // if (errorStatus) {
  //   return (
  //     <div>
  //       <h1>Terjadi Gangguan...</h1>
  //     </div>
  //   );
  // }

  // return (
  //   <div>
  //     <table>
  //       <thead>
  //         <tr>
  //           <th>No</th>
  //           <th>Avatar</th>
  //           <th>First Name</th>
  //           <th>Last Name</th>
  //           <th>Email</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {users.map((user, index) => (
  //           <tr key={user.id}>
  //             <td>{index + 1 + (currentPage - 1) * usersPerPage}</td>
  //             <td><img src={user.avatar} alt={`${user.first_name}`} width="50" /></td>
  //             <td>{user.first_name}</td>
  //             <td>{user.last_name}</td>
  //             <td>{user.email}</td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //     <div>
  //       <form onSubmit={onSubmit}>
  //         <input type="number" placeholder="Users per page" />
  //         <button type="submit">Submit</button>
  //       </form>
  //     </div>
  //     <div>
  //       <button onClick={handlePrevPage} disabled={currentPage === 1}>
  //         Prev Page
  //       </button>
  //       <span> Page {currentPage} of {totalPages} </span>
  //       <button onClick={handleNextPage} disabled={currentPage === totalPages}>
  //         Next Page
  //       </button>
  //     </div>
  //   </div>
  // );


  // /* POST REQUEST */
  // const user = {
  //   first_name: 'name',
  //   last_name: 'test'
  // };

  // const requestOptions = {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(user)
  // };

  // fetch('https://reqres.in/api/users', requestOptions)
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data.id);
  //     console.log(data.first_name);
  //     console.log(data.last_name);
  //   });


  // /* PUT REQUEST */
  // const user = {
  //   first_name: 'Name',
  //   last_name: 'Update',
  // };

  // const id = 2;

  // const requestOptions = {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(user)
  // };

  // fetch(`https://reqres.in/api/users/${id}`, requestOptions)
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data.first_name);
  //     console.log(data.last_name);
  //   });


  // /* DELETE REQUEST */
  // const id = 1;
  // fetch(`https://reqres.in/api/users/${id}`, { method: 'DELETE' })
  //   .then(data => {
  //     console.log("Success Delete");
  //   });


  // /* GET REQUEST USING AXIOS */
  // const [users, setUsers] = useState([]);
  // const [errorStatus, setErrorStatus] = useState(false);
  // const [loadingStatus, setLoadingStatus] = useState(true);
  // const [userId, setUserId] = useState(1);

  // useEffect(() => {
  //   const myFetch = async () => {
  //     try {
  //       setLoadingStatus(true);
  //       const response = await axios.get(`https://reqres.in/api/users/${userId}?delay=2`);
  //       const userData = response.data.data;
  //       setUsers(userData);
  //     }
  //     catch (error) {
  //       setErrorStatus(true);
  //     }
  //     finally {
  //       setLoadingStatus(false);
  //     }
  //   }
  //   myFetch();
  // }, [userId]);

  // const handlePrevUser = () => {
  //   setUserId(prevId => (prevId > 1 ? prevId - 1 : prevId));
  // };

  // const handleNextUser = () => {
  //   setUserId(prevId => prevId + 1);
  // };

  // if (loadingStatus) {
  //   return (
  //     <div>
  //       <h1>Loading...</h1>
  //     </div>
  //   );
  // }

  // if (errorStatus) {
  //   return (
  //     <div>
  //       <h1>Terjadi Gangguan...</h1>
  //     </div>
  //   );
  // }

  // return (
  //   <div>
  //     <h1>{`${users.first_name} ${users.last_name}`}</h1>
  //     <figure>
  //       <img src={users.avatar} alt={`${users.first_name}`} />
  //       <figcaption>{users.email}</figcaption>
  //     </figure>
  //     <div>
  //       <button onClick={handlePrevUser} disabled={userId === 1}>Prev User</button>
  //       <button onClick={handleNextUser}>Next User</button>
  //     </div>
  //   </div>
  // );


  // /* POST REQUEST USING AXIOS */
  // const [users, setUsers] = useState([]);
  // const [errorStatus, setErrorStatus] = useState(false);
  // const [loadingStatus, setLoadingStatus] = useState(true);
  // const [userId, setUserId] = useState(1);
  // const addNewUser = {
  //   first_name: 'Deni',
  //   last_name: 'Prasetyo',
  // };

  // useEffect(() => {
  //   const myFetch = async () => {
  //     try {
  //       setLoadingStatus(true);
  //       const response = await axios.post('https://reqres.in/api/users', addNewUser);
  //       setUsers(response.data);
  //       console.log('User created:', response.data);
  //     }
  //     catch (error) {
  //       setErrorStatus(true);
  //     }
  //     finally {
  //       setLoadingStatus(false);
  //     }
  //   }
  //   myFetch();
  // }, [userId]);

  // const handlePrevUser = () => {
  //   setUserId(prevId => (prevId > 1 ? prevId - 1 : prevId));
  // };

  // const handleNextUser = () => {
  //   setUserId(prevId => prevId + 1);
  // };

  // if (loadingStatus) {
  //   return (
  //     <div>
  //       <h1>Loading...</h1>
  //     </div>
  //   );
  // }

  // if (errorStatus) {
  //   return (
  //     <div>
  //       <h1>Terjadi Gangguan...</h1>
  //     </div>
  //   );
  // }

  // return (
  //   <div>
  //     <h1>{`${users.first_name} ${users.last_name}`}</h1>
  //     <figure>
  //       <img src={users.avatar} alt={`${users.first_name}`} />
  //       <figcaption>{users.email}</figcaption>
  //     </figure>
  //     <div>
  //       <button onClick={handlePrevUser} disabled={userId === 1}>Prev User</button>
  //       <button onClick={handleNextUser}>Next User</button>
  //     </div>
  //   </div>
  // );



  // /* PUT REQUEST USING AXIOS */
  // const [users, setUsers] = useState({});
  // const [errorStatus, setErrorStatus] = useState(false);
  // const [loadingStatus, setLoadingStatus] = useState(true);
  // const [userId, setUserId] = useState(1);

  // const updateUserData = {
  //   first_name: 'Deni',
  //   last_name: 'Prasetyo',
  // };

  // useEffect(() => {
  //   const myFetch = async () => {
  //     try {
  //       setLoadingStatus(true);
  //       const response = await axios.put(`https://reqres.in/api/users/${userId}`, updateUserData);
  //       setUsers(response.data);
  //       console.log('User updated:', response.data);
  //     } catch (error) {
  //       setErrorStatus(true);
  //       console.error('Error updating user:', error);
  //     } finally {
  //       setLoadingStatus(false);
  //     }
  //   };

  //   myFetch();
  // }, [userId]);

  // const handlePrevUser = () => {
  //   setUserId(prevId => (prevId > 1 ? prevId - 1 : prevId));
  // };

  // const handleNextUser = () => {
  //   setUserId(prevId => prevId + 1);
  // };

  // if (loadingStatus) {
  //   return (
  //     <div>
  //       <h1>Loading...</h1>
  //     </div>
  //   );
  // }

  // if (errorStatus) {
  //   return (
  //     <div>
  //       <h1>Terjadi Gangguan...</h1>
  //     </div>
  //   );
  // }

  // return (
  //   <div>
  //     <h1>{`${users.first_name} ${users.last_name}`}</h1>
  //     <figure>
  //       <img src={users.avatar} alt={`${users.first_name}`} width="100" />
  //       <figcaption>{users.email}</figcaption>
  //     </figure>
  //     <div>
  //       <button onClick={handlePrevUser} disabled={userId === 1}>Prev User</button>
  //       <button onClick={handleNextUser}>Next User</button>
  //     </div>
  //   </div>
  // );


  // /* DELETE REQUEST USING AXIOS */
  // const [users, setUsers] = useState({});
  // const [errorStatus, setErrorStatus] = useState(false);
  // const [loadingStatus, setLoadingStatus] = useState(true);
  // const [userId, setUserId] = useState(1);

  // useEffect(() => {
  //   const myFetch = async () => {
  //     try {
  //       setLoadingStatus(true);
  //       const response = await axios.delete(`https://reqres.in/api/users/${userId}`);
  //       console.log('User deleted:', response.data);
  //       setUsers({});
  //     } catch (error) {
  //       setErrorStatus(true);
  //       console.error('Error deleting user:', error);
  //     } finally {
  //       setLoadingStatus(false);
  //     }
  //   };

  //   if (userId) {
  //     myFetch();
  //   }
  // }, [userId]);

  // const handlePrevUser = () => {
  //   setUserId(prevId => (prevId > 1 ? prevId - 1 : prevId));
  // };

  // const handleNextUser = () => {
  //   setUserId(prevId => prevId + 1);
  // };

  // if (loadingStatus) {
  //   return (
  //     <div>
  //       <h1>Loading...</h1>
  //     </div>
  //   );
  // }

  // if (errorStatus) {
  //   return (
  //     <div>
  //       <h1>Terjadi Gangguan...</h1>
  //     </div>
  //   );
  // }

  // return (
  //   <div>
  //     <h1>User {userId} has been deleted</h1>
  //     <div>
  //       <button onClick={handlePrevUser} disabled={userId === 1}>Prev User</button>
  //       <button onClick={handleNextUser}>Next User</button>
  //     </div>
  //   </div>
  // );

}

export default App;
