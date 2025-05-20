import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralSettingsTab from "./general-tab";
import EmailSettingsTab from "./email-tab";

export default function SettingsPage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">Settings</h1>
      <Tabs
        defaultValue="general"
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <GeneralSettingsTab />
        </TabsContent>
        <TabsContent value="email">
          <EmailSettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
