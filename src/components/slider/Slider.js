import Carousel from "react-bootstrap/Carousel";

const Slider = (props) => {
  const { images } = props;
  return (
    <>
      <Carousel>
        {images.map((image, index) => {
          return (
            <Carousel.Item interval={2000} key={index}>
              <img className="d-block w-100" src={image} alt={`slide ${index+1}`} key={index} />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </>
  );
};

export default Slider;
