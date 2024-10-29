import React from "react";

const Belajar = (data) => <h1>Belajar {data.materi}</h1>;

const myElement = (
  <div>
    <Belajar materi="React" />
    <Belajar materi="JavaScript" />
    <Belajar materi="Programmer" />
  </div>
);

export { Belajar, myElement };
