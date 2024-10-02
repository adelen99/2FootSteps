import React from "react";

function ProductsHeader() {
  return (
    <div className='text-center my-6'>
      <h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
        Descoperă produsele noastre
      </h2>
      <p className='leading-7 [&:not(:first-child)]:mt-6'>
        La 2Footsteps, îți oferim o selecție variată de sneakers și încălțăminte
        sportivă, toate gândite pentru a oferi confort și stil. Fie că ești un
        pasionat de sport sau pur și simplu vrei să arăți bine în fiecare zi,
        aici găsești produsele perfecte care să-ți completeze ținutele.
      </p>
      <p className='leading-7 [&:not(:first-child)]:mt-6'>
        Explorează cele mai noi tendințe și modele, de la sneakers clasici la
        cele mai recente lansări. Fiecare pereche este aleasă cu grijă pentru a
        răspunde cerințelor tale, astfel încât să te poți bucura de fiecare pas
        pe care îl faci.
      </p>
    </div>
  );
}

export default ProductsHeader;
