import React, { useState } from "react";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Testimonials = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      category: "organizer",
      name: "Rajith Kumar",
      role: "Tournament Organizer",
      company: "Sri Lanka Cricket League",
      image: "https://i.pravatar.cc/150?img=1",
      text: "Tournaments.lk has completely streamlined our tournament management process. The platform is user-friendly and our participants love the real-time updates.",
      rating: 5,
    },
    {
      id: 2,
      category: "player",
      name: "Aisha Perera",
      role: "Professional Athlete",
      company: "Women's Badminton Association",
      image: "https://i.pravatar.cc/150?img=47",
      text: "Finding tournaments in one place is amazing! I've discovered so many opportunities and met incredible players through this platform.",
      rating: 5,
    },
    {
      id: 3,
      category: "team",
      name: "Colombo Sports Club",
      role: "Basketball Team",
      company: "CSC Sports Management",
      image: "https://i.pravatar.cc/150?img=12",
      text: "The registration process is smooth, and the tournament management features help us stay organized. Highly recommended for all sports teams!",
      rating: 5,
    },
    {
      id: 4,
      category: "organizer",
      name: "Madhava Jayasena",
      role: "Event Manager",
      company: "National Football Federation",
      image: "https://i.pravatar.cc/150?img=3",
      text: "Managing hundreds of participants has never been easier. The analytics and reporting tools provided by Tournaments.lk are exceptional.",
      rating: 5,
    },
    {
      id: 5,
      category: "player",
      name: "Dhanuka Silva",
      role: "Tennis Player",
      company: "Sri Lanka Tennis Federation",
      image: "https://i.pravatar.cc/150?img=5",
      text: "The platform's interface is intuitive and the support team is very responsive. It's the go-to place for tennis tournaments in Sri Lanka.",
      rating: 5,
    },
    {
      id: 6,
      category: "team",
      name: "Galle Sports United",
      role: "Soccer Team",
      company: "GSU Management",
      image: "https://i.pravatar.cc/150?img=8",
      text: "We've registered for multiple tournaments and each experience has been seamless. This platform truly connects the sports community!",
      rating: 5,
    },
  ];

  const categories = [
    { label: "All", value: "all" },
    { label: "Organizers", value: "organizer" },
    { label: "Players", value: "player" },
    { label: "Teams", value: "team" },
  ];

  const filteredTestimonials =
    activeCategory === "all"
      ? testimonials
      : testimonials.filter((t) => t.category === activeCategory);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? filteredTestimonials.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === filteredTestimonials.length - 1 ? 0 : prev + 1
    );
  };

  const itemsPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
  const visibleTestimonials = filteredTestimonials.slice(
    currentIndex,
    currentIndex + itemsPerView
  );

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary-900 mb-4">
            Trusted by <span className="text-primary-600">Thousands</span>
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            See what organizers, players, and teams have to say about their 
            experience with Tournaments.lk
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setActiveCategory(cat.value);
                setCurrentIndex(0);
              }}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === cat.value
                  ? "bg-primary-600 text-white shadow-lg"
                  : "bg-white text-secondary-700 border-2 border-secondary-200 hover:border-primary-600"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Testimonials Container */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-8 flex flex-col h-full animate-slide-up"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="text-yellow-400"
                      size={18}
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-secondary-700 mb-6 flex-grow italic">
                  "{testimonial.text}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-secondary-200">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary-600"
                  />
                  <div>
                    <h4 className="font-bold text-secondary-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-secondary-600">{testimonial.role}</p>
                    <p className="text-xs text-primary-600 font-semibold">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {filteredTestimonials.length > itemsPerView && (
            <div className="flex justify-center gap-4">
              <button
                onClick={goToPrevious}
                className="bg-primary-600 hover:bg-primary-700 text-white rounded-full p-3 transition-all duration-300 shadow-lg hover:shadow-xl"
                aria-label="Previous testimonials"
              >
                <FaChevronLeft size={20} />
              </button>
              <button
                onClick={goToNext}
                className="bg-primary-600 hover:bg-primary-700 text-white rounded-full p-3 transition-all duration-300 shadow-lg hover:shadow-xl"
                aria-label="Next testimonials"
              >
                <FaChevronRight size={20} />
              </button>
            </div>
          )}

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({
              length: Math.ceil(filteredTestimonials.length / itemsPerView),
            }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx * itemsPerView)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === Math.floor(currentIndex / itemsPerView)
                    ? "bg-primary-600 w-6"
                    : "bg-secondary-300 hover:bg-secondary-400"
                }`}
                aria-label={`Go to testimonial group ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 md:mt-20">
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-4xl font-bold text-primary-600 mb-2">
              10,000+
            </div>
            <p className="text-secondary-700 font-semibold">Active Users</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-4xl font-bold text-primary-600 mb-2">
              500+
            </div>
            <p className="text-secondary-700 font-semibold">
              Tournaments Hosted
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-4xl font-bold text-primary-600 mb-2">
              4.9★
            </div>
            <p className="text-secondary-700 font-semibold">Average Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
