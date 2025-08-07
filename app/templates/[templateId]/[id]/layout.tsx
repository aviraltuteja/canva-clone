export default function TemplateLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return <div>{children}</div>;
}
