export interface IPhoneNumberContacts {
  id?: string;
  label: string;
  number: string;
}

export interface IEmailAddressesContacts {
  label: string;
  email: string;
}

export interface IImAddressesContacts {
  username: string;
  service: string;
}

export interface IPostalAddressesContacts {
  label: string;
  formattedAddress: string;
  street: string;
  pobox: string;
  neighborhood: string;
  city: string;
  region: string;
  state: string;
  postCode: string;
  country: string;
}

export interface IContactsIos {
  jobTitle: string;
  thumbnailPath: string;
  imAddresses: IImAddressesContacts[];
  recordID: string;
  postalAddresses: IPostalAddressesContacts[];
  emailAddresses: IEmailAddressesContacts[];
  phoneNumbers: IPhoneNumberContacts[];
  company: string;
  givenName: string;
  middleName: string;
  hasThumbnail: boolean;
  urlAddresses: string[];
  familyName: string;
}

export interface IContactsAndroid {
  company: string;
  department: string;
  displayName: string;
  emailAddresses: IEmailAddressesContacts[];
  familyName: string;
  givenName: string;
  hasThumbnail: boolean;
  imAddresses: IImAddressesContacts[];
  isStarred: boolean;
  jobTitle: string;
  middleName: string;
  note: null;
  phoneNumbers: IPhoneNumberContacts[];
  postalAddresses: IPostalAddressesContacts[];
  prefix: null;
  rawContactId: string;
  recordID: string;
  suffix: null;
  thumbnailPath: string;
  urlAddresses: string[];
}

export interface IItemContact {
  id?: string;
  firstName: string;
  lastName: string;
  phoneNumbers: IPhoneNumberContacts[];
  image: string;
  email?: IEmailAddressesContacts[];
  status: EContactStatus;
  zchat: boolean;
  addFavorite: boolean;
  synchronized: boolean;
  lastSeen: string | null;
}

export enum EContactStatus {
  ONLINE = "online",
  OFFLINE = "offline",
}

export type TListItem = { type: "header"; title: string; id: string } | { type: "item"; data: IItemContact };
