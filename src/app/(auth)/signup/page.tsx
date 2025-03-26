import { GalleryVerticalEnd } from "lucide-react";

import { SignupForm } from "@/components/signup-form";
import { trpc } from "../../../../trpc/server";

export default async function SignupPage() {
  const greeting = await trpc.hello({ text: "World" });

  const user = await trpc.user.getUser({ id: "user_123" });
  const mutatedUser = await trpc.user.updateUser({
    id: "user_123",
    name: "Jane Doe",
  });
  const users = await trpc.user.getAll();
  console.log(users);
  console.log(user);
  console.log(mutatedUser);
  console.log(greeting);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a
            href="#"
            className="flex items-center gap-2 font-medium"
          >
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            CRM
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/background.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
