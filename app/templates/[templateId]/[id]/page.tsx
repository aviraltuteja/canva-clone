import TemplateWrapper from "@/app/components/design/template-wrapper";

interface DesignPageProps {
  params: {
    id: string;
    templateId: string;
  };
}

export default async function DashboardLayout({
  params,
}: {
  params: Promise<DesignPageProps["params"]>;
}): Promise<React.ReactElement> {
  const { id, templateId } = await params;

  return (
    <div className="min-w-screen min-h-screen">
      <TemplateWrapper id={id} templateId={templateId} />
    </div>
  );
}
