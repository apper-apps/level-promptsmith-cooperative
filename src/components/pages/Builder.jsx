import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PromptBuilder from "@/components/organisms/PromptBuilder";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { promptService } from "@/services/api/promptService";

const Builder = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [prompt, setPrompt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      loadPrompt();
    }
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

  const handleSave = async (promptData) => {
    try {
      if (id) {
        const updatedPrompt = await promptService.update(parseInt(id), promptData);
        toast.success("Prompt updated successfully");
        navigate(`/prompt/${updatedPrompt.Id}`);
      } else {
        const newPrompt = await promptService.create({
          ...promptData,
          createdAt: new Date().toISOString(),
        });
        toast.success("Prompt created successfully");
        navigate(`/prompt/${newPrompt.Id}`);
      }
    } catch (err) {
      toast.error("Failed to save prompt");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  if (loading) {
    return <Loading type="detail" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadPrompt} />;
  }

  return (
    <PromptBuilder
      initialPrompt={prompt}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};

export default Builder;