import React, { useState, useRef, useEffect } from "react";
import { noteCategories } from "../../data/statuses";
import { ChevronDown, Check } from "lucide-react";

const specialtiesList = [
  "Biology",
  "Physics",
  "Chemistry",
  "Medicine",
  "Law",
  "Politics",
  "Economics",
  "History",
  "Computer Science",
  "Journalism",
  "Fact Checking",
  "Other",
];

function AddNoteForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    content: "",
    sources: "",
    specialty: "",
    category: "misinformation",
  });
  const [isSpecialtyOpen, setIsSpecialtyOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSpecialtyOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSpecialty = (specialty) => {
    const currentSpecialties = formData.specialty
      ? formData.specialty.split(", ").filter((s) => s)
      : [];
    let newSpecialties;

    if (currentSpecialties.includes(specialty)) {
      newSpecialties = currentSpecialties.filter((s) => s !== specialty);
    } else {
      newSpecialties = [...currentSpecialties, specialty];
    }

    setFormData({ ...formData, specialty: newSpecialties.join(", ") });
  };

  const handleSubmit = () => {
    if (!formData.content.trim()) return;
    onSubmit(formData);
  };

  return (
    <div className="mb-4 p-4 bg-gray-50 dark:glass-panel border border-gray-200 dark:border-indigo-500/20 rounded-lg transition-colors duration-300">
      <h4 className="font-semibold text-sm mb-3 text-gray-800 dark:text-indigo-100">
        Add Community Note
      </h4>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-indigo-200/80 mb-1">
            Note Category *
          </label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full px-3 py-2 text-sm bg-white dark:bg-[#1e293b]/50 border border-gray-300 dark:border-indigo-500/30 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-500/50 focus:border-blue-500 dark:focus:border-indigo-500 dark:text-indigo-100"
          >
            {Object.entries(noteCategories).map(([key, cat]) => (
              <option key={key} value={key}>
                {cat.icon} {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-indigo-200/80 mb-1">
            Note Content *
          </label>
          <textarea
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            placeholder="Explain why this note is helpful..."
            className="w-full px-3 py-2 text-sm bg-white dark:bg-[#1e293b]/50 border border-gray-300 dark:border-indigo-500/30 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-500/50 focus:border-blue-500 dark:focus:border-indigo-500 dark:text-indigo-100 placeholder-gray-400 dark:placeholder-indigo-400/50"
            rows="3"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-indigo-200/80 mb-1">
            Sources (comma-separated)
          </label>
          <input
            type="text"
            value={formData.sources}
            onChange={(e) =>
              setFormData({ ...formData, sources: e.target.value })
            }
            placeholder="Source 1, Source 2, Source 3"
            className="w-full px-3 py-2 text-sm bg-white dark:bg-[#1e293b]/50 border border-gray-300 dark:border-indigo-500/30 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-500/50 focus:border-blue-500 dark:focus:border-indigo-500 dark:text-indigo-100 placeholder-gray-400 dark:placeholder-indigo-400/50"
          />
        </div>

        <div ref={dropdownRef} className="relative">
          <label className="block text-xs font-medium text-gray-700 dark:text-indigo-200/80 mb-1">
            Relevant Fields (optional)
          </label>
          <button
            onClick={() => setIsSpecialtyOpen(!isSpecialtyOpen)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-[#1e293b]/50 border border-gray-300 dark:border-indigo-500/30 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-500/50 focus:border-blue-500 dark:focus:border-indigo-500 dark:text-indigo-100 text-left flex items-center justify-between"
          >
            <span
              className={
                formData.specialty
                  ? "text-gray-900 dark:text-indigo-100"
                  : "text-gray-400 dark:text-indigo-400/50"
              }
            >
              {formData.specialty || "Select relevant fields..."}
            </span>
            <ChevronDown
              size={16}
              className="text-gray-500 dark:text-indigo-400"
            />
          </button>

          {isSpecialtyOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white dark:glass-panel border border-gray-200 dark:border-indigo-500/20 rounded-lg shadow-lg max-h-48 overflow-y-auto">
              {specialtiesList.map((specialty) => {
                const isSelected = formData.specialty
                  .split(", ")
                  .includes(specialty);
                return (
                  <div
                    key={specialty}
                    onClick={() => toggleSpecialty(specialty)}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-indigo-500/20 cursor-pointer text-sm text-gray-700 dark:text-indigo-100"
                  >
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center ${
                        isSelected
                          ? "bg-blue-600 border-blue-600 dark:bg-indigo-600 dark:border-indigo-600"
                          : "border-gray-300 dark:border-indigo-500/30"
                      }`}
                    >
                      {isSelected && <Check size={12} className="text-white" />}
                    </div>
                    {specialty}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={handleSubmit}
            disabled={!formData.content.trim()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 dark:shadow-[0_0_15px_rgba(99,102,241,0.4)] disabled:bg-gray-400 dark:disabled:bg-indigo-900/50 dark:disabled:text-indigo-400/30 dark:disabled:shadow-none text-white rounded-lg text-sm font-medium transition-all"
          >
            Submit Note
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 dark:bg-indigo-500/10 hover:bg-gray-300 dark:hover:bg-indigo-500/20 text-gray-700 dark:text-indigo-200 border border-transparent dark:border-indigo-500/30 rounded-lg text-sm font-medium transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddNoteForm;
