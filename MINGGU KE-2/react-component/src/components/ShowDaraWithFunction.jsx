import React from "react";

// Komponen Mahasiswa
const Mahasiswa = () => {
  const mahasiswas = [
    {
      id: "01",
      nama: "Eka",
      jurusan: "Teknik Informatika",
      pasFoto: "people1.jpg",
    },
    {
      id: "02",
      nama: "Lisa",
      jurusan: "Sistem Informasi",
      pasFoto: "people2.jpg",
    },
    {
      id: "03",
      nama: "Rudi",
      jurusan: "Teknik Elektro",
      pasFoto: "people4.jpg",
    },
  ];

  return (
    <>
      {mahasiswas.map((mahasiswa) => (
        <figure
          key={mahasiswa.id}
          style={{ textAlign: "center", margin: "10px" }}
        >
          <img
            src={`img/${mahasiswa.pasFoto}`}
            alt={mahasiswa.nama}
            style={{ width: "150px", height: "150px", borderRadius: "50%" }}
          />
          <figcaption>
            {mahasiswa.nama} ({mahasiswa.jurusan})
          </figcaption>
        </figure>
      ))}
    </>
  );
};

// Komponen DaftarMahasiswaWithFunction
const DaftarMahasiswaWithFunction = () => {
  return (
    <React.Fragment>
      <h1>Daftar Mahasiswa - Teknik Informatika</h1>
      <hr />
      <section style={{ display: "flex", justifyContent: "space-around" }}>
        <Mahasiswa />
      </section>
    </React.Fragment>
  );
};

export default DaftarMahasiswaWithFunction;
