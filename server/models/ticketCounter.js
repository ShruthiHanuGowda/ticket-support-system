const mongoose = require('mongoose');


const TicketCounter = mongoose.Schema({
    sNo: {
        type: String,
    }
})
module.exports.TicketCounter = mongoose.model("ticket_counter", TicketCounter, "ticket_counter");