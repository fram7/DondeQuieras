import React, { useState, useEffect } from 'react';

const imagenes = [require('../../assets/workanywhere/1.jpg'),
require('../../assets/workanywhere/2.jpg'),
require('../../assets/workanywhere/3.jpg'),
require('../../assets/workanywhere/4.jpg'),
]
export default function Home() {   

    const startAt = Math.floor(Math.random() * imagenes.length); //Imagen aleatoria
    return (
        <div className="container text-center">
            <h1 className="display-4">Trabaja donde quieras, no donde te toque</h1>
            <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    {imagenes && imagenes.map((img, index) =>
                        <div className={`carousel-item ${index == startAt ? "active" : ""}`} key={index} >
                            <img src={img} className="d-block w-100" alt="..." />
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
}
