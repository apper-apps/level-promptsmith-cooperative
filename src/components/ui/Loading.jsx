import React from "react";
import { motion } from "framer-motion";

const Loading = ({ type = "grid" }) => {
  if (type === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-card"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="loading-shimmer h-6 w-3/4 rounded"></div>
                <div className="flex gap-2">
                  <div className="loading-shimmer h-8 w-8 rounded-lg"></div>
                  <div className="loading-shimmer h-8 w-8 rounded-lg"></div>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="loading-shimmer h-6 w-16 rounded-full"></div>
                <div className="loading-shimmer h-6 w-20 rounded-full"></div>
              </div>
              <div className="space-y-2">
                <div className="loading-shimmer h-4 w-full rounded"></div>
                <div className="loading-shimmer h-4 w-2/3 rounded"></div>
              </div>
              <div className="loading-shimmer h-4 w-24 rounded"></div>
              <div className="loading-shimmer h-10 w-full rounded-lg"></div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === "detail") {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl p-8 shadow-card">
          <div className="space-y-6">
            <div className="loading-shimmer h-8 w-1/2 rounded"></div>
            <div className="flex gap-2">
              <div className="loading-shimmer h-6 w-16 rounded-full"></div>
              <div className="loading-shimmer h-6 w-20 rounded-full"></div>
              <div className="loading-shimmer h-6 w-18 rounded-full"></div>
            </div>
            <div className="space-y-4">
              <div className="loading-shimmer h-20 w-full rounded-lg"></div>
              <div className="loading-shimmer h-20 w-full rounded-lg"></div>
              <div className="loading-shimmer h-20 w-full rounded-lg"></div>
            </div>
            <div className="loading-shimmer h-40 w-full rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-64">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full animate-pulse"></div>
        <div className="text-lg font-medium text-gray-600">Loading...</div>
      </div>
    </div>
  );
};

export default Loading;