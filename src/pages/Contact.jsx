import React from 'react';
import BreadCrumb from '../Components/common/BreadCrumb'; 
import personImage from "../assets/person.png";

const Contact = () => {
  return (
    <>
      <BreadCrumb title="Contact Us" />
      <div className="max-w-container mx-auto px-4 pt-8 pb-20">
        <h2 className="text-secondary-200 text-3xl font-bold mb-8 text-center">Contact Us</h2>

        <div className="flex flex-col lg:flex-row items-center bg-white p-8 rounded-lg shadow-md">
          {/* Form Section */}
          <div className="space-y-4 w-full lg:w-1/2 mb-8 lg:mb-0 lg:mr-8">
            <h3 className="text-xl font-semibold mb-4 text-center lg:text-left">Send us a Message</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  placeholder="Your Email Address"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded resize-none"
                  placeholder="Your Message"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-secondary-300 text-white px-4 py-2 rounded hover:bg-secondary-200"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Image Section */}
          <div className="flex items-center justify-center w-full lg:w-1/2">
            <img src={personImage} alt="Person" className="w-64 h-64 object-cover rounded-full" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
