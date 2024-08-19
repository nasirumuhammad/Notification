import RegistrationForm from "@/components/RegistrationForm";
import Card from "@/components/Card";
import { createFaculty } from "@/lib/helpers/faculty";

export default async function Home() {
  return (
    <Card>
      <RegistrationForm />
    </Card>
  );
}
