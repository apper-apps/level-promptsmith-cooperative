import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import TemplateGrid from "@/components/organisms/TemplateGrid";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { templateService } from "@/services/api/templateService";

const Templates = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredTemplates, setFilteredTemplates] = useState([]);

  const categories = [
    { id: "all", label: "All Templates" },
    { id: "writing", label: "Writing" },
    { id: "coding", label: "Coding" },
    { id: "marketing", label: "Marketing" },
    { id: "analysis", label: "Analysis" },
    { id: "education", label: "Education" },
  ];

  useEffect(() => {
    loadTemplates();
  }, []);

  useEffect(() => {
    let filtered = templates;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(template =>
        template.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTemplates(filtered);
  }, [searchTerm, selectedCategory, templates]);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      setError(null);
      await new Promise(resolve => setTimeout(resolve, 300));
      const data = await templateService.getAll();
      setTemplates(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUseTemplate = (template) => {
    navigate("/builder", { state: { template } });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClear = () => {
    setSearchTerm("");
  };

  if (loading) {
    return <Loading type="grid" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadTemplates} />;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-display text-gray-900">
            Templates
          </h1>
          <p className="text-gray-600 mt-1">
            Pre-built prompt templates to get you started quickly
          </p>
        </div>
        <Button variant="primary" onClick={() => navigate("/builder")}>
          <ApperIcon name="Plus" size={16} className="mr-2" />
          Create Custom
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-100">Total Templates</p>
              <p className="text-2xl font-bold">{templates.length}</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <ApperIcon name="FileText" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-sky-400 to-sky-500 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sky-100">Categories</p>
              <p className="text-2xl font-bold">{categories.length - 1}</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <ApperIcon name="Grid" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-coral-500 to-coral-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-coral-100">Premium</p>
              <p className="text-2xl font-bold">
                {templates.filter(t => t.isPremium).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <ApperIcon name="Star" size={24} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="flex-1">
          <SearchBar
            value={searchTerm}
            onChange={handleSearchChange}
            onClear={handleSearchClear}
            placeholder="Search templates by name, description, or category..."
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === category.id
                ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      {filteredTemplates.length === 0 ? (
        <Empty
          title={searchTerm ? "No matching templates" : "No templates found"}
          description={searchTerm ? "Try adjusting your search terms" : "Check back later for new templates"}
          actionText="Create Custom"
          onAction={() => navigate("/builder")}
          icon="FileText"
        />
      ) : (
        <TemplateGrid
          templates={filteredTemplates}
          onUse={handleUseTemplate}
        />
      )}
    </div>
  );
};

export default Templates;