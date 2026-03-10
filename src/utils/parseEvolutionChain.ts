export function parseEvolutionChain(chain: any): string[] {
  const evolutions: string[] = [];

  function traverse(node: any) {
    evolutions.push(node.species.name);

    node.evolves_to.forEach((next: any) => {
      traverse(next);
    });
  }

  traverse(chain);

  return evolutions;
}
