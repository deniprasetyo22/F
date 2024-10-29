import React from "react";

class Belajar extends React.Component {
  render() {
    const { materi } = this.props;
    console.log(this.props); 

    return <h1>Belajar {materi}</h1>;
  }
}

const myElement = <Belajar materi="React" id="01" className="judul" />;

export { myElement };
export default Belajar;
