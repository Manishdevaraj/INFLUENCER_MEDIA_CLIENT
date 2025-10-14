//@ts-nocheck

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaInstagram, FaCheckCircle, FaFacebook } from "react-icons/fa";
import { FiClock } from "react-icons/fi";

export default function InstagramStatus() {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState([]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const data = query.get("data");

    if (data) {
      try {
        const decoded = JSON.parse(atob(data));
        setResult(decoded);
        console.log(decoded);
      } catch (err) {
        console.error("Error decoding data:", err);
      }
    }
  }, [location]);

  const formatDate = () => {
    const d = new Date();
    return d.toLocaleString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <div className="flex items-center space-x-2 mb-3">
          <FaCheckCircle className="text-green-500 text-xl" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Connected Accounts
          </h2>
        </div>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Manage your connected social media accounts and their visibility
        </p>

        {result.length > 0 ? (
          result.map((item, i) => (
            <div
              key={i}
              className={`flex items-center justify-between border rounded-xl p-4 hover:shadow-md transition mb-3 ${
                item.message.includes("successfully")
                  ? "border-green-300"
                  : "border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`p-3 rounded-xl ${
                    item.message.includes("successfully")
                      ? "bg-gradient-to-tr from-pink-500 to-yellow-500"
                      : "bg-blue-600"
                  }`}
                >
                  {item.message.includes("successfully") ? (
                    <FaInstagram className="text-white text-2xl" />
                  ) : (
                    <FaFacebook className="text-white text-2xl" />
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {item.message.includes("successfully")
                        ? "Instagram"
                        : "Facebook Page"}
                    </h3>
                    {item.message.includes("successfully") && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.page_name}
                  </p>

                  {item.page_id && (
                    <p className="text-xs text-gray-500">
                      Page ID: {item.page_id}
                    </p>
                  )}

                  {item.ig_username && (
                    <p className="text-xs text-gray-500">
                      IG Username: {item.ig_username}
                    </p>
                  )}

                  <div className="flex items-center text-xs text-gray-400 mt-1">
                    <FiClock className="mr-1" />
                    {formatDate()}
                  </div>
                </div>
              </div>

              <div className="text-sm text-right">
                {item.message.includes("successfully") ? (
                  <button  className="text-red-600 font-medium hover:underline hidden">
                    Disconnect
                  </button>
                ) : (
                  <span className="text-gray-400 text-sm">
                   Instagram Account Is Not Connected To This Page
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Loading connection status...</p>
        )}

        <button
          onClick={() => navigate("/influencer-dashboard")}
          className="mt-8 w-full py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition"
        >
          Continue to Dashboard
        </button>
      </div>
    </div>
  );
}
