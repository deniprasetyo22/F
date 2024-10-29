import React from "react";
import Mahasiswa from "./Mahasiswa";

class DaftarMahasiswa2 extends React.Component {
  render() {
    const mahasiswa = {
      nama: "Lisa",
      jurusan: "Sistem Informasi",
      pasFoto: "/img/logo.jpg",
    };

    return (
      <Mahasiswa
        nama={mahasiswa.nama}
        jurusan={mahasiswa.jurusan}
        pasFoto={mahasiswa.pasFoto}
      />
    );
  }
}

export default DaftarMahasiswa2;
