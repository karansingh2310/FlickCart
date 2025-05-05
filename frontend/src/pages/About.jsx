import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
  return (
    <div>
      <div className="flex items-center justify-center gap-2 mb-2 mt-8 pl-4 ">
        <p className="prata-regular text-3xl ">About Us</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="w-full md:max-w-[450px]" src={assets.about} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-1/2 text-gray-600">
          <p>
            At FlickCart, we believe shopping should be simple, secure, and
            satisfying. Our mission is to bring you a curated selection of
            quality products at unbeatable prices, all in one place. Whether
            you’re upgrading your wardrobe or finding essentials for your home,
            we’re here to make every purchase a great experience.
          </p>
          <p>
            With a focus on customer satisfaction, fast delivery, and reliable
            service, FlickCart has become a trusted destination for thousands of
            shoppers. We’re constantly evolving to meet your needs—offering new
            trends, exclusive deals, and a seamless shopping journey. Join us
            and discover the difference.
          </p>
          <strong className="text-gray-800">Our Mission</strong>
          <p>
            Our mission is to empower everyday shoppers with access to quality
            products, exceptional service, and a hassle-free shopping
            experience—all at prices that make sense.
          </p>
        </div>
      </div>

      <div className="flex items-center  gap-2 mb-2 mt-8 pl-4 py-4">
        <p className="prata-regular text-3xl ">Why Choose Us</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      <div className="flex flex-col md:flex-row text-base mb-10 gap-4">

        <div className="border px-10 md:px-8 py-8 sm:py-20 flex flex-col gap-5">
          <strong className="text-gray-800">Quality Assurance</strong>
          <p>
            We carefully curate our product selection to ensure that everything
            you receive meets high standards of durability, design, and
            reliability.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <strong className="text-gray-800">Convenience</strong>
          <p>
            From intuitive navigation to fast checkout and reliable delivery, we
            make sure your shopping journey is smooth, simple, and satisfying.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <strong className="text-gray-800">Customer Obsession</strong>
          <p>
            Our customers are at the heart of everything we do—we listen, we
            adapt, and we continuously improve to exceed your expectations.
          </p>
        </div>
      </div>

      <NewsLetterBox/>
    </div>
  );
};

export default About;
