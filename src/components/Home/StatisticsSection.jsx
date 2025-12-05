import React from "react";
import {
  FaClipboardList,
  FaCheckCircle,
  FaUsers,
  FaUserShield,
} from "react-icons/fa";

const stats = [
  {
    id: 1,
    icon: <FaClipboardList className="text-green-600 text-4xl" />,
    value: "1200+",
    label: "Total Issues Reported",
  },
  {
    id: 2,
    icon: <FaCheckCircle className="text-green-600 text-4xl" />,
    value: "950+",
    label: "Issues Resolved",
  },
  {
    id: 3,
    icon: <FaUsers className="text-green-600 text-4xl" />,
    value: "500+",
    label: "Active Citizens",
  },
  {
    id: 4,
    icon: <FaUserShield className="text-green-600 text-4xl" />,
    value: "50+",
    label: "Staff Members",
  },
];

const StatisticsSection = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-green-700">
          Our Impact in Numbers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
            >
              {stat.icon}
              <h3 className="mt-4 text-3xl font-extrabold text-black">
                {stat.value}
              </h3>
              <p className="mt-2 text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatisticsSection;
