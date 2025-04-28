import React, { useState, useEffect } from "react";
import heroesImage from "../assets/images/heroes1.jpg";
import heroesImage2 from "../assets/images/heroes2.jpg";
import heroesImage3 from "../assets/images/heroes3.jpg";
import heroesImage4 from "../assets/images/heroes4.jpg";

const images = [heroesImage, heroesImage2, heroesImage3, heroesImage4];

export default function Heroes() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // 3 saniyede bir değişsin
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="heroes-slider"
            style={{
                width: "100%",
                height: "500px",
                overflow: "hidden",
                position: "relative",
                borderRadius: "10px",
                marginBottom: "20px",
            }}
        >
            {images.map((image, index) => (
                <div
                    key={index}
                    style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        width: "100%",
                        height: "500px",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        opacity: currentIndex === index ? 1 : 0,
                        transition: "opacity 1s ease-in-out",
                    }}
                />
            ))}
        </div>
    );
}
