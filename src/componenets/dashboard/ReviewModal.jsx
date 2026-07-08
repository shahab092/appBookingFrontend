import React, { useEffect, useMemo, useState } from "react";
import { Star } from "lucide-react";
import CustomModal from "../common/CustomModal";

const RATING_FIELDS = [
  { key: "overall", label: "Overall experience" },
  { key: "waitTime", label: "Wait time" },
  { key: "bedsideManner", label: "Doctor behavior" },
  { key: "clinicEnvironment", label: "Clinic environment" },
];

const DEFAULT_RATINGS = {
  overall: 0,
  waitTime: 0,
  bedsideManner: 0,
  clinicEnvironment: 0,
};

const RatingInput = ({ label, value, onChange }) => (
  <div className="flex items-center justify-between gap-4">
    <span className="text-sm font-semibold text-gray-700">{label}</span>
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          onClick={() => onChange(rating)}
          className="rounded-full p-1 transition hover:bg-yellow-50"
          aria-label={`${label}: ${rating} star${rating > 1 ? "s" : ""}`}
        >
          <Star
            size={22}
            className={
              rating <= value
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }
          />
        </button>
      ))}
    </div>
  </div>
);

export default function ReviewModal({
  visible,
  loading = false,
  doctorName,
  onCancel,
  onSubmit,
}) {
  const [ratings, setRatings] = useState(DEFAULT_RATINGS);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (visible) {
      setRatings(DEFAULT_RATINGS);
      setComment("");
      setError("");
    }
  }, [visible]);

  const isValid = useMemo(
    () => RATING_FIELDS.every((field) => ratings[field.key] >= 1),
    [ratings],
  );

  const handleSubmit = () => {
    if (!isValid) {
      setError("Please select all rating fields before submitting.");
      return;
    }

    onSubmit({
      ratings,
      comment: comment.trim(),
    });
  };

  return (
    <CustomModal
      visible={visible}
      onCancel={onCancel}
      title="Write a Review"
      subtitle={doctorName ? `Share your experience with ${doctorName}` : "Share your appointment experience"}
      showSubmit={false}
      width={520}
    >
      <div className="space-y-5 p-1">
        <div className="space-y-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
          {RATING_FIELDS.map((field) => (
            <RatingInput
              key={field.key}
              label={field.label}
              value={ratings[field.key]}
              onChange={(value) => {
                setRatings((prev) => ({ ...prev, [field.key]: value }));
                setError("");
              }}
            />
          ))}
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Comment
          </label>
          <textarea
            value={comment}
            onChange={(event) => setComment(event.target.value.slice(0, 500))}
            rows={4}
            placeholder="Write a short review..."
            className="w-full resize-none rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <div className="mt-1 text-right text-xs text-gray-400">
            {comment.length}/500
          </div>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-bold text-gray-600 transition hover:bg-gray-50 disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="btn-primary px-5 py-2.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>
    </CustomModal>
  );
}
