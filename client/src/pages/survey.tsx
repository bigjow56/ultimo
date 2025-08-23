import { SurveyForm } from "../components/survey-form"

export function Survey() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto">
        <SurveyForm />
      </div>
    </div>
  );
}
