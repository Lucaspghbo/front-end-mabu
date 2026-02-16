export interface UsersProps {
    id: string,
    nome: string,
    email: string,
    isAdmin: boolean,
    createdAt: string,
    updatedAt: string
    linkWhatsApp: string | null,
    isOnline: boolean,
    lastOnline: string
    hotel?: string;
}