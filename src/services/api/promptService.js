import promptsData from "@/services/mockData/prompts.json";

let prompts = [...promptsData];

export const promptService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return prompts.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const prompt = prompts.find(p => p.Id === id);
    if (!prompt) {
      throw new Error("Prompt not found");
    }
    return { ...prompt };
  },

  async create(promptData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newId = Math.max(...prompts.map(p => p.Id), 0) + 1;
    const newPrompt = {
      ...promptData,
      Id: newId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    prompts.unshift(newPrompt);
    return { ...newPrompt };
  },

  async update(id, promptData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = prompts.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Prompt not found");
    }
    const updatedPrompt = {
      ...prompts[index],
      ...promptData,
      Id: id,
      updatedAt: new Date().toISOString(),
    };
    prompts[index] = updatedPrompt;
    return { ...updatedPrompt };
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = prompts.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Prompt not found");
    }
    prompts.splice(index, 1);
    return true;
  },
};