import React from "react";
import { Link } from "react-router-dom";

export default function Banner(props) {
  return (
    <div className={`${props.background} bg-full bg-no-repeat bg-transparent relative`}>
      <div className="container py-[116px] sm:py-[130px] md:py-[148px] lg:py-[166px] xl:py-[188px] xxl:py-[210px]">
        <div className="text-start">
          <p className="text-[18px] font-bold text-secondary">{props.label}</p>
          <p className="text-[22px] font-bold sm:text-[33px] md:text-[37px] lg:text-[42px] xl:text-[47px] xxl:text-[53px] mb-4">
            {props.heading}
          </p>
          <p className="mb-8">{props.description}</p>
          <Link to="/store" className="btn">
            Shop now
          </Link>
        </div>
      </div>
    </div>
  );
}
