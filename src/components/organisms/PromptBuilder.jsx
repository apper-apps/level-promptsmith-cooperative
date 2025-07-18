import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StepIndicator from "@/components/molecules/StepIndicator";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import TagInput from "@/components/molecules/TagInput";
import CopyButton from "@/components/molecules/CopyButton";
import ApperIcon from "@/components/ApperIcon";

const PromptBuilder = ({ initialPrompt, onSave, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    tags: [],
    toneRole: "",
    goal: "",
    context: "",
    instruction: "",
    format: "",
    examples: "",
  });
  const [assembledPrompt, setAssembledPrompt] = useState("");

  const steps = [
    { id: 1, title: "Title & Tags", field: "title" },
    { id: 2, title: "Tone / Role", field: "toneRole" },
    { id: 3, title: "Goal", field: "goal" },
    { id: 4, title: "Context", field: "context" },
    { id: 5, title: "Instructions", field: "instruction" },
    { id: 6, title: "Format", field: "format" },
  ];

  useEffect(() => {
    if (initialPrompt) {
      setFormData({
        title: initialPrompt.title || "",
        tags: initialPrompt.tags || [],
        toneRole: initialPrompt.toneRole || "",
        goal: initialPrompt.goal || "",
        context: initialPrompt.context || "",
        instruction: initialPrompt.instruction || "",
        format: initialPrompt.format || "",
        examples: initialPrompt.examples || "",
      });
      setAssembledPrompt(initialPrompt.assembledPrompt || "");
    }
  }, [initialPrompt]);

  const completedSteps = steps.filter(step => {
    if (step.field === "title") return formData.title.trim();
    return formData[step.field]?.trim();
  }).map(step => step.id);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const assemblePrompt = () => {
    let prompt = "";
    
    if (formData.toneRole) {
      prompt += `${formData.toneRole}. `;
    }
    
    if (formData.goal) {
      prompt += `${formData.goal}. `;
    }
    
    if (formData.context) {
      prompt += `Context: ${formData.context}. `;
    }
    
    if (formData.instruction) {
      prompt += `${formData.instruction}. `;
    }
    
    if (formData.format) {
      prompt += `Format your response as: ${formData.format}. `;
    }
    
    if (formData.examples) {
      prompt += `Examples: ${formData.examples}`;
    }

    setAssembledPrompt(prompt.trim());
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    const promptData = {
      ...formData,
      assembledPrompt,
      version: 1,
      updatedAt: new Date().toISOString(),
    };
    onSave(promptData);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <Input
              label="Prompt Title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="e.g., Blog Post Outline Generator"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <TagInput
                tags={formData.tags}
                onChange={(tags) => handleInputChange("tags", tags)}
                placeholder="Add tags to organize your prompts..."
              />
            </div>
          </div>
        );
      case 2:
        return (
          <Textarea
            label="Tone / Role"
            value={formData.toneRole}
            onChange={(e) => handleInputChange("toneRole", e.target.value)}
            placeholder="e.g., Act as a professional content strategist with 10 years of experience..."
            rows={4}
          />
        );
      case 3:
        return (
          <Textarea
            label="Goal / Objective"
            value={formData.goal}
            onChange={(e) => handleInputChange("goal", e.target.value)}
            placeholder="e.g., Help create a comprehensive blog post outline that drives organic traffic..."
            rows={4}
          />
        );
      case 4:
        return (
          <Textarea
            label="Background / Context"
            value={formData.context}
            onChange={(e) => handleInputChange("context", e.target.value)}
            placeholder="e.g., The target audience is small business owners who want to improve their online presence..."
            rows={4}
          />
        );
      case 5:
        return (
          <Textarea
            label="Instructions / Action"
            value={formData.instruction}
            onChange={(e) => handleInputChange("instruction", e.target.value)}
            placeholder="e.g., Create a detailed outline with 5-7 main sections, including introduction, key points, and conclusion..."
            rows={4}
          />
        );
      case 6:
        return (
          <div className="space-y-6">
            <Textarea
              label="Output Format"
              value={formData.format}
              onChange={(e) => handleInputChange("format", e.target.value)}
              placeholder="e.g., Numbered list with bullet points for sub-topics, include estimated word counts..."
              rows={3}
            />
            <Textarea
              label="Examples (Optional)"
              value={formData.examples}
              onChange={(e) => handleInputChange("examples", e.target.value)}
              placeholder="e.g., 1. Introduction (300 words) - Hook, problem statement, solution preview..."
              rows={4}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold font-display text-gray-900">
              Prompt Builder
            </h1>
            <p className="text-gray-600 mt-1">
              Create structured prompts that get better results
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              disabled={!formData.title.trim()}
            >
              <ApperIcon name="Save" size={16} className="mr-2" />
              Save Prompt
            </Button>
          </div>
        </div>

        <StepIndicator
          steps={steps}
          currentStep={currentStep}
          completedSteps={completedSteps}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Step {currentStep}: {steps[currentStep - 1].title}
            </h2>
            <div className="text-sm text-gray-500">
              {currentStep} of {steps.length}
            </div>
          </div>

          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            {renderStepContent()}
          </motion.div>

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ApperIcon name="ChevronLeft" size={16} className="mr-2" />
              Previous
            </Button>
            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                onClick={assemblePrompt}
                disabled={!formData.toneRole && !formData.goal && !formData.instruction}
              >
                <ApperIcon name="Zap" size={16} className="mr-2" />
                Generate Preview
              </Button>
              <Button
                variant="primary"
                onClick={handleNext}
                disabled={currentStep === steps.length}
              >
                Next
                <ApperIcon name="ChevronRight" size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Preview Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Live Preview
            </h2>
            {assembledPrompt && (
              <CopyButton text={assembledPrompt} size="sm" />
            )}
          </div>

          <div className="bg-gray-50 rounded-lg p-4 min-h-[400px]">
            {assembledPrompt ? (
              <div className="preview-content">
                <div className="text-sm text-gray-600 mb-4">
                  Generated Prompt ({assembledPrompt.length} characters):
                </div>
                <div className="text-gray-800 leading-relaxed">
                  {assembledPrompt}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ApperIcon name="FileText" size={48} className="mb-4 text-gray-400" />
                <p className="text-center">
                  Fill in the form fields and click "Generate Preview" to see your assembled prompt
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PromptBuilder;