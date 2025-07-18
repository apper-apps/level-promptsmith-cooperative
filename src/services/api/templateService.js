import templatesData from "@/services/mockData/templates.json";

let templates = [...templatesData];

export const templateService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return templates.sort((a, b) => a.name.localeCompare(b.name));
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const template = templates.find(t => t.Id === id);
    if (!template) {
      throw new Error("Template not found");
    }
    return { ...template };
  },

  async getByCategory(category) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return templates.filter(t => t.category.toLowerCase() === category.toLowerCase());
  },
};