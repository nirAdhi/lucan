import { TestimonialForm } from "../TestimonialForm";
import { createTestimonial } from "../actions";

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink-900">Add testimonial</h1>
      <div className="mt-6 max-w-2xl rounded-[var(--radius-card)] border border-ink-200 bg-white p-6">
        <TestimonialForm action={createTestimonial} />
      </div>
    </div>
  );
}
