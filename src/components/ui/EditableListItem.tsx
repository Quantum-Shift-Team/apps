"use client";

import { useState } from "react";

interface EditableListItemProps {
  label: string;
  value: string;
  onSave: (newValue: string) => Promise<void>;
  inputType?: "text" | "number" | "email";
  placeholder?: string;
}

export function EditableListItem({
  label,
  value,
  onSave,
  inputType = "text",
  placeholder,
}: EditableListItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    setIsEditing(true);
    setInputValue(value);
    setError(null);
  };

  const handleSave = async () => {
    if (inputValue.trim() === "") {
      setError("값을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onSave(inputValue);
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "저장에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setInputValue(value);
    setIsEditing(false);
    setError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="px-6 py-4">
        <div className="space-y-3">
          <input
            type={inputType}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            disabled={isSubmitting}
            autoFocus
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "저장 중..." : "저장"}
            </button>
            <button
              onClick={handleCancel}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-between px-6 py-4 hover:bg-gray-800 cursor-pointer transition-colors"
      onClick={handleClick}
    >
      <span className="text-gray-400">{label}</span>
      <div className="flex items-center space-x-2">
        <span className="text-white">{value || placeholder}</span>
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
}
