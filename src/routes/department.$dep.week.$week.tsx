import { createFileRoute, notFound } from "@tanstack/react-router";
import { Tier3SkillSuitesHub } from "@/components/Tier3SkillSuitesHub";
import { getDepartment } from "@/lib/departments";

export const Route = createFileRoute("/department/$dep/week/$week")({
  head: ({ params }) => ({
    meta: [{ title: `Week ${params.week} — Skill Suites` }],
  }),
  component: WeekPage,
});

function WeekPage() {
  const { dep, week } = Route.useParams();
  const department = getDepartment(dep);

  if (!department) throw notFound();

  return <Tier3SkillSuitesHub department={department} week={week} />;
}
