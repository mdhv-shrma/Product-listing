import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">About Us</h1>
      
      <p className="text-lg text-gray-700 mb-6">
        Welcome to <strong>Shoppers Stop</strong>, your go-to destination for high-quality
        products at unbeatable prices. We believe shopping should be easy, enjoyable, and affordable.
      </p>
      
      <h2 className="text-2xl font-semibold mt-6 mb-3">Our Mission</h2>
      <p className="text-gray-700">
        Our mission is to provide customers with top-notch products, an effortless shopping experience,
        and exceptional customer service.
      </p>
      
      <h2 className="text-2xl font-semibold mt-6 mb-3">What We Offer</h2>
      <ul className="text-gray-700 list-disc list-inside">
        <li>Wide Product Selection – From fashion and electronics to home essentials.</li>
        <li>Affordable Pricing – Competitive prices with seasonal discounts.</li>
        <li>Fast & Secure Shipping – Reliable and timely deliveries.</li>
        <li>Easy Returns & Refunds – Hassle-free return policies.</li>
      </ul>
      
    </div>
  );
};

export default AboutUs;