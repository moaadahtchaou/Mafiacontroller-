import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { type Player } from '../../App';
import { User, Crown, Dices } from 'lucide-react';

interface Step3Props {
  totalPlayers: number;
  initialPlayers: Player[];
  onNext: (players: Player[]) => void;
  onBack: () => void;
}

export const Step3PlayerNames: React.FC<Step3Props> = ({
  totalPlayers,
  initialPlayers,
  onNext,
  onBack,
}) => {
  const [players, setPlayers] = useState<Player[]>(() => {
    if (initialPlayers.length === totalPlayers) {
      return initialPlayers;
    }
    return Array.from({ length: totalPlayers }).map((_, i) => ({
      id: `player-${i}`,
      name: '',
      isNarrator: i === 0,
      role: '',
      hasSeenRole: false,
    }));
  });
  const [error, setError] = useState<string>('');

  const handleNameChange = (index: number, name: string) => {
    const newPlayers = [...players];
    newPlayers[index].name = name;
    setPlayers(newPlayers);
    setError('');
  };

  const setNarrator = (index: number) => {
    const newPlayers = players.map((p, i) => ({
      ...p,
      isNarrator: i === index,
    }));
    setPlayers(newPlayers);
  };

  const randomizeNarrator = () => {
    if (players.length === 0) return;
    const randomIndex = Math.floor(Math.random() * players.length);
    setNarrator(randomIndex);
  };

  const handleNext = () => {
    // Check if all names are filled
    const allNamesFilled = players.every((p) => p.name.trim() !== '');
    if (!allNamesFilled) {
      setError('Please enter a name for all players.');
      return;
    }

    // Check for duplicate names
    const names = players.map(p => p.name.trim().toLowerCase());
    const uniqueNames = new Set(names);
    if (uniqueNames.size !== names.length) {
       setError('All player names must be unique.');
       return;
    }

    onNext(players);
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-6 pb-2 text-center space-y-2">
        <h2 className="text-2xl font-bold">Who is playing?</h2>
        <p className="text-zinc-400">Enter names and select the Narrator.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <Button 
          variant="secondary" 
          onClick={randomizeNarrator}
          className="w-full mb-4 flex items-center justify-center gap-2 bg-zinc-800/50 text-zinc-300 hover:text-white hover:bg-zinc-700"
        >
          <Dices size={20} />
          Pick Narrator Randomly
        </Button>

        {players.map((player, index) => (
          <div
            key={player.id}
            className={`flex items-center gap-3 p-3 rounded-2xl border transition-colors ${
              player.isNarrator
                ? 'bg-zinc-800/80 border-zinc-500'
                : 'bg-zinc-900/50 border-zinc-800/50 hover:border-zinc-700'
            }`}
          >
            <button
              onClick={() => setNarrator(index)}
              className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                player.isNarrator
                  ? 'bg-mafia-red text-white shadow-lg shadow-mafia-red/20'
                  : 'bg-zinc-800 text-zinc-500 hover:text-zinc-300'
              }`}
              title="Set as Narrator"
            >
              {player.isNarrator ? <Crown size={24} /> : <User size={24} />}
            </button>
            <div className="flex-1">
              <Input
                placeholder={`Player ${index + 1}`}
                value={player.name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                className="bg-transparent border-none px-0 py-2 focus:ring-0 text-lg"
              />
            </div>
            {player.isNarrator && (
              <span className="text-xs font-bold uppercase tracking-wider text-mafia-red mr-2">
                Narrator
              </span>
            )}
          </div>
        ))}

        {error && <p className="text-mafia-red text-center font-medium mt-4">{error}</p>}
      </div>

      <div className="p-6 pt-2 flex gap-4 mt-auto border-t border-zinc-800/50">
        <Button variant="secondary" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button onClick={handleNext} className="flex-[2]">
          Assign Roles
        </Button>
      </div>
    </div>
  );
};
