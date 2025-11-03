import { useEffect, useState } from "react";

// Componente de transición de página
export const PageTransition = ({ children }: { children: React.ReactNode }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    return (
        <div
            className={`
        transition-all duration-400 ease-in-out
        ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
      `}
        >
            {children}
        </div>
    );
};