import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Builder from "@/components/pages/Builder";
import StepIndicator from "@/components/molecules/StepIndicator";
import TagInput from "@/components/molecules/TagInput";
import CopyButton from "@/components/molecules/CopyButton";
import Card from "@/components/atoms/Card";
import Textarea from "@/components/atoms/Textarea";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

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
  const [variables, setVariables] = useState({});
  const [activeTab, setActiveTab] = useState("preview");
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

  const detectVariables = (text) => {
    const regex = /\{\{([^}]+)\}\}/g;
    const matches = [...text.matchAll(regex)];
    return matches.map(match => match[1].trim());
  };

  const getAllVariables = () => {
    const allText = Object.values(formData).filter(value => 
      typeof value === 'string'
    ).join(' ');
    const detectedVars = detectVariables(allText);
    return [...new Set(detectedVars)];
  };

  const insertPlaceholder = (field, placeholder) => {
    const textarea = document.querySelector(`[data-field="${field}"]`);
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const currentValue = formData[field];
      const newValue = currentValue.slice(0, start) + `{{${placeholder}}}` + currentValue.slice(end);
      handleInputChange(field, newValue);
      
      // Focus and set cursor position after the inserted placeholder
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + placeholder.length + 4, start + placeholder.length + 4);
      }, 0);
    }
  };

  const processVariables = (text) => {
    let processed = text;
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
      processed = processed.replace(regex, value || `{{${key}}}`);
    });
    return processed;
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

    const rawPrompt = prompt.trim();
    const processedPrompt = processVariables(rawPrompt);
    
    setAssembledPrompt(rawPrompt);
    return { raw: rawPrompt, processed: processedPrompt };
  };

  const handleVariableChange = (varName, value) => {
    setVariables(prev => ({
      ...prev,
      [varName]: value
    }));
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
          <div className="space-y-4">
            <Textarea
              label="Tone / Role"
              value={formData.toneRole}
              onChange={(e) => handleInputChange("toneRole", e.target.value)}
              placeholder="e.g., Act as a professional {{expertise}} with {{experience}} years of experience..."
              rows={4}
              data-field="toneRole"
            />
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
onClick={() => insertPlaceholder("toneRole", "expertise")}
              >
                + {{"expertise"}}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => insertPlaceholder("toneRole", "experience")}
              >
                + {{"experience"}}
              </Button>
            </div>
          </div>
        );
case 3:
        return (
          <div className="space-y-4">
            <Textarea
              label="Goal / Objective"
              value={formData.goal}
              onChange={(e) => handleInputChange("goal", e.target.value)}
              placeholder="e.g., Help create a comprehensive {{content_type}} that drives {{target_outcome}}..."
              rows={4}
              data-field="goal"
            />
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
onClick={() => insertPlaceholder("goal", "content_type")}
              >
                + {{"content_type"}}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => insertPlaceholder("goal", "target_outcome")}
              >
                + {{"target_outcome"}}
              </Button>
            </div>
          </div>
        );
case 4:
        return (
          <div className="space-y-4">
            <Textarea
              label="Background / Context"
              value={formData.context}
              onChange={(e) => handleInputChange("context", e.target.value)}
              placeholder="e.g., The target audience is {{audience}} who want to {{primary_goal}}..."
              rows={4}
              data-field="context"
            />
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
onClick={() => insertPlaceholder("context", "audience")}
              >
                + {{"audience"}}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => insertPlaceholder("context", "primary_goal")}
              >
                + {{"primary_goal"}}
              </Button>
            </div>
          </div>
        );
case 5:
        return (
          <div className="space-y-4">
            <Textarea
              label="Instructions / Action"
              value={formData.instruction}
              onChange={(e) => handleInputChange("instruction", e.target.value)}
              placeholder="e.g., Create a detailed outline with {{section_count}} main sections, including {{required_elements}}..."
              rows={4}
              data-field="instruction"
            />
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
onClick={() => insertPlaceholder("instruction", "section_count")}
              >
                + {{"section_count"}}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => insertPlaceholder("instruction", "required_elements")}
              >
                + {{"required_elements"}}
              </Button>
            </div>
          </div>
        );
case 6:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Textarea
                label="Output Format"
                value={formData.format}
                onChange={(e) => handleInputChange("format", e.target.value)}
                placeholder="e.g., {{format_type}} with {{structure_details}}, include {{additional_requirements}}..."
                rows={3}
                data-field="format"
              />
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
onClick={() => insertPlaceholder("format", "format_type")}
                >
                  + {{"format_type"}}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertPlaceholder("format", "structure_details")}
                >
                  + {{"structure_details"}}
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <Textarea
                label="Examples (Optional)"
                value={formData.examples}
                onChange={(e) => handleInputChange("examples", e.target.value)}
                placeholder="e.g., {{example_number}}. {{section_name}} ({{word_count}} words) - {{description}}..."
                rows={4}
                data-field="examples"
              />
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
onClick={() => insertPlaceholder("examples", "example_number")}
                >
                  + {{"example_number"}}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertPlaceholder("examples", "word_count")}
                >
                  + {{"word_count"}}
                </Button>
              </div>
            </div>
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
            <div className="flex items-center gap-2">
              {assembledPrompt && (
                <CopyButton text={processVariables(assembledPrompt)} size="sm" />
              )}
            </div>
          </div>

          <div className="flex border-b border-gray-200 mb-4">
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                activeTab === "preview"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab("variables")}
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                activeTab === "variables"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Variables ({getAllVariables().length})
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 min-h-[400px]">
            {activeTab === "preview" ? (
              assembledPrompt ? (
                <div className="preview-content">
                  <div className="text-sm text-gray-600 mb-4">
                    Generated Prompt ({assembledPrompt.length} characters):
                  </div>
                  <div className="text-gray-800 leading-relaxed">
                    {assembledPrompt.split(/(\{\{[^}]+\}\})/g).map((part, index) => (
                      <span
                        key={index}
                        className={part.match(/\{\{[^}]+\}\}/) ? "variable-highlight" : ""}
                      >
                        {part.match(/\{\{[^}]+\}\}/) ? part : part}
                      </span>
                    ))}
                  </div>
                  {Object.keys(variables).length > 0 && (
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-600 mb-2">With Variables Replaced:</div>
                      <div className="text-gray-800 leading-relaxed bg-white p-3 rounded">
                        {processVariables(assembledPrompt)}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <ApperIcon name="FileText" size={48} className="mb-4 text-gray-400" />
                  <p className="text-center">
                    Fill in the form fields and click "Generate Preview" to see your assembled prompt
                  </p>
                </div>
              )
            ) : (
              <div className="space-y-4">
                <div className="text-sm text-gray-600 mb-4">
                  Manage placeholder variables in your prompt:
                </div>
                {getAllVariables().length > 0 ? (
                  <div className="space-y-3">
                    {getAllVariables().map((variable) => (
                      <div key={variable} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                        <div className="flex-shrink-0">
                          <span className="text-sm font-medium text-gray-700">
                            {`{{${variable}}}`}
                          </span>
                        </div>
                        <div className="flex-1">
                          <Input
                            placeholder={`Enter value for ${variable}`}
                            value={variables[variable] || ""}
                            onChange={(e) => handleVariableChange(variable, e.target.value)}
                            size="sm"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
<ApperIcon name="Variable" size={48} className="mb-4 text-gray-400" />
                    <p className="text-center">
                      No variables detected. Add {{"variable_name"}} placeholders to your prompt fields.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PromptBuilder;