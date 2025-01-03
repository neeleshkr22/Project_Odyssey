import mongoose from "mongoose"

const DutyslipSchema =  mongoose.Schema({
    vehicle:{
        type: String,
        required: true,
    },
    driver:{
        type: String,
        required: true,
    },
    startTime:{
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    startLocation:{
        type: String,
        required: true,
    },
    endLocation:{
        type: String,
        required: true,
    },
    description:{
        type:String,
        default:" ",
    }
},{
    timestamps: true,
})

export default mongoose.model("DutySlip", DutyslipSchema)