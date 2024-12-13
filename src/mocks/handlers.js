import { http, HttpResponse } from "msw";

export const handlers = [
    http.get("https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com/confirmation", () => {
        const data = JSON.parse(sessionStorage.getItem("confirmation"));
        return HttpResponse.json(data);
    }),
    http.post("https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com/", async ({request}) => {
        const body = await request.json();
        const {when, lanes, people, shoes} = body;
        const price = parseInt(people)*120+parseInt(lanes)*100;
        const confirmation = {
            id: 128376,
            when: when,
            lanes: lanes,
            people: people,
            shoes: shoes,
            price: price,
            active: true
        }
        sessionStorage.setItem("confirmation", JSON.stringify(confirmation));
        return HttpResponse.json(confirmation);
    }),
]