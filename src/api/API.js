import * as Models from "../models";

export default class APIs {
    static baseurl = ""
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
}