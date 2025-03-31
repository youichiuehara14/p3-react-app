import React, { useState } from 'react';

const ContactForm = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    message: '',
    category: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Form submitted:', userData);
  };
  const handleInputChange = (e) => {
    setUserData((currData) => {
      return { ...currData, [e.target.name]: e.target.value };
    });
  };

  return (
    <>
      <div className="grid grid-cols-1  lg:grid-cols-[1fr_1fr] w-screen gap-10 sm:p-20 p-10 ">
        <div className=" h-full w-full  ">
          <h1 className="text-5xl sm:text-7xl font-secondary mb-5 ">Contact Us</h1>
          <p className="text-sm sm:text-lg font-primary mb-5 lg:hidden">
            We would love to hear from you! Whether you have questions, feedback, or any inquiries,
            feel free to reach out. Please fill out the form below, and our team will get back to
            you as soon as possible.
          </p>

          <form className="focus:outline-none flex flex-col  mt-10 " onSubmit={handleSubmit}>
            <select
              name="category"
              id="category"
              className=" p-2 mb-4 w-full focus:outline-none  border-1 text-white  bg-[#171717] border-[#5a5a5a] "
              onChange={handleInputChange}
            >
              <option value="">Select Your Concern</option>
              <option value="feedback">Feedback</option>
              <option value="inquiry">Inquiry</option>
              <option value="others">Others</option>
            </select>
            <label htmlFor="name" className="text-[#cecece]">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="focus:outline-none  text-white  border-[#5a5a5a] border-b-1 p-2 mb-4 w-full"
              value={userData.name}
              onChange={handleInputChange}
              placeholder="Enter your name..."
            />
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email..."
              className="focus:outline-none   text-white  border-[#5a5a5a] border-b-1 p-2 mb-4 w-full"
              value={userData.email}
              onChange={handleInputChange}
            />

            <label htmlFor="message">Your Message</label>
            <textarea
              name="message"
              id="message"
              placeholder="Type your message here..."
              className="focus:outline-none  text-white  border-[#5a5a5a]  border-1  p-2 mb-4 w-full h-32"
              value={userData.message}
              onChange={handleInputChange}
            ></textarea>
            <button className="bg-orange-500 text-white px-4 py-2 rounded ">Send Message</button>
          </form>
        </div>
        {/* <div className="flex w-full text-center items-center gap-5 h-full bg-[url(/cocktail.jpg)]  bg-cover  bg-no-repeat bg-center"> */}
        <div className="flex text-center items-center gap-5   bg-cover ">
          <div className="hidden lg:inline-flex flex-col  gap-5 w-5/6 mx-auto p-5 bg-gray-0 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-[#838383] ">
            <p className="text-lg font-primary ">
              We would love to hear from you! Whether you have questions, feedback, or any
              inquiries, feel free to reach out. Please fill out the form below, and our team will
              get back to you as soon as possible.
            </p>
            <span className="font-secondary text-lg inline-flex justify-center items-center gap-2">
              <i className="bx bx-envelope text-xl"></i>
              youichiuehara14@gmail.com
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-5 lg:hidden w-full  p-5 bg-gray-0 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-[#838383] ">
          <h2 className="text-2xl">Directly Contact us here!</h2>
          <span className="font-secondary">
            <i className="bx bx-envelope "></i>
            youichiuehara14@gmail.com
          </span>
          <span className="font-secondary">
            <i className="bx bx-envelope "></i>
            halfjapaneserice@gmail.com
          </span>
          <p className="text-lg font-primary "></p>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
