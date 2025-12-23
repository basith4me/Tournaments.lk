import React from "react";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const FeedBack = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    feedback: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Initialize EmailJS (run once when component mounts)
  React.useEffect(() => {
    emailjs.init({
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.feedback) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    try {
      const templateParams = {
        from_name: formData.name,
        email: formData.email,
        contactNo: formData.phoneNo,
        message: formData.feedback,
        to_email: import.meta.env.VITE_EMAILJS_TO_EMAIL,
      };

      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams
      );

      if (response.status === 200) {
        toast.success("Feedback sent successfully! We'll get back to you soon.");
        setFormData({
          name: "",
          email: "",
          phoneNo: "",
          feedback: "",
        });
      }
    } catch (error) {
      console.error("Failed to send email:", error);
      toast.error(
        error.text || "Failed to send feedback. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center pt-4 ">
        <h1 className="text-3xl font-bold text-center text-green-600">
          Comment Your Experience with Us
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col mt-5 w-1/3 space-y-3"
        >
          <input
            type="text"
            placeholder="Name"
            className="w-full rounded-md p-2 border-2 border-green-600"
            name="name"
            onChange={handleChange}
            value={formData.name}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-md p-2 border-2 border-green-600"
            name="email"
            onChange={handleChange}
            value={formData.email}
          />
          <input
            type="text"
            placeholder="Phone No"
            className="w-full rounded-md p-2 border-2 border-green-600"
            name="phoneNo"
            onChange={handleChange}
            value={formData.phoneNo}
          />
          <textarea
            placeholder="Message"
            className="rounded-md  border-green-600 border-2 p-2"
            name="feedback"
            onChange={handleChange}
            value={formData.feedback}
          />
          <button
            className="bg-green-600 px-4 text-white rounded-md p-2 font-bold text-xl hover:bg-green-700 duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </>
  );
};

export default FeedBack;
