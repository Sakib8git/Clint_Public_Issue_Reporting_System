import React from "react";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Rahim Uddin",
    feedback: "Streetlight fixed within 2 days! Very responsive system.",
    rating: 5,
    avatar: "https://via.placeholder.com/80?text=R",
  },
  {
    id: 2,
    name: "Karim Ali",
    feedback: "Garbage cleaned quickly, thanks to the staff team.",
    rating: 4,
    avatar: "https://via.placeholder.com/80?text=K",
  },
  {
    id: 3,
    name: "Fatema Begum",
    feedback: "Water leakage issue resolved smoothly. Great initiative!",
    rating: 5,
    avatar: "https://via.placeholder.com/80?text=F",
  },
];

const TestimonialsSection = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-green-700">
          What Citizens Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col items-center text-center"
            >
              <img
                src={t.avatar}
                alt={t.name}
                className="w-20 h-20 rounded-full mb-4 border-2 border-green-500"
              />
              <h3 className="text-lg font-semibold">{t.name}</h3>
              <p className="mt-2 text-gray-600 text-sm italic">
                "{t.feedback}"
              </p>
              <div className="flex mt-3 text-yellow-400">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
