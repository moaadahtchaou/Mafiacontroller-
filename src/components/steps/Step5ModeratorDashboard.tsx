import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { type Player } from '../../App';
import { Eye, EyeOff, Shield, Skull, Search, User, Crown } from 'lucide-react';

interface Step5Props {
  players: Player[];
  onRestart: () => void;
}

export const Step5ModeratorDashboard: React.FC<Step5Props> = ({ players, onRestart }) => {
  const [showRoles, setShowRoles] = useState(false);
  const narrator = players.find((p) => p.isNarrator);

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'Mafia':
        return { icon: Skull, color: 'text-mafia-red bg-mafia-red/10', title: 'Mafia' };
      case 'Doctor':
        return { icon: Shield, color: 'text-doctor-blue bg-doctor-blue/10', title: 'Doctor' };
      case 'Detective':
        return { icon: Search, color: 'text-detective-amber bg-detective-amber/10', title: 'Detective' };
      case 'Narrator':
        return { icon: Crown, color: 'text-zinc-300 bg-zinc-800', title: 'Narrator' };
      default:
        return { icon: User, color: 'text-zinc-400 bg-zinc-800/50', title: 'Villager' };
    }
  };

  // Group players by role for easier moderation
  const sortedPlayers = [...players].sort((a, b) => {
    if (a.isNarrator) return -1;
    if (b.isNarrator) return 1;
    return a.role.localeCompare(b.role);
  });

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-6 pb-4 border-b border-zinc-800/50 flex items-center justify-between sticky top-0 bg-zinc-950/80 backdrop-blur-md z-10">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Crown className="text-mafia-red" size={24} />
            Dashboard
          </h2>
          <p className="text-zinc-400 text-sm">Welcome, {narrator?.name}</p>
        </div>
        <button
          onClick={() => setShowRoles(!showRoles)}
          className={`p-3 rounded-xl transition-colors ${
            showRoles ? 'bg-mafia-red/20 text-mafia-red' : 'bg-zinc-800 text-zinc-400'
          }`}
          title={showRoles ? 'Hide Roles' : 'Show Roles'}
        >
          {showRoles ? <EyeOff size={24} /> : <Eye size={24} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-3">
        {!showRoles && (
          <div className="p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800/50 text-center mb-4">
            <p className="text-zinc-400 text-sm">Roles are currently hidden.</p>
            <p className="text-zinc-500 text-xs mt-1">Tap the eye icon above to reveal them.</p>
          </div>
        )}

        {sortedPlayers.map((player) => {
          if (player.isNarrator) return null; // Skip narrator in the list
          
          const roleDisplay = getRoleDisplay(player.role);
          const Icon = roleDisplay.icon;

          return (
            <div
              key={player.id}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                showRoles ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-900/50 border-zinc-800/50'
              }`}
            >
              <span className="font-bold text-lg">{player.name}</span>
              
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                  showRoles ? roleDisplay.color : 'bg-zinc-800 text-zinc-500'
                } transition-all duration-300`}
              >
                {showRoles ? (
                  <>
                    <Icon size={18} />
                    <span className="font-semibold text-sm">{roleDisplay.title}</span>
                  </>
                ) : (
                  <>
                    <div className="w-4 h-4 rounded-full bg-zinc-700 animate-pulse" />
                    <span className="font-semibold text-sm tracking-wider">HIDDEN</span>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-6 pt-2 mt-auto border-t border-zinc-800/50">
        <Button variant="danger" onClick={onRestart} fullWidth>
          End Game & Restart
        </Button>
      </div>
    </div>
  );
};
