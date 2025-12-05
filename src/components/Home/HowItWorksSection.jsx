import React from "react";
import {
  FaUserEdit,
  FaUserShield,
  FaTools,
  FaCheckCircle,
} from "react-icons/fa";

const steps = [
  {
    id: 1,
    icon: <FaUserEdit className="text-green-600 text-3xl" />,
    title: "Citizen Reports",
    description: "Citizens submit issues with details, photos, and location.",
  },
  {
    id: 2,
    icon: <FaUserShield className="text-green-600 text-3xl" />,
    title: "Admin Assigns",
    description: "Admin reviews and assigns the issue to staff for action.",
  },
  {
    id: 3,
    icon: <FaTools className="text-green-600 text-3xl" />,
    title: "Staff Works",
    description: "Staff verifies the issue, updates progress, and resolves it.",
  },
  {
    id: 4,
    icon: <FaCheckCircle className="text-green-600 text-3xl" />,
    title: "Issue Resolved",
    description:
      "System updates status and citizens can track resolution anytime.",
  },
];

const HowItWorksSection = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-green-700">
        How It Works
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex flex-col items-center text-center p-6 border rounded-lg shadow hover:shadow-lg transition bg-white"
          >
            {step.icon}
            <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 text-gray-600 text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorksSection;
