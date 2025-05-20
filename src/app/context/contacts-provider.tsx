import { createContext, PropsWithChildren, useEffect, useState } from "react";

export type Contact = {
  id: string;
  displayName: string;
  contactAvatar: string;
  statusMessage: string;
};

export type Contacts = {
  contacts: Contact[];
  dictionary: [string, Contact[]][];
  isLoading: boolean;
  filteredContacts: Contact[];
  search: string;
};

export type ContactsContextType = Contacts & {
  filterContacts: (search: string) => void;
  getContact: (id: string) => Contact | undefined;
};

export const ContactsContext = createContext<ContactsContextType | undefined>(
  undefined
);

export default function ContactsProvider({ children }: PropsWithChildren) {
  const [contacts, setContacts] = useState<Contacts>({
    contacts: [],
    dictionary: [["", []]],
    isLoading: false,
    filteredContacts: [],
    search: "",
  });

  const generateDictionary = (
    data: Contacts["contacts"]
  ): [string, Contact[]][] => {
    const map: Map<string, Contact[]> = new Map();
    data
      .sort((a: Contact, b: Contact) =>
        a.displayName.localeCompare(b.displayName)
      )
      .forEach((contact: Contact) => {
        const firstLetter = contact.displayName.charAt(0);
        if (map.has(firstLetter)) {
          const existing = map.get(firstLetter);
          existing?.push(contact);
          if (existing) {
            map.set(firstLetter, existing);
          }
        } else {
          map.set(firstLetter, [contact]);
        }
      });
    return Array.from(map);
  };

  useEffect(() => {
    const fetchContacts = async () => {
      setContacts((prev) => ({ ...prev, isLoading: true }));
      const response = await fetch("/api/mock/contacts");
      const data = await response.json();
      const dictionary = generateDictionary(data);
      setContacts((prev) => ({
        ...prev,
        contacts: data,
        filteredContacts: data,
        dictionary,
        isLoading: false,
      }));
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    setContacts((prev) => {
      const contacts = prev.contacts;
      const search = prev.search;
      const filteredContacts = contacts.filter((contact: Contact) =>
        contact.displayName.includes(search)
      );
      const dictionary = generateDictionary(filteredContacts);

      return {
        ...prev,
        filteredContacts,
        dictionary,
      };
    });
  }, [contacts.search]);

  const filterContacts = (search: string) => {
    setContacts((prev) => ({
      ...prev,
      search,
    }));
  };

  const getContact = (id: string) => {
    let ctcts = contacts.contacts;
    if (contacts.filteredContacts.length > 0) {
      ctcts = contacts.filteredContacts;
    }
    const contact = ctcts.find((contact: Contact) => contact.id === id);
    return contact;
  };

  return (
    <ContactsContext.Provider
      value={{ ...contacts, filterContacts, getContact }}
    >
      {children}
    </ContactsContext.Provider>
  );
}
