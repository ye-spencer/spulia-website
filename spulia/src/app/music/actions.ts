export async function getPlaylists() 
{
    const response = await fetch("/api/playlists");
    const data = await response.json();
    return data.playlists;
}