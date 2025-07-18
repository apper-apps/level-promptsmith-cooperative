import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Sidebar = ({ isOpen, onClose }) => {
  const navigation = [
    { name: "Dashboard", href: "/", icon: "LayoutDashboard" },
    { name: "Prompt Builder", href: "/builder", icon: "Wrench" },
    { name: "Templates", href: "/templates", icon: "FileText" },
    { name: "Settings", href: "/settings", icon: "Settings" },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 p-6 border-b border-gray-200">
        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
          <ApperIcon name="Sparkles" size={18} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold font-display gradient-text">
            PromptSmith
          </h1>
          <p className="text-xs text-gray-500">Craft brilliant prompts</p>
        </div>
      </div>

      <nav className="flex-1 px-6 py-6">
        <div className="space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-primary-50 hover:text-primary-700",
                  isActive
                    ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg"
                    : "text-gray-700 hover:transform hover:scale-[1.02]"
                )
              }
            >
              <ApperIcon name={item.icon} size={18} />
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="p-6 border-t border-gray-200">
        <div className="bg-gradient-to-br from-lavender-400 to-lavender-500 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <ApperIcon name="Zap" size={16} className="text-primary-600" />
            <span className="text-sm font-semibold text-primary-700">
              Free Plan
            </span>
          </div>
          <p className="text-xs text-primary-600 mb-3">
            5 prompts remaining
          </p>
          <button className="w-full bg-gradient-to-r from-coral-500 to-coral-600 text-white text-xs font-medium py-2 rounded-md hover:from-coral-600 hover:to-coral-700 transition-all duration-200">
            Upgrade to Pro
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-white border-r border-gray-200 h-full">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-64 bg-white h-full shadow-xl"
          >
            <div className="absolute top-4 right-4 lg:hidden">
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <ApperIcon name="X" size={20} />
              </button>
            </div>
            <SidebarContent />
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Sidebar;