const Event = require('../models/EventModel');

// Get all 
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Get by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).send('Event not found');
    }
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Create
exports.createEvent = async (req, res) => {
  const { title, description, date, beginTime, finishTime, img, location, organizer } = req.body;

  try {
    const newEvent = new Event({
      title,
      description,
      date,
      beginTime,
      finishTime,
      img,
      location,
      organizer,
    });

    const savedEvent = await newEvent.save();
    res.json(savedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Update 
exports.updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEvent) {
      return res.status(404).send('Event not found');
    }
    res.json(updatedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Delete 
exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).send('Event not found');
    }
    res.json(deletedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
