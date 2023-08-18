import { calculateGame } from './bowlingService';
import { destroy, printResult, printWelcomeMessage, readGame } from './ioService';

async function main() {
  printWelcomeMessage();

  const game = await readGame();

  const result = calculateGame(game);

  printResult(result);

  destroy();
}

main();
