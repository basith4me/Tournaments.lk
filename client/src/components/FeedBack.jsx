import React from "react";

const FeedBack = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center pt-4 ">
        <h1 className="text-3xl font-bold text-center text-green-600">Comment Your Experience with Us</h1>
        <div className="flex flex-col mt-5 w-1/3 space-y-3">
            <input type="text" placeholder="Name" className="w-full rounded-md p-2 border-2 border-green-600"/>
            <input type="email" placeholder="Email" className="w-full rounded-md p-2 border-2 border-green-600"/>
            <input type="text" placeholder="Phone No" className="w-full rounded-md p-2 border-2 border-green-600"/>
            <textarea placeholder="Message" className="rounded-md  border-green-600 border-2 p-2"/>
            <button className="bg-green-600 px-4 text-white rounded-md p-2 font-bold text-xl hover:bg-green-700 duration-300">Send</button>
        </div>
      </div>
    </>
  );
};

export default FeedBack;
