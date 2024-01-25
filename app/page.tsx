import { UserButton } from "@clerk/nextjs";
export default function Home() {
  return (
    <main>
      <p>Hello World</p>
      <UserButton afterSignOutUrl="/" />
    </main>
  );
}
