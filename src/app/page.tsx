import { verifySession } from "@/lib/dal";

export default async function Home() {
  const session = await verifySession()

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
