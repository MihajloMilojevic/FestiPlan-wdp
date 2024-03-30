export default class User {
    constructor(id, username, password, name, surname, email, dateOfBirth, address, phone, profession) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
        this.phone = phone;
        this.profession = profession;
    }
}