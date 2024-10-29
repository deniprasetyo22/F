import React from "react";

const Mahasiswa = ({ nama, jurusan, pasFoto }) => {
  return (
    <div className="mahasiswa">
      <img src={`/img/${pasFoto}`} alt={nama} />
      <h2>{nama}</h2>
      <p>{jurusan}</p>
    </div>
  );
};

export default Mahasiswa;
