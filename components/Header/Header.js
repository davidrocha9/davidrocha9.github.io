import Image from "next/image";
import Fade from "react-reveal/Fade";
import SoundBar from "./SoundBar/SoundBar";
import styles from "./Header.module.scss";
// import SoundButton from "./SoundButton/SoundButton";

const Header = ({ children }) => {
  return (
    <nav className="w-full fixed top-0 py-8 z-50 select-none bg-gradient-to-b from-gray-dark-5 shadow-gray-dark-5 transition-all duration-300">
      <Fade>
        <div className="flex justify-between section-container">
          <a href="#home" className="link">
            <h1 className={`text-white font-semibold`} style={{fontSize: '3rem'}}>
            <span className="">D</span>
            <span className="" style={{color: 'rgba(157,84,252,255)'}}>. </span>
          </h1>
          </a>
          <div className="outer-menu relative">
            {/* <SoundButton /> */}
            <input
              aria-labelledby="menu"
              className="checkbox-toggle link absolute top-0 right-0 w-6 h-6 opacity-0"
              type="checkbox"
              aria-label="menu"
            />
            <div className="hamburger absolute top-2 right-0 w-6 h-6 flex items-center justify-center">
              <div className="relative flex-none w-full bg-white duration-300 flex items-center justify-center"></div>
            </div>
            {children}
          </div>
        </div>
      </Fade>
    </nav>
  );
};

export default Header;
