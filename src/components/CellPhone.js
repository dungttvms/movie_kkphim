import React from "react";
import WifiCalling3Icon from "@mui/icons-material/WifiCalling3";
import styled, { keyframes } from "styled-components";

const phoneringAloCircleAnim = keyframes`
  0% {
    transform: rotate(0) scale(0.5) skew(1deg);
    opacity: 0.1;
  }
  30% {
    transform: rotate(0) scale(0.7) skew(1deg);
    opacity: 0.5;
  }
  100% {
    transform: rotate(0) scale(1) skew(1deg);
    opacity: 0.1;
  }
`;

const phoneringAloCircleFillAnim = keyframes`
  0% {
    transform: rotate(0) scale(0.7) skew(1deg);
    opacity: 0.6;
  }
  50% {
    transform: rotate(0) scale(1) skew(1deg);
    opacity: 0.6;
  }
  100% {
    transform: rotate(0) scale(0.7) skew(1deg);
    opacity: 0.6;
  }
`;

const phoneringAloCircleImgAnim = keyframes`
  0% {
    transform: rotate(0) scale(1) skew(1deg);
  }
  10% {
    transform: rotate(-25deg) scale(1) skew(1deg);
  }
  20% {
    transform: rotate(25deg) scale(1) skew(1deg);
  }
  30% {
    transform: rotate(-25deg) scale(1) skew(1deg);
  }
  40% {
    transform: rotate(25deg) scale(1) skew(1deg);
  }
  50% {
    transform: rotate(0) scale(1) skew(1deg);
  }
  100% {
    transform: rotate(0) scale(1) skew(1deg);
  }
`;

const HotlinePhoneRingWrap = styled.div`
  position: fixed;
  bottom: 0;
  right: 120;
  z-index: 999999;
`;

const HotlinePhoneRing = styled.div`
  position: relative;
  visibility: visible;
  background-color: transparent;
  width: 110px;
  height: 110px;
  cursor: pointer;
  z-index: 11;
  backface-visibility: hidden;
  transform: translateZ(0);
  transition: visibility 0.5s;
  left: 0;
  bottom: 0;
  display: block;
`;

const HotlinePhoneRingCircle = styled.div`
  width: 85px;
  height: 85px;
  top: 10px;
  left: 10px;
  position: absolute;
  background-color: transparent;
  border-radius: 100%;
  border: 2px solid #e60808;
  animation: ${phoneringAloCircleAnim} 1.2s infinite ease-in-out;
  transition: all 0.5s;
  transform-origin: 50% 50%;
  opacity: 0.5;
`;

const HotlinePhoneRingCircleFill = styled.div`
  width: 55px;
  height: 55px;
  top: 25px;
  left: 25px;
  position: absolute;
  background-color: rgba(230, 8, 8, 0.7);
  border-radius: 100%;
  border: 2px solid transparent;
  animation: ${phoneringAloCircleFillAnim} 2.3s infinite ease-in-out;
  transition: all 0.5s;
  transform-origin: 50% 50%;
`;

const HotlinePhoneRingImgCircle = styled.div`
  background-color: #e60808;
  width: 33px;
  height: 33px;
  top: 37px;
  left: 37px;
  position: absolute;
  background-size: 20px;
  border-radius: 100%;
  border: 2px solid transparent;
  animation: ${phoneringAloCircleImgAnim} 1s infinite ease-in-out;
  transform-origin: 50% 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PpsBtnImg = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HotlineBar = styled.div`
  position: absolute;
  background: rgba(230, 8, 8, 0.75);
  height: 40px;
  width: 180px;
  line-height: 40px;
  border-radius: 3px;
  padding: 0 10px;
  background-size: 100%;
  cursor: pointer;
  transition: all 0.8s;
  z-index: 9;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.1);
  border-radius: 50px;
  left: 33px;
  bottom: 37px;
`;

const HotlineBarLink = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 15px;
  font-weight: bold;
  text-indent: 50px;
  display: block;
  letter-spacing: 1px;
  line-height: 40px;
  font-family: Arial;
`;
const ppsBtnImgImgStyle = {
  width: "20px",
  height: "20px",
  "&:hover": {
    backgroundColor: "#f5f5f5",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
};

const CellPhone = () => {
  return (
    <HotlinePhoneRingWrap>
      <HotlinePhoneRing>
        <HotlinePhoneRingCircle />
        <HotlinePhoneRingCircleFill />
        <HotlinePhoneRingImgCircle>
          <PpsBtnImg href="tel:0372757777">
            <WifiCalling3Icon style={ppsBtnImgImgStyle} />
          </PpsBtnImg>
        </HotlinePhoneRingImgCircle>
      </HotlinePhoneRing>
      <HotlineBar>
        <HotlineBarLink href="tel:0372757777">
          <span className="text-hotline">0372.75.7777</span>
        </HotlineBarLink>
      </HotlineBar>
    </HotlinePhoneRingWrap>
  );
};

export default CellPhone;
