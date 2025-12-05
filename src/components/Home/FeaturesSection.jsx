import React from "react";
import {
  FaBolt,
  FaClock,
  FaChartLine,
  FaUsers,
  FaMapMarkedAlt,
  FaShieldAlt,
} from "react-icons/fa";

const features = [
  {
    id: 1,
    icon: <FaBolt className="text-green-600 text-3xl" />,
    title: "Instant Reporting",
    description:
      "Citizens can quickly report issues with photos and location details.",
  },
  {
    id: 2,
    icon: <FaClock className="text-green-600 text-3xl" />,
    title: "Faster Response",
    description:
      "Admins and staff get notified instantly to reduce response time.",
  },
  {
    id: 3,
    icon: <FaChartLine className="text-green-600 text-3xl" />,
    title: "Issue Tracking",
    description:
      "Track issues through Pending, In-Progress, Resolved, and Closed statuses.",
  },
  {
    id: 4,
    icon: <FaUsers className="text-green-600 text-3xl" />,
    title: "Role Management",
    description:
      "Separate dashboards for Admin, Staff, and Citizens with role-based access.",
  },
  {
    id: 5,
    icon: <FaMapMarkedAlt className="text-green-600 text-3xl" />,
    title: "Location Based",
    description:
      "Issues are mapped with location info for better city planning.",
  },
  {
    id: 6,
    icon: <FaShieldAlt className="text-green-600 text-3xl" />,
    title: "Secure & Transparent",
    description:
      "Environment variables hide secrets, and timeline ensures transparency.",
  },
];

const FeaturesSection = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-green-700">
        Application Features
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex flex-col items-center text-center p-6 border rounded-lg shadow hover:shadow-lg transition bg-white"
          >
            {feature.icon}
            <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
            <p className="mt-2 text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
