import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { type Player, type RoleCounts } from '../../App';
import { EyeOff, Shield, Skull, Search, User } from 'lucide-react';

interface Step4Props {
  players: Player[];
  roles: RoleCounts;
  onNext: (players: Player[]) => void;
}

export const Step4PassAndPlay: React.FC<Step4Props> = ({ players, roles, onNext }) => {
  const [assignedPlayers, setAssignedPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [readyToPass, setReadyToPass] = useState(true);

  // Initialize roles only once
  useEffect(() => {
    if (assignedPlayers.length > 0) return;

    // Create array of roles to distribute
    const rolesToDistribute: string[] = [
      ...Array(roles.mafia).fill('Mafia'),
      ...Array(roles.doctor).fill('Doctor'),
      ...Array(roles.detective).fill('Detective'),
      ...Array(roles.villager).fill('Villager'),
    ];

    // Shuffle roles (Fisher-Yates)
    for (let i = rolesToDistribute.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [rolesToDistribute[i], rolesToDistribute[j]] = [rolesToDistribute[j], rolesToDistribute[i]];
    }

    // Assign to players (skipping Narrator)
    let roleIndex = 0;
    const newPlayers = players.map((p) => {
      if (p.isNarrator) {
        return { ...p, role: 'Narrator', hasSeenRole: true };
      }
      return { ...p, role: rolesToDistribute[roleIndex++] };
    });

    setAssignedPlayers(newPlayers);
  }, [players, roles, assignedPlayers.length]);

  // Find the next player who needs to see their role
  useEffect(() => {
    if (assignedPlayers.length === 0) return;
    
    // Find first player who hasn't seen role (and isn't Narrator)
    const nextIndex = assignedPlayers.findIndex(p => !p.hasSeenRole && !p.isNarrator);
    
    if (nextIndex !== -1) {
      setCurrentPlayerIndex(nextIndex);
    } else {
      // Everyone has seen their role, move to Step 5
      onNext(assignedPlayers);
    }
  }, [assignedPlayers, onNext]);

  const handleReveal = () => {
    setReadyToPass(false);
  };

  const handleHideAndNext = () => {
    // Mark current player as having seen their role
    const newPlayers = [...assignedPlayers];
    newPlayers[currentPlayerIndex].hasSeenRole = true;
    setAssignedPlayers(newPlayers);
    setReadyToPass(true);
  };

  if (assignedPlayers.length === 0) return null;

  const currentPlayer = assignedPlayers[currentPlayerIndex];

  if (!currentPlayer) return null; // Should transition to Step 5 instead

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'Mafia':
        return { icon: Skull, color: 'text-mafia-red bg-mafia-red/10', title: 'Mafia' };
      case 'Doctor':
        return { icon: Shield, color: 'text-doctor-blue bg-doctor-blue/10', title: 'Doctor' };
      case 'Detective':
        return { icon: Search, color: 'text-detective-amber bg-detective-amber/10', title: 'Detective' };
      default:
        return { icon: User, color: 'text-zinc-400 bg-zinc-800', title: 'Villager' };
    }
  };

  const roleDisplay = getRoleDisplay(currentPlayer.role);
  const Icon = roleDisplay.icon;

  return (
    <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-500">
      {readyToPass ? (
        <div className="flex-1 flex flex-col justify-center items-center p-6 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl text-zinc-400 uppercase tracking-widest font-bold">Pass phone to</h2>
            <p className="text-5xl font-black text-white">{currentPlayer.name}</p>
          </div>
          
          <div className="w-32 h-32 rounded-full bg-zinc-900 border-4 border-zinc-800 flex items-center justify-center animate-pulse">
            <EyeOff size={48} className="text-zinc-500" />
          </div>

          <Button onClick={handleReveal} className="mt-8 text-xl px-12 py-6 rounded-2xl shadow-xl shadow-zinc-900/50">
            Tap to Reveal Role
          </Button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-center items-center p-6 text-center space-y-8 animate-in slide-in-from-bottom-8">
          <div className="space-y-2">
            <h2 className="text-xl text-zinc-400 font-medium">Hello {currentPlayer.name}, you are:</h2>
          </div>
          
          <div className={`w-48 h-48 rounded-3xl ${roleDisplay.color} flex items-center justify-center shadow-2xl`}>
            <Icon size={80} />
          </div>

          <p className="text-5xl font-black">{roleDisplay.title}</p>

          <Button 
            onClick={handleHideAndNext} 
            variant="primary"
            className="mt-8 text-xl px-12 py-6 rounded-2xl shadow-xl shadow-zinc-900/50 w-full"
          >
            Hide Role
          </Button>
        </div>
      )}
    </div>
  );
};
