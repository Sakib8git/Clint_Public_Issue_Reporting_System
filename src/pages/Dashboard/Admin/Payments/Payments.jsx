import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Container from "../../../../components/Shared/Container";

const Payments = () => {
  const axiosSecure = useAxiosSecure();
  const [filterStatus, setFilterStatus] = useState("");
  const [filterMethod, setFilterMethod] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // ✅ Fetch citizens
  const {
    data: citizens = [],
    isLoading: citizensLoading,
    isError: citizensError,
  } = useQuery({
    queryKey: ["citizens"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/citizen");
      return data;
    },
  });

  // ✅ Fetch reports (issues)
  const {
    data: reports = [],
    isLoading: reportsLoading,
    isError: reportsError,
  } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/reports");
      return data;
    },
  });

  if (citizensLoading || reportsLoading) {
    return <p className="text-center mt-10">Loading payments...</p>;
  }

  if (citizensError || reportsError) {
    return (
      <p className="text-center mt-10 text-red-500">Error loading payments</p>
    );
  }

  // ✅ Citizen payments
  const citizenPayments = citizens
    .filter((c) => c.status === "premium")
    .map((c, index) => ({
      id: `CIT${String(index + 1).padStart(3, "0")}`,
      user: c.name,
      amount: 1000, // citizen amount
      method: "Stripe",
      status: "success",
      date: c.paymentDate
        ? new Date(c.paymentDate).toISOString().split("T")[0]
        : "N/A",
    }));

  // ✅ Boosted issue payments (priority High)
  const issuePayments = reports
    .filter((r) => r.priority === "High" && r.boosted)
    .map((r, index) => ({
      id: `ISS${String(index + 1).padStart(3, "0")}`,
      user: r.title || "Unknown",
      amount: 100, // issue amount
      method: "Stripe",
      status: "success",
      date: r.lastUpdated
        ? new Date(r.lastUpdated).toISOString().split("T")[0]
        : "N/A",
    }));

  // ✅ Combine both
  const payments = [...citizenPayments, ...issuePayments];

  // ✅ Filtering logic
  const filteredPayments = payments
    .filter((p) => (filterStatus ? p.status === filterStatus : true))
    .filter((p) => (filterMethod ? p.method === filterMethod : true))
    .filter((p) => (filterDate ? p.date === filterDate : true));

  // ✅ Total amount
  const totalAmount = filteredPayments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="p-6 ">
      <h1 className="text-2xl font-bold mb-4">Payments</h1>

      {/* ✅ Total Amount */}
      <div className="mb-4 text-lg font-semibold text-blue-600">
        Total Amount: {totalAmount} tk
      </div>

      {/* Filters */}
      <div className="flex gap-4  mb-6">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">Filter by Status</option>
          <option value="success">Success</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>

        <select
          value={filterMethod}
          onChange={(e) => setFilterMethod(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">Filter by Method</option>
          <option value="Stripe">Stripe</option>
          <option value="Bkash">Bkash</option>
        </select>

        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border px-3 py-2 rounded"
        />
      </div>

      {/* Table */}
      <Container>
        <table className="w-full bg-amber-50  rounded-2xl text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Payment ID</th>
              <th className="p-2">User</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Method</th>
              <th className="p-2">Status</th>
              <th className="p-2">Date</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment) => (
              <tr key={payment.id}>
                <td className="p-2">{payment.id}</td>
                <td className="p-2">{payment.user}</td>
                <td className="p-2">{payment.amount} tk</td>
                <td className="p-2">{payment.method}</td>
                <td className="p-2 text-green-600 capitalize">
                  {payment.status}
                </td>
                <td className="p-2">{payment.date}</td>
                <td className="p-2">
                  <button
                    className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 
                               text-white font-semibold rounded-lg shadow-md 
                               transition-transform transform hover:scale-105 
                               hover:from-indigo-600 hover:to-blue-500"
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </div>
  );
};

export default Payments;