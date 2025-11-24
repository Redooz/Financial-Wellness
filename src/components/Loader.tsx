import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from './Layout';

interface LoaderProps {
    size?: number;
    className?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 24, className }) => {
    return (
        <Loader2
            size={size}
            className={cn("animate-spin text-current", className)}
        />
    );
};

export default Loader;
