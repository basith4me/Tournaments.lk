import React from "react";
import { FaSearch, FaUserCheck, FaDumbbell, FaTrophy, FaShareAlt } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: FaSearch,
      title: "Browse Tournaments",
      description:
        "Explore a wide range of tournaments across different sports and skill levels. Filter by sport, location, and date to find the perfect match for your team.",
    },
    {
      id: 2,
      icon: FaUserCheck,
      title: "Register Your Team",
      description:
        "Create your team profile and register for tournaments. Add team members, set up credentials, and get ready to compete with other passionate teams.",
    },
    {
      id: 3,
      icon: FaDumbbell,
      title: "Prepare & Train",
      description:
        "Organize practice sessions, share strategies with teammates, and prepare your team for the upcoming matches. Use our tools to track team performance.",
    },
    {
      id: 4,
      icon: FaTrophy,
      title: "Compete & Win",
      description:
        "Participate in exciting tournaments, compete with other teams, and showcase your skills. Track live scores and tournament standings on our platform.",
    },
    {
      id: 5,
      icon: FaShareAlt,
      title: "Celebrate & Share",
      description:
        "Celebrate your achievements, share your success stories with the community. Build your team's reputation and connect with other sports enthusiasts.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary-900 mb-4">
            How It <span className="text-primary-600">Works</span>
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Get started on Tournaments.lk in 5 simple steps. Join tournaments, compete, 
            and become part of Sri Lanka's largest sports community.
          </p>
        </div>

        {/* Steps Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="relative animate-slide-up">
                {/* Card */}
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 h-full flex flex-col group">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 bg-primary-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg shadow-lg group-hover:bg-primary-700 transition-colors duration-300">
                    {step.id}
                  </div>

                  {/* Icon */}
                  <div className="mb-6 pt-2">
                    <div className="bg-primary-50 rounded-lg p-4 w-fit mx-auto group-hover:bg-primary-100 transition-colors duration-300">
                      <Icon className="text-primary-600 text-3xl" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-heading font-bold text-secondary-900 mb-3 text-center">
                    {step.title}
                  </h3>
                  <p className="text-secondary-600 text-sm text-center flex-grow">
                    {step.description}
                  </p>
                </div>

                {/* Connector Line (hidden on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-0.5 bg-gradient-to-r from-primary-600 to-transparent transform translate-y-1/2"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 md:mt-20 text-center">
          <p className="text-secondary-700 text-lg mb-6">
            Ready to start your tournament journey?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/alltournaments"
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg shadow-md inline-block"
            >
              Explore Tournaments
            </a>
            <a
              href="/post-tournaments"
              className="bg-accent-600 hover:bg-accent-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg shadow-md inline-block"
            >
              Post Your Tournament
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
