import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import DaftarMahasiswa from "./components/ShowDataWithClass.jsx";
import DaftarMahasiswaWithFunction from "./components/ShowDaraWithFunction.jsx";
import Belajar, { myElement } from "./components/PropsInClass.jsx";
// import Mahasiswa from "./components/PropsInArray.jsx";
import DaftarMahasiswa2 from "./components/PropsInArray2.jsx";
import { useState, useRef } from "react";

/* Event Handler di Class Component - Inline */
// class MyApp extends React.Component {
//   render() {
//     return (
//       <div>
//         <h1>Belajar React</h1>

//         <button onClick={() => alert("Hello React")}>Click me</button>
//       </div>
//     );
//   }
// }

/* Event Handler di Class Component - Method */
// class MyApp extends React.Component {
//   handleButtonClick() {
//     alert("Hello React");
//   }
//   render() {
//     return (
//       <div>
//         <h1>Belajar React</h1>

//         <button onClick={this.handleButtonClick}>Click me</button>
//       </div>
//     );
//   }
// }

// /* Event dalam Component terpisah */
// class Tombol extends React.Component {
//   handleButtonClick() {
//     alert("Hello React");
//   }

//   render() {
//     return <button onClick={this.handleButtonClick}>Click me</button>;
//   }
// }

// class MyApp extends React.Component {
//   render() {
//     return (
//       <div>
//         <h1>Belajar React</h1>

//         <Tombol />
//       </div>
//     );
//   }
// }

// /* Event Object */
// class Tombol extends React.Component {
//   handleButtonClick = (event) => {
//     console.log(event); // event object

//     console.log(event.target); // node object tempat event terjadi

//     console.log(event.target.innerHTML); // ambil isi HTML dari node object. Untuk form, biasanya ambil nilai value
//   };

//   render() {
//     return (
//       <button onClick={this.handleButtonClick} style={{ margin: "10px" }}>
//         {this.props.children}
//       </button>
//     );
//   }
// }
// class MyApp extends React.Component {
//   render() {
//     return (
//       <div>
//         <h1>Belajar React</h1>
//         <Tombol>Click Me</Tombol>
//       </div>
//     );
//   }
// }

// /* Event Handler di Functional Component */
// const Tombol = (props) => {
//   const handleButtonClick = () => {
//     alert(props.pesan);
//   };

//   return (
//     <button onClick={handleButtonClick} style={{ margin: "10px" }}>
//       {props.children}
//     </button>
//   );
// };

// const MyApp = () => {
//   return (
//     <div>
//       <h1>Belajar React</h1>

//       <Tombol pesan="Belajar React">React</Tombol>

//       <Tombol pesan="Belajar JavaScript">JavaScript</Tombol>
//     </div>
//   );
// };

// /* Event Passing Down */
// const Tombol = (props) => {
//   return <button onClick={props.onTombolClick}>Click Me</button>;
// };

// const MyApp = () => {
//   const handleClick = () => {
//     alert("Alert dari MyApp");
//   };

//   return (
//     <div>
//       <h1>Belajar React</h1>

//       <Tombol onTombolClick={handleClick} />
//     </div>
//   );
// };

/* REACT STATE */
// /* State di Class Component */
// class MyApp extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = { judul: "Belajar React" };
//   }

//   handleButtonClick = () => {
//     if (this.state.judul !== "Belajar JavaScript") {
//       this.setState({ judul: "Belajar JavaScript" });
//     } else {
//       this.setState({ judul: "Belajar React" });
//     }
//   };

//   render() {
//     return (
//       <div>
//         <h1>{this.state.judul}</h1>

//         <button onClick={this.handleButtonClick}>Click me</button>
//       </div>
//     );
//   }
// }

// /* Multiple State */
// class MyApp extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       judul1: "Belajar React",
//       judul2: "Belajar JavaScript",
//     };
//   }

//   handleButtonClick = () => {
//     this.setState({
//       judul1: "Belajar React State",
//       judul2: "Belajar Programming",
//     });
//   };

//   render() {
//     console.log(this.state);

//     return (
//       <div>
//         <h1>{this.state.judul1}</h1>
//         <h1>{this.state.judul2}</h1>
//         <button onClick={this.handleButtonClick}>Click me</button>
//       </div>
//     );
//   }
// }

// /* State Object Value */
// class MyApp extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       judul: {
//         satu: "Belajar React",
//         dua: "Belajar JavaScript",
//       },
//     };
//   }

//   // /* Cara 1, Data yg tidak di state akan terhapus */
//   // handleButtonClick = () => {
//   //   this.setState({
//   //     judul: {
//   //       satu: "Belajar React State",
//   //       dua: "Belajar Java",
//   //     },
//   //   });
//   // };

//   // /* Cara 2, Tetap Menyimpan Data yang lain */
//   // handleButtonClick = () => {
//   //   // buat variabel bantu, namun tidak bisa untuk functional component (hook)
//   //   let judulObj = this.state.judul;
//   //   judulObj.satu = "Belajar React State";
//   //   this.setState(judulObj);
//   // };

//   /* Cara 3 */
//   handleButtonClick = () => {
//     this.setState({
//       judul: { ...this.state.judul, satu: "Belajar React State" },
//     });
//   };

//   render() {
//     console.log(this.state);
//     return (
//       <div>
//         <h1>{this.state.judul.satu}</h1>
//         <h1>{this.state.judul.dua}</h1>
//         <button onClick={this.handleButtonClick}>Click me</button>
//       </div>
//     );
//   }
// }

// /* Latihan */
// const Mahasiswa3 = ({ nama, foto, jurusan }) => {
//   return (
//     <div className="mahasiswa">
//       <img src={foto} />
//       <p>
//         {nama} ({jurusan})
//       </p>
//     </div>
//   );
// };

// class MyApp extends React.Component {
//   constructor(props) {
//     super(props);

//     this.students = [
//       {
//         nama: "Eka",
//         foto: "/img/Eka.png",
//         jurusan: "Teknik Informatika",
//       },
//       {
//         nama: "Lisa",
//         foto: "/img/Lisa.png",
//         jurusan: "Sistem Informasi",
//       },
//       {
//         nama: "Rudi",
//         foto: "/img/Rudi.png",
//         jurusan: "Teknik Elektro",
//       },
//     ];

//     this.state = {
//       mahasiswa: this.students[0],
//     };
//   }

//   handleButtonClick = (index) => {
//     this.setState({
//       mahasiswa: this.students[index],
//     });
//   };

//   render() {
//     const { nama, foto, jurusan } = this.state.mahasiswa;

//     return (
//       <div>
//         <h1>Belajar React</h1>
//         <div>
//           {this.students.map((student, index) => (
//             <button
//               key={index}
//               onClick={() => this.handleButtonClick(index)}
//               style={{ margin: "5px" }}>
//               {student.nama}
//             </button>
//           ))}
//         </div>
//         <Mahasiswa3 nama={nama} foto={foto} jurusan={jurusan} />
//       </div>
//     );
//   }
// }

/* Mengirim Nilai State ke Child Component (State Down) */
// /* State Down */
// class Mahasiswa extends React.Component {
//   render() {
//     return (
//       <figure>
//         <img
//           src={"/img/" + this.props.mahasiswa.pasFoto}
//           alt={this.props.mahasiswa.nama}
//         />

//         <figcaption>
//           {this.props.mahasiswa.nama}({this.props.mahasiswa.jurusan})
//         </figcaption>
//       </figure>
//     );
//   }
// }

// class MyApp extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       nama: "Eka",
//       jurusan: "Teknik Informatika",
//       pasFoto: "Eka.png",
//     };
//   }

//   render() {
//     return (
//       <div>
//         <Mahasiswa mahasiswa={this.state} />
//       </div>
//     );
//   }
// }

/* USE STATE */
// const MyApp = () => {
//   const [judul, setJudul] = useState("Belajar React");

//   const handleButtonClick = () => {
//     setJudul("Belajar JavaScript");
//   };

//   return (
//     <div>
//       <h1>{judul}</h1>
//       <button onClick={handleButtonClick}>Click me</button>
//     </div>
//   );
// };

// /* Multiple State */
// const MyApp = () => {
//   const [judul1, setJudul1] = useState("Belajar React");
//   const [judul2, setJudul2] = useState("Belajar JavaScript");

//   const handleButtonClick = () => {
//     setJudul1("Belajar React State");
//   };

//   return (
//     <div>
//       <h1>{judul1}</h1>
//       <h1>{judul2}</h1>
//       <button onClick={handleButtonClick}>Click me</button>
//     </div>
//   );
// };

// /* Nested Object in State */
// const MyApp = () => {
//   const [judul, setJudul] = useState({
//     satu: "Belajar React",
//     dua: "Belajar JavaScript",
//   });

//   const handleButtonClick = () => {
//     setJudul({ ...judul, satu: "Belajar React State" });
//   };

//   return (
//     <div>
//       <h1>{judul.satu}</h1>
//       <h1>{judul.dua}</h1>
//       <button onClick={handleButtonClick}>Click me</button>
//     </div>
//   );
// };

/* Latihan Counter Click */
// const MyApp = () => {
//   const [count, setCount] = useState(0);

//   /* Cara 1 */
//   // const handlePlusButtonClick = () => {
//   //   setCount(count + 1);
//   // };

//   // const handleMinusButtonClick = () => {
//   //   setCount(count - 1);
//   // };

//   /* Cara 2 */
//   const handlePlusButtonClick = () => {
//     setCount((prevCount) => {
//       return prevCount + 1;
//     });
//   };

//   const handleMinusButtonClick = () => {
//     setCount((prevCount) => {
//       return prevCount - 1;
//     });
//   };

//   return (
//     <div>
//       <h1>{count}</h1>
//       <button
//         onClick={handleMinusButtonClick}
//         style={{ margin: "5px", padding: "20px" }}>
//         -
//       </button>
//       <button
//         onClick={handlePlusButtonClick}
//         style={{ margin: "5px", padding: "20px" }}>
//         +
//       </button>
//     </div>
//   );
// };

// /* Update state dari Child Component */
// const Tombol = (props) => {
//   const handleClick = () => {
//     if (props.tombolType === "dec") {
//       props.onTombolClick(-1);
//     } else {
//       props.onTombolClick(+1);
//     }
//   };

//   return <button onClick={handleClick}>{props.children}</button>;
// };

// const MyApp = () => {
//   const [counter, setCounter] = useState(0);

//   const handleTombolClick = (change) => {
//     setCounter((prevCount) => {
//       return prevCount + change;
//     });
//   };

//   return (
//     <div>
//       <h1>{counter}</h1>
//       <Tombol onTombolClick={handleTombolClick} tombolType="dec">
//         {" "}
//         - 1
//       </Tombol>
//       <Tombol onTombolClick={handleTombolClick} tombolType="inc">
//         {" "}
//         + 1
//       </Tombol>
//     </div>
//   );
// };

// /* Update Object in State */
// const MyApp = () => {
//   const [person, setPerson] = useState({
//     firstName: "Barbara",
//     lastName: "Hepworth",
//     email: "bhepworth@sculpture.com",
//   });

//   function handleFirstNameChange(e){
//     setPerson((prevPerson) => ({
//       ...prevPerson,
//       firstName: e.target.value,
//     }));
//   };

//   // const handleFirstNameChange = (e) => {
//   //   setPerson((prevPerson) => ({
//   //     ...prevPerson,
//   //     firstName: e.target.value,
//   //   }));
//   // };

//   return (
//     <div>
//       <label>
//         First name:
//         <input
//           type="text"
//           value={person.firstName}
//           onChange={handleFirstNameChange}
//         />
//       </label>

//       <p>First Name : {person.firstName}</p>
//     </div>
//   );
// };


// /* Update array in state */
// const MyApp = () => {
//   let nextId = useRef(0);
//   const [name, setName] = useState("");
//   const [artists, setArtists] = useState([]);
//   const [currentId, setCurrentId] = useState(null);

//   function handleNameChange(e) {
//     setName(e.target.value);
//   }

//   function handleAddArtist() {
//     setArtists((prevArtists) => [
//       ...prevArtists,
//       { id: nextId.current++, name: name },
//     ]);
//     setName("");
//   }

//   function handleDeleteArtist(id) {
//     setArtists((prevArtists) =>
//       prevArtists.filter((artist) => artist.id !== id)
//     );
//   }

//   function handleUpdateArtist() {
//     if (currentId !== null && name) {
//       setArtists((prevArtists) =>
//         prevArtists.map((artist) => 
//           artist.id === currentId ? { ...artist, name: name } : artist
//         )
//       );
//       setCurrentId(null);
//       setName("");
//     }
//   }

//   return (
//     <>
//       <h1>Inspiring Sculptors:</h1>
//       <input 
//         value={name} 
//         onChange={handleNameChange} 
//         placeholder="Name" 
//       />
//       {currentId === null ? (
//         <button onClick={handleAddArtist}>Add</button>
//       ) : (
//         <button onClick={handleUpdateArtist}>Save</button>
//       )}

//       <ul>
//         {artists.map((artist) => (
//           <li key={artist.id}>
//             {artist.name}{" "}
//             <button onClick={() => {
//               setCurrentId(artist.id);
//               setName(artist.name);
//             }}>
//               Update
//             </button>
//             <button onClick={() => handleDeleteArtist(artist.id)}>
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// };

function App() {
  const [view, setView] = useState('menu');

  const renderView = () => {
    switch (view) {
      case 'menu':
        return <Menu />;
      case 'customer':
        return <Customer />;
      case 'order':
        return <Order />;
      default:
        return <Menu />;
    }
  };

  return (
    <div className="App">
      <Header setView={setView} />
      <div className="container">
        {renderView()}
      </div>
      <Footer />
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    {/* <DaftarMahasiswa />
    <DaftarMahasiswaWithFunction />
    {myElement}
    <Belajar materi="JavaScript" />
    <Mahasiswa />
    <DaftarMahasiswa2 /> */}
    <MyApp />
  </StrictMode>
);
