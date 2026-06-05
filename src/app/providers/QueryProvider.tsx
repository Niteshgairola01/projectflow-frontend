import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../shared/services/api/queryClient";

type Props = {
    children: React.ReactNode 
}

export const QueryProvider = ({children}: Props) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}