import { createInterface } from 'readline';
import { GameResult } from './types';

const readline = createInterface({ input: process.stdin, output: process.stdout });

async function question(question: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      readline.question(question, (response) => {
        resolve(response);
      });
    } catch (e) {
      reject(e);
    }
  });
}

export function printWelcomeMessage(): void {
  console.log('Herzlich Willkommen zum Bowling Simulator!');
  console.log('Geben Sie bitte folgend die Punktestände des Spieles ein.');
  console.log(
    'Dazu schreiben Sie die Punktzahlen der einzelnen Rolls, durch ein Komma (,) getrennt in die Kommandozeile und beenden den Roll indem sie Enter drücken.',
  );
  console.log(
    'Für einen Strike geben Sie lediglich eine 10 ein und drücken Enter. Für den letzten Roll geben Sie, falls es 3 Würfe gab, die 3 Würfe, jeweils durch ein Komma getrennt, ein.',
  );
  console.log();
}

export async function readGame() {
  const frameInputs: string[] = [];
  for (let i = 1; i <= 10; i++) {
    const answer = await question(`Frame ${i}: `);
    frameInputs.push(answer);
  }

  const frames = frameInputs.map((input) => input.split(',').map((str) => Number.parseInt(str.trim())));

  return frames;
}

export function destroy() {
  readline.close();
}

export function printResult(gameResult: GameResult) {
  console.log(gameResult);
}
