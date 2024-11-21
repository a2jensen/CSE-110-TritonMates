'use client'
import { randomInt } from 'crypto';
import React, { useState } from 'react';
import { event } from '../../../types';
import styles from './addEventForm.module.css';

// move this into types.ts
type AddEventFormProps = {
    onAddEvent: (event: event) => void;
};

const AddEventForm: React.FC<AddEventFormProps> = ({ onAddEvent }) => {
    const [eventTitle, setEventTitle] = useState('');
    const [eventInfo, setEventInfo] = useState('');
    const [eventDate, setEventDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddEvent({ name: eventTitle, description: eventInfo, id: 5, date: new Date(eventDate) });
        setEventTitle('');
        setEventInfo('');
        setEventDate('');
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Add New Event</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label className={styles.label}>Event Title</label>
                <input
                    type="text"
                    placeholder="Event Title"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    className={styles.input}
                />

                <label className={styles.label}>Event Info</label>
                <input
                    type="text"
                    placeholder="Event Info"
                    value={eventInfo}
                    onChange={(e) => setEventInfo(e.target.value)}
                    className={styles.input}
                />

                <label className={styles.label}>Event Date (Calendar OR Manual Input)</label>
                <div className={styles.dateInputWrapper}>
                    <input
                        type="date"
                        placeholder="Due Date (MM/DD/YYYY)"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className={styles.dateInput}
                    />
                    <span className={styles.calendarIcon}>📅</span>
                </div>
                <button type="submit" className={styles.addButton}>Add</button>
            </form>
        </div>
    );
};

export default AddEventForm;