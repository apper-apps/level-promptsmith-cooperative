import React from "react";
import { motion } from "framer-motion";
import TemplateCard from "@/components/molecules/TemplateCard";

const TemplateGrid = ({ templates, onUse }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template, index) => (
        <motion.div
          key={template.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <TemplateCard
            template={template}
            onUse={onUse}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default TemplateGrid;