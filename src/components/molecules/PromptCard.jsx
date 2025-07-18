import React from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import CopyButton from "@/components/molecules/CopyButton";

const PromptCard = ({ prompt, onEdit, onDelete, onDuplicate }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/prompt/${prompt.Id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(prompt);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(prompt);
  };

  const handleDuplicate = (e) => {
    e.stopPropagation();
    onDuplicate(prompt);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        hover 
        className="p-6 h-full flex flex-col"
        onClick={handleCardClick}
      >
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">
              {prompt.title}
            </h3>
            <div className="flex items-center gap-2 ml-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEdit}
                className="p-2 hover:bg-primary-50"
              >
                <ApperIcon name="Edit" size={16} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="p-2 hover:bg-coral-50 hover:text-coral-600"
              >
                <ApperIcon name="Trash2" size={16} />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
            {prompt.tags?.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="primary" size="sm">
                {tag}
              </Badge>
            ))}
            {prompt.tags?.length > 3 && (
              <Badge variant="default" size="sm">
                +{prompt.tags.length - 3} more
              </Badge>
            )}
          </div>

          <div className="text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-2 mb-1">
              <ApperIcon name="User" size={14} />
              <span className="font-medium">Role:</span>
              <span className="line-clamp-1">{prompt.toneRole || "Not specified"}</span>
            </div>
            <div className="flex items-center gap-2">
              <ApperIcon name="Target" size={14} />
              <span className="font-medium">Goal:</span>
              <span className="line-clamp-1">{prompt.goal || "Not specified"}</span>
            </div>
          </div>

          <div className="text-xs text-gray-500 mb-4">
            Last modified: {format(new Date(prompt.updatedAt), "MMM d, yyyy")}
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 pt-4 border-t border-gray-100">
          <CopyButton
            text={prompt.assembledPrompt}
            variant="outline"
            size="sm"
            className="flex-1"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDuplicate}
            className="px-3"
          >
            <ApperIcon name="Copy" size={16} />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default PromptCard;