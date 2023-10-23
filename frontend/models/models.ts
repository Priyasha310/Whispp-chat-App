export interface CurrentUserInterface {
    email:String;
    _id: String;
    isAvatarImageSet: boolean;
    username: string;
    avatarImage: string;
  }

 export interface Contact {
    username: string;
    avatarImage: string;
    _id: String;
}

  

 export interface ChatInterface {
    username: string;
    avatarImage: string;
    _id: String;
}

  
export interface ContactsProps {
    contacts: Contact[];
    currentUser: CurrentUserInterface | null;
    changeChat:any;
}

export interface ChatProps{
    currentUser: CurrentUserInterface | null;
    currentChat: ChatInterface | null;

}
  