type PublicLayoutProps = {
  children: React.ReactNode;
};

const PublicLayout = async ({ children }: PublicLayoutProps) => {
  return <main>{children}</main>;
};

export default PublicLayout;
