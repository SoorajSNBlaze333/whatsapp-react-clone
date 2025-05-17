"use client";

import TabActivePanel from "./components/tab-active-panel";
import TabIcons from "./components/tab-icons";
import TabPanel from "./components/tab-panel";
import ContactsProvider from "./context/contacts-provider";
import NewChatProvider from "./context/new-chat-provider";
import TabProvider from "./context/tab-provider";

export default function Home() {
  return (
    <TabProvider>
      <ContactsProvider>
        <NewChatProvider>
          <section className="h-full w-full grid grid-cols-24">
            <TabIcons />
            <TabPanel />
            <TabActivePanel />
          </section>
        </NewChatProvider>
      </ContactsProvider>
    </TabProvider>
  );
}
