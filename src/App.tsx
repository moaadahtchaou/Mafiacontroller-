import { useState } from 'react';
import { Layout } from './components/Layout';
import { Step1PlayerCount } from './components/steps/Step1PlayerCount';
import { Step2RoleConfig } from './components/steps/Step2RoleConfig';
import { Step3PlayerNames } from './components/steps/Step3PlayerNames';
import { Step4PassAndPlay } from './components/steps/Step4PassAndPlay';
import { Step5ModeratorDashboard } from './components/steps/Step5ModeratorDashboard';

export type RoleCounts = {
  mafia: number;
  doctor: number;
  detective: number;
  villager: number;
};

export type Player = {
  id: string;
  name: string;
  isNarrator: boolean;
  role: string;
  hasSeenRole: boolean;
};

export type AppState = {
  step: 1 | 2 | 3 | 4 | 5;
  totalPlayers: number;
  roles: RoleCounts;
  players: Player[];
  currentPlayerIndexForReveal: number;
};

const initialState: AppState = {
  step: 1,
  totalPlayers: 0,
  roles: { mafia: 1, doctor: 1, detective: 1, villager: 0 },
  players: [],
  currentPlayerIndexForReveal: 0,
};

function App() {
  const [state, setState] = useState<AppState>(initialState);

  const updateState = (updates: Partial<AppState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const handleRestart = () => {
    setState(initialState);
  };

  return (
    <Layout>
      {state.step === 1 && (
        <Step1PlayerCount
          initialCount={state.totalPlayers}
          onNext={(count) => updateState({ step: 2, totalPlayers: count })}
        />
      )}
      {state.step === 2 && (
        <Step2RoleConfig
          totalPlayers={state.totalPlayers}
          initialRoles={state.roles}
          onNext={(roles) => updateState({ step: 3, roles })}
          onBack={() => updateState({ step: 1 })}
        />
      )}
      {state.step === 3 && (
        <Step3PlayerNames
          totalPlayers={state.totalPlayers}
          initialPlayers={state.players}
          onNext={(players) => updateState({ step: 4, players })}
          onBack={() => updateState({ step: 2 })}
        />
      )}
      {state.step === 4 && (
        <Step4PassAndPlay
          players={state.players}
          roles={state.roles}
          onNext={(players) => updateState({ step: 5, players })}
        />
      )}
      {state.step === 5 && (
        <Step5ModeratorDashboard
          players={state.players}
          onRestart={handleRestart}
        />
      )}
    </Layout>
  );
}

export default App;
