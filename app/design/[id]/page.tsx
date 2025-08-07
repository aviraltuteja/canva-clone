import DesignWrapper from "@/app/components/design/design-wrapper";

interface DesignPageProps {
  params: {
    id: string;
  };
}

export default async function DashboardLayout({
  params,
}: {
  params: Promise<DesignPageProps["params"]>;
}): Promise<React.ReactElement> {
  const { id } = await params;

  return (
    <div className="min-w-screen min-h-screen">
      <DesignWrapper id={id} />
    </div>
  );
}
