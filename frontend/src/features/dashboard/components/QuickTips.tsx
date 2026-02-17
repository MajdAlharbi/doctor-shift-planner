import React from 'react';
import { Lightbulb, X } from 'lucide-react';

interface QuickTipsProps {
  onClose: () => void;
}

export const QuickTips: React.FC<QuickTipsProps> = ({ onClose }) => {
  const tips = [
    {
      title: 'Color-Coded System',
      description: 'Blue for shifts, Green for recovery, Orange for personal activities, Red for conflicts',
    },
    {
      title: 'Automatic Recovery',
      description: 'Recovery periods are automatically added after night shifts based on your rules',
    },
    {
      title: 'Flexible Commitments',
      description: 'Mark personal activities as flexible to allow automatic rescheduling',
    },
    {
      title: 'Smart Conflict Detection',
      description: 'The system automatically detects scheduling conflicts and suggests solutions',
    },
    {
      title: 'Quick Actions',
      description: 'Use the dashboard quick actions to add shifts and commitments instantly',
    },
  ];
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
              <Lightbulb className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Quick Tips</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {index + 1}. {tip.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{tip.description}</p>
            </div>
          ))}
          
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Getting Started</h3>
            <ol className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>1. Add your shifts in the "My Shifts" section</li>
              <li>2. Configure your recovery rules to suit your needs</li>
              <li>3. Add personal commitments and activities</li>
              <li>4. Check the conflict resolution center for any issues</li>
              <li>5. View everything in the weekly calendar</li>
            </ol>
          </div>
        </div>
        
        <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-6">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            Got it, Let's Start!
          </button>
        </div>
      </div>
    </div>
  );
};
