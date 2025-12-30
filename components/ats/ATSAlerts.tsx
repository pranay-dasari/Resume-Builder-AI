import React from 'react';
import { Info } from 'lucide-react';

interface ATSAlertsProps {
    message: string | null;
}

const ATSAlerts: React.FC<ATSAlertsProps> = ({ message }) => {
    if (!message) return null;

    return (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg shadow-sm">
            <div className="flex">
                <div className="flex-shrink-0">
                    <Info className="w-5 h-5 text-amber-500" />
                </div>
                <div className="ml-3">
                    <p className="text-sm text-amber-800 font-medium">
                        Insight: Experience Flag
                    </p>
                    <p className="text-sm text-amber-700 mt-1">
                        {message}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ATSAlerts;
