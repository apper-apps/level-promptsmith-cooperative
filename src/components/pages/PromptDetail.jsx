import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import CopyButton from "@/components/molecules/CopyButton";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { promptService } from "@/services/api/promptService";

const PromptDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [prompt, setPrompt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("preview");

  useEffect(() => {
    loadPrompt();
  }, [id]);

  const loadPrompt = async () => {
    try {
      setLoading(true);
      setError(null);
      await new Promise(resolve => setTimeout(resolve, 300));
      const data = await promptService.getById(parseInt(id));
      setPrompt(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/builder/${prompt.Id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this prompt?")) {
      try {
        await promptService.delete(prompt.Id);
        toast.success("Prompt deleted successfully");
        navigate("/");
      } catch (err) {
        toast.error("Failed to delete prompt");
      }
    }
  };

  const handleDuplicate = async () => {
    try {
      const duplicatedPrompt = {
        ...prompt,
        title: `${prompt.title} (Copy)`,
        Id: undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const newPrompt = await promptService.create(duplicatedPrompt);
      toast.success("Prompt duplicated successfully");
      navigate(`/prompt/${newPrompt.Id}`);
    } catch (err) {
      toast.error("Failed to duplicate prompt");
    }
  };

  const tabs = [
    { id: "preview", label: "Preview", icon: "Eye" },
    { id: "structure", label: "Structure", icon: "Layout" },
    { id: "export", label: "Export", icon: "Download" },
  ];

  if (loading) {
    return <Loading type="detail" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadPrompt} />;
  }

  if (!prompt) {
    return <Error message="Prompt not found" />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="p-2"
          >
            <ApperIcon name="ArrowLeft" size={20} />
          </Button>
          <div>
            <h1 className="text-3xl font-bold font-display text-gray-900">
              {prompt.title}
            </h1>
            <p className="text-gray-600 mt-1">
              Created {format(new Date(prompt.createdAt), "MMM d, yyyy")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleDuplicate}>
            <ApperIcon name="Copy" size={16} className="mr-2" />
            Duplicate
          </Button>
          <Button variant="outline" onClick={handleEdit}>
            <ApperIcon name="Edit" size={16} className="mr-2" />
            Edit
          </Button>
          <Button variant="ghost" onClick={handleDelete}>
            <ApperIcon name="Trash2" size={16} />
          </Button>
        </div>
      </div>

      {/* Tags */}
      {prompt.tags && prompt.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {prompt.tags.map((tag, index) => (
            <Badge key={index} variant="primary">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 rounded-t-lg font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-primary-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <ApperIcon name={tab.icon} size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "preview" && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Assembled Prompt
              </h2>
              <CopyButton text={prompt.assembledPrompt} />
            </div>
            <div className="bg-gray-50 rounded-lg p-4 preview-content">
              <div className="text-sm text-gray-600 mb-2">
                {prompt.assembledPrompt.length} characters
              </div>
              <div className="text-gray-800 leading-relaxed">
                {prompt.assembledPrompt}
              </div>
            </div>
          </Card>
        )}

        {activeTab === "structure" && (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Tone / Role
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                {prompt.toneRole || "Not specified"}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Goal / Objective
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                {prompt.goal || "Not specified"}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Background / Context
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                {prompt.context || "Not specified"}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Instructions / Action
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                {prompt.instruction || "Not specified"}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Output Format
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                {prompt.format || "Not specified"}
              </div>
            </Card>

            {prompt.examples && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Examples
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  {prompt.examples}
                </div>
              </Card>
            )}
          </div>
        )}

        {activeTab === "export" && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Export Options
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Plain Text</h3>
                  <p className="text-sm text-gray-600">
                    Copy the assembled prompt as plain text
                  </p>
                </div>
                <CopyButton text={prompt.assembledPrompt} />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">JSON Format</h3>
                  <p className="text-sm text-gray-600">
                    Export structured data as JSON
                  </p>
                </div>
                <CopyButton text={JSON.stringify(prompt, null, 2)} />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Markdown</h3>
                  <p className="text-sm text-gray-600">
                    Export as formatted markdown
                  </p>
                </div>
                <CopyButton 
                  text={`# ${prompt.title}\n\n${prompt.assembledPrompt}\n\n---\n\n**Tags:** ${prompt.tags?.join(", ") || "None"}`}
                />
              </div>
            </div>
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default PromptDetail;