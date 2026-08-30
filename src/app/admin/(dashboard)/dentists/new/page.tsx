import { treatments } from "@/content/treatments";
import { DentistForm } from "../DentistForm";
import { createDentist } from "../actions";

export default function NewDentistPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink-900">Add dentist</h1>
      <div className="mt-6 max-w-2xl rounded-[var(--radius-card)] border border-ink-200 bg-white p-6">
        <DentistForm allTreatments={treatments} action={createDentist} />
      </div>
    </div>
  );
}
