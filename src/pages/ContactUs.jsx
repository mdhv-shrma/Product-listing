import React from "react";

const ContactUs = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      
      <p className="text-lg text-gray-700 mb-6">
        Have any questions or need assistance? Feel free to reach out to us!
      </p>
      
      <div className="bg-gray-100 p-6 rounded-lg shadow-md text-left">
        <h2 className="text-2xl font-semibold mb-3">Our Contact Information</h2>
        <p className="text-gray-700"><strong>Email:</strong> support@yourstore.com</p>
        <p className="text-gray-700"><strong>Phone:</strong> +1 (123) 456-7890</p>
        <p className="text-gray-700"><strong>Address:</strong> 1234 E-Commerce St, Shopping City, SC 56789</p>
      </div>
      
      <h2 className="text-2xl font-semibold mt-6 mb-3">Send Us a Message</h2>
      <form className="bg-gray-100 p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input type="text" className="w-full p-3 border rounded" placeholder="Enter your name" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input type="email" className="w-full p-3 border rounded" placeholder="Enter your email" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Message</label>
          <textarea className="w-full p-3 border rounded" rows="4" placeholder="Write your message..." required></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUs;