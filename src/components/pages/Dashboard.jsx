import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import SearchBar from "@/components/molecules/SearchBar";
import PromptGrid from "@/components/organisms/PromptGrid";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { promptService } from "@/services/api/promptService";

const Dashboard = () => {
  const navigate = useNavigate();
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPrompts, setFilteredPrompts] = useState([]);

  useEffect(() => {
    loadPrompts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = prompts.filter(prompt =>
        prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        prompt.toneRole?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.goal?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPrompts(filtered);
    } else {
      setFilteredPrompts(prompts);
    }
  }, [searchTerm, prompts]);

  const loadPrompts = async () => {
    try {
      setLoading(true);
      setError(null);
      await new Promise(resolve => setTimeout(resolve, 300));
      const data = await promptService.getAll();
      setPrompts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNewPrompt = () => {
    navigate("/builder");
  };

  const handleEdit = (prompt) => {
    navigate(`/builder/${prompt.Id}`);
  };

  const handleDelete = async (prompt) => {
    if (window.confirm("Are you sure you want to delete this prompt?")) {
      try {
        await promptService.delete(prompt.Id);
        setPrompts(prompts.filter(p => p.Id !== prompt.Id));
        toast.success("Prompt deleted successfully");
      } catch (err) {
        toast.error("Failed to delete prompt");
      }
    }
  };

  const handleDuplicate = async (prompt) => {
    try {
      const duplicatedPrompt = {
        ...prompt,
        title: `${prompt.title} (Copy)`,
        Id: undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const newPrompt = await promptService.create(duplicatedPrompt);
      setPrompts([newPrompt, ...prompts]);
      toast.success("Prompt duplicated successfully");
    } catch (err) {
      toast.error("Failed to duplicate prompt");
    }
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
    return <Error message={error} onRetry={loadPrompts} />;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-display text-gray-900">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your AI prompts and templates
          </p>
        </div>
        <Button variant="primary" onClick={handleNewPrompt}>
          <ApperIcon name="Plus" size={16} className="mr-2" />
          New Prompt
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Prompts</p>
                <p className="text-2xl font-bold text-gray-900">
                  {prompts.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <ApperIcon name="FileText" size={24} className="text-white" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  {prompts.filter(p => new Date(p.createdAt).getMonth() === new Date().getMonth()).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-sky-500 rounded-lg flex items-center justify-center">
                <ApperIcon name="TrendingUp" size={24} className="text-white" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Plan Usage</p>
                <p className="text-2xl font-bold text-gray-900">
                  {prompts.length}/10
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-coral-500 to-coral-600 rounded-lg flex items-center justify-center">
                <ApperIcon name="Zap" size={24} className="text-white" />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="flex-1">
          <SearchBar
            value={searchTerm}
            onChange={handleSearchChange}
            onClear={handleSearchClear}
            placeholder="Search prompts by title, tags, or content..."
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <ApperIcon name="Filter" size={16} className="mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <ApperIcon name="SortDesc" size={16} className="mr-2" />
            Sort
          </Button>
        </div>
      </div>

      {/* Prompts Grid */}
      {filteredPrompts.length === 0 ? (
        <Empty
          title={searchTerm ? "No matching prompts" : "No prompts yet"}
          description={searchTerm ? "Try adjusting your search terms" : "Get started by creating your first structured prompt"}
          actionText="Create Prompt"
          onAction={handleNewPrompt}
        />
      ) : (
        <PromptGrid
          prompts={filteredPrompts}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
        />
      )}
    </div>
  );
};

export default Dashboard;