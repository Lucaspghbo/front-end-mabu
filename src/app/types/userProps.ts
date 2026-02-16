export interface UserProps {
    createdAt: string;
    email: string;
    id: string;
    nome: string;
    updatedAt: string;
    isAdmin: boolean
    token: string
    linkWhatsApp: string | null,
    isOnline: boolean,
    lastOnline: string,
    hotel: 'TODOS' | 'MABU_THERMAS' | 'HOT_BEACH_RESORT' | 'HOT_BEACH_SUITE' | 'JAPARATINGA',
}