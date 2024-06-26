import React, { useState } from 'react';
import sendRequest from '../../utilities/send-request';
import styles from './JobForm.module.scss'
import * as jobsAPI from '../../utilities/jobs-api';

const CreateJobForm = ({ user, showCreateForm, setShowCreateForm }) => {
    const [formData, setFormData] = useState({
        title: 'Sample Title',
        company: 'Sample Company',
        location: 'Sample Location',
        description: 'Sample Description'
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Form Data:', formData);

        if (!formData) {
            console.error('Error: formData is not initialized.');
            return;
        }

        try {
            // Create the job using the API
            console.log('Creating job...');
            await sendRequest('/api/jobs', 'POST', formData);
            console.log('Job created successfully');
            setShowCreateForm(showCreateForm)
        } catch (error) {
            console.error('Error creating job:', error);
        }
    };

    return (
        <div>
            <h2>Create a Job Post</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter job title"
                        />
                    </div>
                    <div>
                        <label htmlFor="company">Company</label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Enter company name"
                        />
                    </div>
                    <div>
                        <label htmlFor="location">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Enter job location"
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <input
                        type="text"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter job description"
                        />
                    </div>
                    <button type="submit" onSubmit={handleSubmit}>Create Job</button>
                </form>
            </div>
        </div>
    );
};

export default CreateJobForm;
