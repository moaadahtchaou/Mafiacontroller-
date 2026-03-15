import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Shield, Skull, Search, User } from 'lucide-react';
import { type RoleCounts } from '../../App';

interface Step2Props {
  totalPlayers: number;
  initialRoles: RoleCounts;
  onNext: (roles: RoleCounts) => void;
  onBack: () => void;
}

export const Step2RoleConfig: React.FC<Step2Props> = ({
  totalPlayers,
  initialRoles,
  onNext,
  onBack,
}) => {
  const [roles, setRoles] = useState<RoleCounts>(initialRoles);
  const [error, setError] = useState<string>('');

  // 1 for Narrator
  const currentlyAssigned = roles.mafia + roles.doctor + roles.detective + 1;
  const remainingVillagers = totalPlayers - currentlyAssigned;

  const handleIncrement = (role: keyof RoleCounts) => {
    if (remainingVillagers > 0) {
      setRoles((prev) => ({ ...prev, [role]: prev[role] + 1 }));
      setError('');
    } else {
      setError('Not enough players for more special roles!');
    }
  };

  const handleDecrement = (role: keyof Omit<RoleCounts, 'villager'>) => {
    if (roles[role] > 0) {
      setRoles((prev) => ({ ...prev, [role]: prev[role] - 1 }));
      setError('');
    }
  };

  const handleNext = () => {
    if (roles.mafia === 0) {
      setError('You need at least 1 Mafia to play!');
      return;
    }
    if (remainingVillagers < 0) {
      setError('Too many special roles assigned!');
      return;
    }
    onNext({ ...roles, villager: Math.max(0, remainingVillagers) });
  };



  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-6 pb-2 text-center space-y-2">
        <h2 className="text-2xl font-bold">Configure Roles</h2>
        <p className="text-zinc-400">Distribute special roles among {totalPlayers - 1} players (1 is Narrator).</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <RoleRow
          name="Mafia"
          count={roles.mafia}
          roleKey="mafia"
          icon={Skull}
          colorClass="text-mafia-red bg-mafia-red/10"
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          remainingVillagers={remainingVillagers}
        />
        <RoleRow
          name="Doctor"
          count={roles.doctor}
          roleKey="doctor"
          icon={Shield}
          colorClass="text-doctor-blue bg-doctor-blue/10"
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          remainingVillagers={remainingVillagers}
        />
        <RoleRow
          name="Detective"
          count={roles.detective}
          roleKey="detective"
          icon={Search}
          colorClass="text-detective-amber bg-detective-amber/10"
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          remainingVillagers={remainingVillagers}
        />

        <div className="mt-8 p-4 bg-zinc-900 rounded-2xl border border-zinc-800/50 flex items-center justify-between">
          <div className="flex items-center gap-4 opacity-50">
            <div className="p-3 rounded-full bg-zinc-800 text-zinc-400">
              <User size={24} />
            </div>
            <span className="font-semibold text-lg text-zinc-300">Villagers</span>
          </div>
          <span className="text-3xl font-mono font-bold text-zinc-500 mr-2">
            {Math.max(0, remainingVillagers)}
          </span>
        </div>
        {error && <p className="text-mafia-red text-center font-medium mt-4">{error}</p>}
      </div>

      <div className="p-6 pt-2 flex gap-4 mt-auto">
        <Button variant="secondary" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button onClick={handleNext} className="flex-[2]">
          Next Step
        </Button>
      </div>
    </div>
  );
};

const RoleRow = ({
  name,
  count,
  icon: Icon,
  colorClass,
  roleKey,
  handleIncrement,
  handleDecrement,
  remainingVillagers,
}: {
  name: string;
  count: number;
  icon: React.ElementType;
  colorClass: string;
  roleKey: keyof Omit<RoleCounts, 'villager'>;
  handleIncrement: (roleKey: keyof RoleCounts) => void;
  handleDecrement: (roleKey: keyof Omit<RoleCounts, 'villager'>) => void;
  remainingVillagers: number;
}) => (
  <div className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800">
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-full ${colorClass} bg-opacity-10 text-current`}>
        <Icon size={24} />
      </div>
      <span className="font-semibold text-lg">{name}</span>
    </div>
    <div className="flex items-center gap-4">
      <button
        onClick={() => handleDecrement(roleKey)}
        disabled={count === 0}
        className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 disabled:opacity-50 text-xl font-bold"
      >
        -
      </button>
      <span className="w-8 text-center text-xl font-mono">{count}</span>
      <button
        onClick={() => handleIncrement(roleKey)}
        disabled={remainingVillagers <= 0}
        className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 disabled:opacity-50 text-xl font-bold"
      >
        +
      </button>
    </div>
  </div>
);
