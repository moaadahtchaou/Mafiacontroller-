import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Users } from 'lucide-react';

interface Step1Props {
  initialCount: number;
  onNext: (count: number) => void;
}

export const Step1PlayerCount: React.FC<Step1Props> = ({ initialCount, onNext }) => {
  const [count, setCount] = useState<string>(initialCount ? initialCount.toString() : '');
  const [error, setError] = useState<string>('');

  const handleNext = () => {
    const numCount = parseInt(count, 10);
    if (!numCount || isNaN(numCount)) {
      setError('Please enter a valid number');
      return;
    }
    if (numCount < 3) {
      setError('Minimum 3 players required (Narrator, Mafia, Villager)');
      return;
    }
    if (numCount > 50) {
      setError('Maximum 50 players allowed');
      return;
    }
    setError('');
    onNext(numCount);
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex-1 flex flex-col justify-center gap-8 p-6">
        <div className="text-center space-y-4">
          <div className="inline-flex p-4 rounded-full bg-mafia-red/10 text-mafia-red mb-2">
            <Users size={48} />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">How many players?</h2>
          <p className="text-zinc-400">Include everyone, even the Narrator.</p>
        </div>

        <div className="max-w-xs mx-auto w-full">
          <Input
            type="number"
            value={count}
            onChange={(e) => {
              setCount(e.target.value);
              setError('');
            }}
            placeholder="e.g. 7"
            error={error}
            min={3}
            max={50}
            className="text-center text-2xl font-bold font-mono"
            autoFocus
          />
        </div>
      </div>

      <div className="p-6 mt-auto">
        <Button onClick={handleNext} fullWidth>
          Next Step
        </Button>
      </div>
    </div>
  );
};
