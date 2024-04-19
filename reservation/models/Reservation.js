//----------- Model Reservation  -----------//
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    week: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Week',
        required: true
    },
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;