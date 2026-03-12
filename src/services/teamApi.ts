const API = "http://localhost:3000/favorites";

export async function getTeam() {
    const res = await fetch(API);
    if (!res.ok) throw new Error("Failed to fetch team");
    return res.json();
}

export async function addToTeam(pokemonId: number, nickname: string) {
    const res = await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ pokemonId, nickname })
    });

    if (!res.ok) throw new Error("Failed to add Pokémon");
    return res.json();
}

export async function updateTeam(id: number, pokemonId: number, nickname: string) {
    const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id, pokemonId, nickname })
    });

    if (!res.ok) throw new Error("Failed to update Pokémon");
    return res.json();
}

export async function deleteFromTeam(id: number) {
    const res = await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    if (!res.ok) throw new Error("Failed to delete Pokémon");
}

export async function isInTeam(pokemonId: number) {
    const res = await fetch(`${API}?pokemonId=${pokemonId}`);
    const data = await res.json();
    return data.length > 0;
}
