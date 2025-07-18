import React from "react";
import { motion } from "framer-motion";
import PromptCard from "@/components/molecules/PromptCard";

const PromptGrid = ({ prompts, onEdit, onDelete, onDuplicate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {prompts.map((prompt, index) => (
        <motion.div
          key={prompt.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <PromptCard
            prompt={prompt}
            onEdit={onEdit}
            onDelete={onDelete}
            onDuplicate={onDuplicate}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default PromptGrid;