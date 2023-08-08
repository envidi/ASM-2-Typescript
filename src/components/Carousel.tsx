import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex:any) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} style={{height:"90%"}}>
      <Carousel.Item>   
        {/* <ExampleCarouselImage text="First slide" /> */}
        <img src='https://cdn.ankhang.vn/media/banner/28_Decf83bf7f2dbce9e3b4b6eae04b93e4b77.jpg' style={{width : "100%"}}/>
        <Carousel.Caption>
          {/* <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src='https://cdn.ankhang.vn/media/banner/13_Feb4f7989b247474da68f14d1c40ad601c8.jpg' style={{width : "100%"}}/>
        <Carousel.Caption>
          {/* <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src='https://cdn.ankhang.vn/media/banner/10_Jul0bae1d1e1464a814cc2c4bcd5f52b8d9.jpg' style={{width : "100%"}}/>
        <Carousel.Caption>
          {/* <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;