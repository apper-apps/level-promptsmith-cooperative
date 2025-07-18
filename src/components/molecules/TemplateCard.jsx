import React from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const TemplateCard = ({ template, onUse }) => {
  const handleUse = () => {
    onUse(template);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card hover className="p-6 h-full flex flex-col">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900 flex-1">
              {template.name}
            </h3>
            {template.isPremium && (
              <Badge variant="coral" size="sm">
                <ApperIcon name="Star" size={12} className="mr-1" />
                Premium
              </Badge>
            )}
          </div>

          <div className="mb-4">
            <Badge variant="secondary" size="sm">
              {template.category}
            </Badge>
          </div>

          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {template.description}
          </p>

          <div className="text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-2 mb-1">
              <ApperIcon name="User" size={14} />
              <span className="font-medium">Role:</span>
              <span className="line-clamp-1">{template.toneRole}</span>
            </div>
            <div className="flex items-center gap-2">
              <ApperIcon name="Target" size={14} />
              <span className="font-medium">Goal:</span>
              <span className="line-clamp-1">{template.goal}</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <Button
            variant="primary"
            size="sm"
            onClick={handleUse}
            className="w-full"
          >
            <ApperIcon name="Play" size={16} className="mr-2" />
            Use Template
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default TemplateCard;