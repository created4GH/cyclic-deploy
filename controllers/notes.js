const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');

const User = require('../models/user');

const getNotes = async (req, res) => {
    const user = req.user;
    const notes = user?.notes || [];
    res.status(200).json(notes);
};

const addNote = async (req, res) => {
    try {
        const note = {
            ...req.body,
            username,
            createdDate: new Date().getTime(),
            modifiedDate: new Date().getTime()
        }
        const user = req.user;
        user.notes.unshift(note);
        await user.save();
        return res.status(201).json(note);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const patchNote = async (req, res) => {
    const { id } = req.body;
    if (!id) return res.sendStatus(400).json('Id is required!');
    const user = req.user;
    const newInfo = { ...req.body, modifiedDate: new Date().getTime() };
    user.notes = user.notes.map(item => item.id !== id ? item : { ...item, ...newInfo });
    await user.save();
    res.sendStatus(201);
};

const deleteNote = async (req, res) => {
    const { id } = req.body;
    if (!id) return res.sendStatus(400).json('Id is required!');
    const user = req.user;
    user.notes = user.notes.filter(note => note.id !== id);
    await user.save();
    res.json({ message: 'Note deleted' });
}

module.exports = {
    getNotes,
    addNote,
    patchNote,
    deleteNote
}