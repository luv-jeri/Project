import { useState, useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import './ImageCarousel.css'


const sliderData = [
    {
      image: "https://img.freepik.com/free-psd/top-view-free-food-delivery-composition-with-mock-up_23-2148421288.jpg?w=996&t=st=1663326443~exp=1663327043~hmac=a0a6bfb9d5b3cc1ba00bf003ee243f2ad753622d7f35892612a0aea7e72bfddc",
      // heading: "Slide One",
      // desc: "This is the description of slide one Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi quos quas, voluptatum nesciunt illum exercitationem.",
    },
    {
      image: "https://img.freepik.com/free-photo/fresh-colourful-ingredients-mexican-cuisine_23-2148254294.jpg?w=1380&t=st=1663326531~exp=1663327131~hmac=7f8fb781c4016bd848aafe597b87b3694499e0ad5cf5c3db39e48780719314b1",
      heading: "Masala Dosa",
      desc: "Eaten across several parts of Asia for breakfast, lunch or dinner, the dosa is a fermented crêpe made from rice batter and black lentils that enjoys a history stretching back a whopping 2,000 years. ",
    },
    {
      image: "https://img.freepik.com/free-vector/wok-food-illustrated-background_52683-68279.jpg?w=1380&t=st=1663326561~exp=1663327161~hmac=061f23e2a7395f33dd9bdc026beba7ce776db2098b1fe113a4f710c25e4c6267",
      // heading: "Slide Three",
      // desc: "This is the description of slide three Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi quos quas, voluptatum nesciunt illum exercitationem.",
    },
  ];

const ImageCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = sliderData.length;

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 5000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
   
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
   
  };

  function auto() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  return (
    <div className="slider">
      <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />
      {sliderData.map((slide, index) => {
        return (
          <div
            className={index === currentSlide ? "slide current" : "slide"}
            key={index}
          >
            {index === currentSlide && (
              <div>
                <img src={slide.image} alt="slide" className="image" />
                <div className="content">
                  <h2>{slide.heading}</h2>
                  <p>{slide.desc}</p>
                  
                  {/* <button className="--btn --btn-primary">Get Started</button> */}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ImageCarousel;