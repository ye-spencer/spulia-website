import crypto from "crypto";

export default function login(username: string, password: string) {
    console.log(username, password);

    const hash = crypto.createHash("sha256").update(password).digest("hex");
    console.log(hash);

    if (username !== "Spencer" && username !== "Julia")
    {
        throw new Error("Please pick a valid username");
    }

    if (username === "Spencer" && hashPassword(password) === "e100425d6c317708c899ff2f961fab4a532fa751b6481eebbe42daa9cebd5f35")
    {
        return "Spencer";
    }
    else if (username === "Julia" && hashPassword(password) === "d7208f3fd0929b1f993b4ed60d236bc3e4ca4a5a03539573a1c1550ebd932009")
    {
        return "Julia";
    }

    throw new Error("Invalid password for " + username);


    // TODO: MOVE LOGIC TO API ROUTE
    // return fetch("/api/login", {
    //     method: "POST",
    //     body: JSON.stringify({ username, password }),
    // });
}

function hashPassword(password: string) {
    return crypto.createHash("sha256").update(password).digest("hex");
}