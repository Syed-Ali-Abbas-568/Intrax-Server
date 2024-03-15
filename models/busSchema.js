import mongoose from 'mongoose';

const busSchema = mongoose.Schema({
  busNumber: {
    type: String, unique:true,
    required: true
  },
  busModel: {
    type: String,
    required: true
  },
  maintenanceSchedule: {
    type: String,
    required: true
  },
  licensePlateNumber: {
    type: String,
    required: true
  },
  manufacturerYear: {
    type: Number,
    required: true
  },
  gpsDeviceId: {
    type: String, unique:true,
    required: true
  },
  typeOfBus: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

const BusModel = mongoose.model('Bus', busSchema);

export default BusModel;