import React from "react";

class DaftarMahasiswa extends React.Component {
  render() {
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
      <div>
        <h1>Daftar Mahasiswa - Universitas Ilkoom</h1>
        <hr />
        <section style={{ display: "flex", justifyContent: "space-around" }}>
          {mahasiswas.map((mahasiswa) => (
            <figure key={mahasiswa.id} style={{ textAlign: "center" }}>
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
        </section>
      </div>
    );
  }
}

export default DaftarMahasiswa;
