export async function getDays()
{
    const response = await fetch("/api/getDays");
    const data = await response.json();
    return data.days;
}