import React from "react";

class Mahasiswa extends React.Component {
  render() {
    return (
      <figure>
        <img src={`/img/logo.jpg${this.props.pasFoto}`} alt={this.props.nama} />

        <figcaption>
          {this.props.nama} ({this.props.jurusan})
        </figcaption>
      </figure>
    );
  }
}

export default Mahasiswa;