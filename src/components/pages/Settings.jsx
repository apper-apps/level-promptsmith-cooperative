import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [settings, setSettings] = useState({
    email: "user@example.com",
    notifications: {
      emailUpdates: true,
      promptReminders: false,
      weeklyDigest: true,
    },
    preferences: {
      theme: "light",
      defaultFormat: "paragraph",
      autoSave: true,
    },
  });

  const tabs = [
    { id: "account", label: "Account", icon: "User" },
    { id: "notifications", label: "Notifications", icon: "Bell" },
    { id: "preferences", label: "Preferences", icon: "Settings" },
    { id: "billing", label: "Billing", icon: "CreditCard" },
  ];

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-display text-gray-900">
          Settings
        </h1>
        <p className="text-gray-600 mt-1">
          Manage your account and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <ApperIcon name={tab.icon} size={18} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "account" && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Account Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                      <ApperIcon name="User" size={32} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        John Doe
                      </h3>
                      <p className="text-gray-600">Free Plan</p>
                    </div>
                  </div>
                  <Input
                    label="Email Address"
                    value={settings.email}
                    onChange={(e) => handleSettingChange("", "email", e.target.value)}
                    type="email"
                  />
                  <Input
                    label="Display Name"
                    value="John Doe"
                    placeholder="Enter your display name"
                  />
                  <div className="flex gap-4">
                    <Button variant="primary">Save Changes</Button>
                    <Button variant="outline">Cancel</Button>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === "notifications" && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Notification Preferences
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Email Updates</h3>
                      <p className="text-sm text-gray-600">
                        Receive updates about new features and improvements
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.emailUpdates}
                        onChange={(e) => handleSettingChange("notifications", "emailUpdates", e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Prompt Reminders</h3>
                      <p className="text-sm text-gray-600">
                        Get reminded to create prompts regularly
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.promptReminders}
                        onChange={(e) => handleSettingChange("notifications", "promptReminders", e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Weekly Digest</h3>
                      <p className="text-sm text-gray-600">
                        Receive a weekly summary of your prompt activity
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.weeklyDigest}
                        onChange={(e) => handleSettingChange("notifications", "weeklyDigest", e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === "preferences" && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  App Preferences
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Theme
                    </label>
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleSettingChange("preferences", "theme", "light")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                          settings.preferences.theme === "light"
                            ? "border-primary-500 bg-primary-50 text-primary-700"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <ApperIcon name="Sun" size={16} />
                        Light
                      </button>
                      <button
                        onClick={() => handleSettingChange("preferences", "theme", "dark")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                          settings.preferences.theme === "dark"
                            ? "border-primary-500 bg-primary-50 text-primary-700"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <ApperIcon name="Moon" size={16} />
                        Dark
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Default Output Format
                    </label>
                    <select
                      value={settings.preferences.defaultFormat}
                      onChange={(e) => handleSettingChange("preferences", "defaultFormat", e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
                    >
                      <option value="paragraph">Paragraph</option>
                      <option value="bullet-points">Bullet Points</option>
                      <option value="numbered-list">Numbered List</option>
                      <option value="json">JSON</option>
                      <option value="table">Table</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Auto-save</h3>
                      <p className="text-sm text-gray-600">
                        Automatically save your work as you type
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.preferences.autoSave}
                        onChange={(e) => handleSettingChange("preferences", "autoSave", e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === "billing" && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Billing & Subscription
                </h2>
                <div className="space-y-6">
                  <div className="bg-lavender-400 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-primary-700">
                          Free Plan
                        </h3>
                        <p className="text-primary-600">
                          5 prompts remaining this month
                        </p>
                      </div>
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                        <ApperIcon name="Zap" size={32} className="text-white" />
                      </div>
                    </div>
                    <div className="w-full bg-primary-200 rounded-full h-2 mb-4">
                      <div className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full w-1/2"></div>
                    </div>
                    <Button variant="coral" className="w-full">
                      <ApperIcon name="Crown" size={16} className="mr-2" />
                      Upgrade to Pro - $29/month
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-4 border-2 border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-2">Pro Plan</h4>
                      <div className="text-2xl font-bold text-gray-900 mb-2">$29</div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Unlimited prompts</li>
                        <li>• AI enhancer</li>
                        <li>• Export formats</li>
                        <li>• Priority support</li>
                      </ul>
                    </Card>
                    
                    <Card className="p-4 border-2 border-coral-300 bg-coral-50">
                      <h4 className="font-semibold text-gray-900 mb-2">Team Plan</h4>
                      <div className="text-2xl font-bold text-gray-900 mb-2">$99</div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Everything in Pro</li>
                        <li>• Team collaboration</li>
                        <li>• Shared folders</li>
                        <li>• Admin controls</li>
                      </ul>
                    </Card>
                  </div>
                </div>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;