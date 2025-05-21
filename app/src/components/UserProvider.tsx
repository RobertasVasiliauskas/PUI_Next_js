'use client';

import { ReactNode } from 'react';
import { UserContext } from '@/context/userContext';

export default function UserProvider({
                                         children,
                                         user,
                                     }: {
    children: ReactNode;
    user: { id: string } | null;
}) {
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
