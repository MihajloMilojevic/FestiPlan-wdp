import * as Models from "../models";
import json_data from "../data/organizatori_festivala_engleski.json";

export default class APIs {
    static baseurl = "https://festiplan-wd-project-default-rtdb.europe-west1.firebasedatabase.app/"
    static parseData(data) {
        const result = {
            organizers: [],
            users: []
        };
        for (const organizerId in data.festivalOrganizers) {
            const organizer = data.festivalOrganizers[organizerId];
            const festivals = [];
            for (const festivalId in data[organizer.festivals]) {
                const festival = data[organizer.festivals][festivalId];
                festivals.push(
                    new Models.Festival(
                        festivalId, 
                        festival.name, 
                        festival.description, 
                        festival.images, 
                        festival.type, 
                        festival.transportation, 
                        festival.price, 
                        festival.maxPerson
                ));
            }
            result.organizers.push(
                new Models.Organizer(
                    organizerId, 
                    organizer.name, 
                    organizer.address, 
                    organizer.yearOfEstablishment, 
                    organizer.logo, 
                    organizer.contactPhone, 
                    organizer.email, 
                    festivals
                ));
        }
        for (const userId in data.users) {
            const user = data.users[userId];
            result.users.push(
                new Models.User(
                    userId,
                    user.username, 
                    user.password, 
                    user.name, 
                    user.surname, 
                    user.email, 
                    user.dateOfBirth, 
                    user.address, 
                    user.phone, 
                    user.profession
                ));
        }
        return result;
    }
    static async getData() {
        try {
            const response = await fetch(`${APIs.baseurl}/data.json`);
            const data = await response.json();
            return {data: APIs.parseData(data), error: null};
        }
        catch (error) {
            console.error("API.getData", error);
            return {data: null, error: error};
        }
    }
    static async resetData() {
        try {
            const response = await fetch(`${APIs.baseurl}/data.json`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(json_data.data)
            });  
            if (!response.ok) {
                console.error("API.resetData", response);
                return {data: null, error: response};
            }
            return {data: APIs.parseData(json_data.data), error: null};
        }
        catch(error) {
            console.error("API.resetData", error);
            return {data: null, error: error};
        }
    }
}