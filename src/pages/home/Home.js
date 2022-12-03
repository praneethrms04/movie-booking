import Navbar from "../../components/header/Navbar";
import Slider from "../../components/slider/Slider";

import img1 from "../../assets/images/img1.avif";
import img2 from "../../assets/images/img2.avif";
import img3 from "../../assets/images/img3.avif";
import img4 from "../../assets/images/img4.avif";
import img5 from "../../assets/images/img5.avif";

import Footer from "../../components/footer/Footer";
import "./home.css";
const Home = () => {
  return (
    <div>
      <Navbar />
      <Slider images={[img1, img2, img3,img4, img5]} />
      <Footer />
    </div>
  );
};

export default Home;
