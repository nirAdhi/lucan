import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TestimonialForm } from "../TestimonialForm";
import { updateTestimonial } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });
  if (!testimonial) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink-900">Edit testimonial</h1>
      <div className="mt-6 max-w-2xl rounded-[var(--radius-card)] border border-ink-200 bg-white p-6">
        <TestimonialForm
          testimonial={testimonial}
          action={updateTestimonial.bind(null, testimonial.id)}
        />
      </div>
    </div>
  );
}
