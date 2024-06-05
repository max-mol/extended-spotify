export default function CollectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>Share informations</div>
      {children}
    </div>
  );
}
