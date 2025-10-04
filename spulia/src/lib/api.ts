export async function getDays() {
    // TODO : MAKE NICER
    const response = await fetch("/api/getDays");
    const data = await response.json();
    console.log(data);
    return data.days;
}