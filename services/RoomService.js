const { sequelize } = require("../models");
const { QueryTypes } = require('sequelize');
class RoomService {
    constructor(db) {
        this.client = db.sequelize;
        this.Room = db.Room;
        this.User = db.User;
        this.Hotel = db.Hotel;
        this.Reservation = db.Reservation;
    }

    //Create a room using raw SQL
    async create(capacity, pricePerDay, hotelId) {
        return this.Room.create(
            {
                Capacity: capacity,
                PricePerDay: pricePerDay,
                HotelId: hotelId
            }
        ).catch(function (err) {
            console.log(err);
        })
    }
    
    //Get all rooms using raw SQL
    async get() {
        return this.Room.findAll({
            where: {},
            include: [{
                model: this.User,
                through: { 
                    attributes: [ 'StartDate', 'EndDate' ] 
                }
            },
            {
                model: this.Hotel,
            }]
        }).catch(function (err) {
            console.log(err);
        });
    }

    //Get all rooms for a specific hotel using raw SQL
    async getHotelRooms(hotelId) {
        return this.Room.findAll({
            where: { HotelId: hotelId },
            include: [{
                model: this.User,
                through: {
                    attributes: [ 'StartDate', 'EndDate' ] 
                }
            },
            {
                model: this.Hotel,
            }]
        }).catch(function (err) {
            console.log(err);
        });
    }

    //Delete a room using raw SQL
    async deleteRoom(roomId) {
        return this.Room.destroy({
            where: { id: roomId }
        }).catch(function (err) {
            console.log(err);
        })
    }

    //Rent a specified room using raw SQL
    async rentARoom(userId, roomId, startDate, endDate) {
        return this.Reservation.create(
            {
                RoomId: roomId,
                UserId: userId,
                StartDate: startDate,
                EndDate: endDate
            }
        ).catch(function (err) {
            console.log(err);
        })
    }
}
module.exports = RoomService;