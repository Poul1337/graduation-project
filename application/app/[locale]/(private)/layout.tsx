import { SideBar } from '@/Components';

type PrivateLayoutProps = {
  children: React.ReactNode;
};

const PrivateLayout = async ({ children }: PrivateLayoutProps) => {
  return (
    <main className="flex">
      <SideBar />
      {children}
    </main>
  );
};

export default PrivateLayout;
